import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO
  author: string;
  excerpt: string;
  category?: string;
  draft?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

export async function listPosts(): Promise<PostMeta[]> {
  const entries = await fs.readdir(POSTS_DIR);
  const posts = await Promise.all(
    entries
      .filter((f) => f.endsWith(".mdx"))
      .map(async (filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        const raw = await fs.readFile(path.join(POSTS_DIR, filename), "utf8");
        const { data } = matter(raw);
        return {
          slug,
          title: (data.title as string) ?? slug,
          date: (data.date as string) ?? "",
          author: (data.author as string) ?? "ApexShield team",
          excerpt: (data.excerpt as string) ?? "",
          category: data.category as string | undefined,
          draft: Boolean(data.draft),
        } satisfies PostMeta;
      }),
  );
  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const raw = await fs.readFile(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      author: (data.author as string) ?? "ApexShield team",
      excerpt: (data.excerpt as string) ?? "",
      category: data.category as string | undefined,
      draft: Boolean(data.draft),
      content,
    };
  } catch {
    return null;
  }
}

export async function listSlugs(): Promise<string[]> {
  const entries = await fs.readdir(POSTS_DIR);
  return entries
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
