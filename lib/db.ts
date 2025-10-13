import fs from "fs/promises";
import path from "path";
import { BlogPost } from "./types";

const BLOG_DATA_PATH = path.join(process.cwd(), "data/blog.json");

async function readBlogData(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(BLOG_DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeBlogData(data: BlogPost[]): Promise<void> {
  await fs.writeFile(BLOG_DATA_PATH, JSON.stringify(data, null, 2));
}

export const db = {
  blog: {
    async getAll(): Promise<BlogPost[]> {
      return await readBlogData();
    },
    async getBySlug(slug: string): Promise<BlogPost | undefined> {
      const posts = await readBlogData();
      return posts.find((p) => p.slug === slug);
    },
    async create(newPost: Omit<BlogPost, "id">): Promise<BlogPost> {
        const posts = await readBlogData();
        const post: BlogPost = {
            ...newPost,
            id: (posts.length + 1).toString(),
        }
        posts.push(post);
        await writeBlogData(posts);
        return post;
    },
    async update(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
        const posts = await readBlogData();
        const postIndex = posts.findIndex((p) => p.id === id);
        if (postIndex === -1) {
            return null;
        }
        const updatedPost = { ...posts[postIndex], ...updates };
        posts[postIndex] = updatedPost;
        await writeBlogData(posts);
        return updatedPost;
    },
    async delete(id: string): Promise<boolean> {
        const posts = await readBlogData();
        const newPosts = posts.filter((p) => p.id !== id);
        if (posts.length === newPosts.length) {
            return false;
        }
        await writeBlogData(newPosts);
        return true;
    },
    async reset(): Promise<void> {
        const initialData = await fs.readFile(path.join(process.cwd(), "data/blog.json.initial"), "utf-8");
        await fs.writeFile(BLOG_DATA_PATH, initialData);
    }
  },
};