import { type User, type InsertUser, type ContactInquiry, type InsertContactInquiry, type BlogPost, type InsertBlogPost, users, contactInquiries, blogPosts } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
  updateContactInquiry(id: string, updates: Partial<ContactInquiry>): Promise<ContactInquiry | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(filters?: { published?: boolean; tags?: string[]; limit?: number; offset?: number }): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactInquiries: Map<string, ContactInquiry>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.contactInquiries = new Map();
    this.blogPosts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = randomUUID();
    const contactInquiry: ContactInquiry = {
      ...inquiry,
      company: inquiry.company ?? null,
      service: inquiry.service ?? null,
      id,
      createdAt: new Date(),
      responded: false,
    };
    this.contactInquiries.set(id, contactInquiry);
    return contactInquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateContactInquiry(id: string, updates: Partial<ContactInquiry>): Promise<ContactInquiry | undefined> {
    const existing = this.contactInquiries.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.contactInquiries.set(id, updated);
    return updated;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const blogPost: BlogPost = {
      ...post,
      imageUrl: post.imageUrl ?? null,
      imageAlt: post.imageAlt ?? null,
      tags: post.tags ?? null,
      publishedAt: post.publishedAt ?? null,
      sourceUrl: post.sourceUrl ?? null,
      id,
      createdAt: new Date(),
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async getBlogPosts(filters?: { published?: boolean; tags?: string[]; limit?: number; offset?: number }): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    // Filter by published status
    if (filters?.published !== undefined) {
      posts = posts.filter(post => filters.published ? post.publishedAt !== null : post.publishedAt === null);
    }
    
    // Filter by tags
    if (filters?.tags && filters.tags.length > 0) {
      posts = posts.filter(post => 
        post.tags && post.tags.some(tag => filters.tags!.includes(tag))
      );
    }
    
    // Sort by published date (descending) for published posts, or creation date for drafts
    posts.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt;
      const dateB = b.publishedAt || b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    
    // Apply pagination
    const offset = filters?.offset || 0;
    const limit = filters?.limit;
    
    if (limit) {
      posts = posts.slice(offset, offset + limit);
    } else if (offset > 0) {
      posts = posts.slice(offset);
    }
    
    return posts;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [contactInquiry] = await db
      .insert(contactInquiries)
      .values({
        ...inquiry,
        company: inquiry.company ?? null,
        service: inquiry.service ?? null,
      })
      .returning();
    return contactInquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return await db
      .select()
      .from(contactInquiries)
      .orderBy(desc(contactInquiries.createdAt));
  }

  async updateContactInquiry(id: string, updates: Partial<ContactInquiry>): Promise<ContactInquiry | undefined> {
    const [updated] = await db
      .update(contactInquiries)
      .set(updates)
      .where(eq(contactInquiries.id, id))
      .returning();
    return updated || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [blogPost] = await db
      .insert(blogPosts)
      .values({
        ...post,
        imageUrl: post.imageUrl ?? null,
        imageAlt: post.imageAlt ?? null,
        tags: post.tags ?? null,
        publishedAt: post.publishedAt ?? null,
        sourceUrl: post.sourceUrl ?? null,
      })
      .returning();
    return blogPost;
  }

  async getBlogPosts(filters?: { published?: boolean; tags?: string[]; limit?: number; offset?: number }): Promise<BlogPost[]> {
    let queryBuilder = db.select().from(blogPosts);
    
    // Apply filters
    const conditions = [];
    if (filters?.published !== undefined) {
      if (filters.published) {
        conditions.push(sql`${blogPosts.publishedAt} IS NOT NULL`);
      } else {
        conditions.push(sql`${blogPosts.publishedAt} IS NULL`);
      }
    }
    
    if (filters?.tags && filters.tags.length > 0) {
      conditions.push(sql`${blogPosts.tags} && ${filters.tags}`);
    }
    
    if (conditions.length > 0) {
      queryBuilder = queryBuilder.where(and(...conditions)) as any;
    }
    
    // Order by published date (descending) for published posts, or creation date for drafts
    queryBuilder = queryBuilder.orderBy(desc(sql`COALESCE(${blogPosts.publishedAt}, ${blogPosts.createdAt})`)) as any;
    
    // Apply pagination
    if (filters?.limit) {
      queryBuilder = queryBuilder.limit(filters.limit) as any;
    }
    if (filters?.offset) {
      queryBuilder = queryBuilder.offset(filters.offset) as any;
    }
    
    return await queryBuilder;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db
      .update(blogPosts)
      .set(updates)
      .where(eq(blogPosts.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
