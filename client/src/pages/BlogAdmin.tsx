import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  FileText,
  Plus,
  RefreshCw,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  BarChart3,
  Loader2,
} from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  createdAt: string;
  author?: string;
  readingTime?: number;
  qualityScore?: number;
  generationSource?: string;
  keywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
}

interface GenerateResult {
  success: boolean;
  title: string;
  slug?: string;
  score: number;
  issues: string[];
  published: boolean;
  url?: string;
  error?: string;
}

export default function BlogAdmin() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  // Fetch all posts (admin endpoint includes drafts)
  const { data, isLoading, error } = useQuery<{ posts: BlogPost[] }>({
    queryKey: ["/api/blog/admin/posts", filter],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: "100" });
      if (filter === "published") params.set("published", "true");
      if (filter === "draft") params.set("published", "false");
      const res = await fetch(`/api/blog/admin/posts?${params}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  // Fetch next topic preview
  const { data: nextTopic } = useQuery<{
    pillar: string;
    topic: string;
    dayIndex: number;
  }>({
    queryKey: ["/api/blog/next-topic"],
  });

  // Generate new post mutation
  const generateMutation = useMutation<GenerateResult>({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/blog/generate", {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/admin/posts"] });
    },
  });

  // Seed posts mutation
  const seedMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/blog/seed", {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/admin/posts"] });
    },
  });

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/blog/admin/posts/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/admin/posts"] });
    },
  });

  const posts = data?.posts || [];
  const publishedCount = posts.filter((p) => p.publishedAt).length;
  const draftCount = posts.filter((p) => !p.publishedAt).length;
  const avgScore =
    posts.length > 0
      ? Math.round(
          posts.reduce((sum, p) => sum + (p.qualityScore || 0), 0) /
            posts.filter((p) => p.qualityScore).length || 0
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog Admin" },
          ]}
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Blog Engine
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Auto Blog Poster — Content Generation & Management
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => seedMutation.mutate()}
              disabled={seedMutation.isPending}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-sm"
            >
              <RefreshCw
                className={`w-4 h-4 ${seedMutation.isPending ? "animate-spin" : ""}`}
              />
              Seed Posts
            </button>
            <button
              onClick={() => generateMutation.mutate()}
              disabled={generateMutation.isPending}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition text-sm font-medium"
            >
              {generateMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              Generate New Post
            </button>
          </div>
        </div>

        {/* Generation result banner */}
        {generateMutation.data && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              generateMutation.data.published
                ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                : generateMutation.data.success
                  ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
                  : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
            }`}
          >
            <div className="flex items-start gap-3">
              {generateMutation.data.published ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              )}
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {generateMutation.data.published
                    ? "Published: "
                    : generateMutation.data.success
                      ? "Generated (held as draft): "
                      : "Error: "}
                  {generateMutation.data.title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Quality Score: {generateMutation.data.score}/100
                  {generateMutation.data.issues.length > 0 &&
                    ` • Issues: ${generateMutation.data.issues.join(", ")}`}
                </p>
                {generateMutation.data.url && (
                  <a
                    href={generateMutation.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-600 hover:underline mt-1 inline-block"
                  >
                    View live post →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-1">
              <FileText className="w-4 h-4" />
              Total Posts
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {posts.length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-green-600 text-sm mb-1">
              <CheckCircle className="w-4 h-4" />
              Published
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {publishedCount}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-amber-600 text-sm mb-1">
              <Clock className="w-4 h-4" />
              Drafts
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {draftCount}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-blue-600 text-sm mb-1">
              <BarChart3 className="w-4 h-4" />
              Avg Quality
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {avgScore || "—"}/100
            </p>
          </div>
        </div>

        {/* Next topic preview */}
        {nextTopic && (
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl p-4 mb-8 border border-teal-200 dark:border-teal-800">
            <p className="text-sm font-medium text-teal-700 dark:text-teal-400 mb-1">
              📝 Next Auto-Generated Topic
            </p>
            <p className="text-slate-900 dark:text-white font-medium">
              {nextTopic.topic}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Pillar: {nextTopic.pillar} • Day Index: {nextTopic.dayIndex}
            </p>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "published", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">
            Failed to load posts. Is the database connected?
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              No blog posts yet. Click "Seed Posts" to add initial content, or
              "Generate New Post" to create one with AI.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Source
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                      Score
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                      Date
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white text-sm line-clamp-1">
                            {post.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            /{post.slug}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            post.generationSource === "webhook" || post.generationSource === "n8n"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                          }`}
                        >
                          {post.generationSource || "manual"}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {post.qualityScore ? (
                          <span
                            className={`text-sm font-medium ${
                              post.qualityScore >= 80
                                ? "text-green-600"
                                : post.qualityScore >= 60
                                  ? "text-amber-600"
                                  : "text-red-600"
                            }`}
                          >
                            {post.qualityScore}/100
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {post.publishedAt ? (
                          <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-medium">
                            <Clock className="w-3 h-3" />
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-sm text-slate-500">
                          {new Date(
                            post.publishedAt || post.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-teal-600 transition"
                            title="View post"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  `Delete "${post.title}"? This cannot be undone.`
                                )
                              ) {
                                deleteMutation.mutate(post.id);
                              }
                            }}
                            className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 hover:text-red-600 transition"
                            title="Delete post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
