import { describe, it, expect } from 'vitest';
import { insertContactInquirySchema, insertBlogPostSchema } from '@shared/schema';

describe('Contact Inquiry Schema', () => {
  it('should validate valid contact inquiry', () => {
    const valid = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      company: 'Acme Corp',
      service: 'Web Development',
      message: 'I would like to discuss a project with your team.',
    };
    
    const result = insertContactInquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('should reject missing required fields', () => {
    const invalid = {
      firstName: 'John',
      email: 'john@example.com',
    };
    
    const result = insertContactInquirySchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should reject invalid email format', () => {
    const invalid = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'any-string-accepted',
      message: 'Test message',
    };
    
    const result = insertContactInquirySchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should accept optional fields as undefined', () => {
    const valid = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      message: 'Test message',
    };
    
    const result = insertContactInquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });
});

describe('Blog Post Schema', () => {
  it('should validate valid blog post', () => {
    const valid = {
      title: 'Test Blog Post',
      slug: 'test-blog-post',
      content: 'This is a test blog post content.',
      excerpt: 'This is a test excerpt.',
      publishedAt: new Date(),
    };
    
    const result = insertBlogPostSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('should reject missing required fields', () => {
    const invalid = {
      title: 'Test Blog Post',
    };
    
    const result = insertBlogPostSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should accept optional fields', () => {
    const valid = {
      title: 'Test Blog Post',
      slug: 'test-blog-post',
      content: 'This is test content.',
      excerpt: 'Test excerpt.',
      tags: ['testing', 'vitest'],
      imageUrl: 'https://example.com/image.jpg',
      imageAlt: 'Test image',
    };
    
    const result = insertBlogPostSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });
});
