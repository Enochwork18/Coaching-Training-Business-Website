import fs from "fs/promises";
import path from "path";
import { BlogPost, Service, Booking, Payment } from "./types";

const BLOG_DATA_PATH = path.join(process.cwd(), "data/blog.json");
const SERVICES_DATA_PATH = path.join(process.cwd(), "data/services.json");
const BOOKINGS_DATA_PATH = path.join(process.cwd(), "data/bookings.json");
const PAYMENTS_DATA_PATH = path.join(process.cwd(), "data/payments.json");

async function readData<T>(filePath: string): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeData<T>(filePath: string, data: T[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export const db = {
  blog: {
    async getAll(): Promise<BlogPost[]> {
      return await readData<BlogPost>(BLOG_DATA_PATH);
    },
    async getBySlug(slug: string): Promise<BlogPost | undefined> {
      const posts = await this.getAll();
      return posts.find((p) => p.slug === slug);
    },
    async create(newPost: Omit<BlogPost, "id">): Promise<BlogPost> {
      const posts = await this.getAll();
      const post: BlogPost = {
        ...newPost,
        id: (posts.length + 1).toString(),
      };
      posts.push(post);
      await writeData(BLOG_DATA_PATH, posts);
      return post;
    },
    async update(
      id: string,
      updates: Partial<BlogPost>
    ): Promise<BlogPost | null> {
      const posts = await this.getAll();
      const postIndex = posts.findIndex((p) => p.id === id);
      if (postIndex === -1) {
        return null;
      }
      const updatedPost = { ...posts[postIndex], ...updates };
      posts[postIndex] = updatedPost;
      await writeData(BLOG_DATA_PATH, posts);
      return updatedPost;
    },
    async delete(id: string): Promise<boolean> {
      const posts = await this.getAll();
      const newPosts = posts.filter((p) => p.id !== id);
      if (posts.length === newPosts.length) {
        return false;
      }
      await writeData(BLOG_DATA_PATH, newPosts);
      return true;
    },
    async reset(): Promise<void> {
        const initialData = await fs.readFile(path.join(process.cwd(), "data/blog.json.initial"), "utf-8");
        await fs.writeFile(BLOG_DATA_PATH, initialData);
    }
  },
  services: {
    async getAll(): Promise<Service[]> {
      return await readData<Service>(SERVICES_DATA_PATH);
    },
    async getById(id: string): Promise<Service | undefined> {
      const services = await this.getAll();
      return services.find((s) => s.id === id);
    },
  },
  bookings: {
    async create(newBooking: Omit<Booking, "id">): Promise<Booking> {
      const bookings = await readData<Booking>(BOOKINGS_DATA_PATH);
      const booking: Booking = {
        ...newBooking,
        id: (bookings.length + 1).toString(),
      };
      bookings.push(booking);
      await writeData(BOOKINGS_DATA_PATH, bookings);
      return booking;
    },
    async update(
      id: string,
      updates: Partial<Booking>
    ): Promise<Booking | null> {
      const bookings = await readData<Booking>(BOOKINGS_DATA_PATH);
      const bookingIndex = bookings.findIndex((b) => b.id === id);
      if (bookingIndex === -1) {
        return null;
      }
      const updatedBooking = { ...bookings[bookingIndex], ...updates };
      bookings[bookingIndex] = updatedBooking;
      await writeData(BOOKINGS_DATA_PATH, bookings);
      return updatedBooking;
    },
    async getById(id: string): Promise<Booking | undefined> {
        const bookings = await readData<Booking>(BOOKINGS_DATA_PATH);
        return bookings.find(b => b.id === id);
    }
  },
  payments: {
    async create(newPayment: Omit<Payment, "id">): Promise<Payment> {
        const payments = await readData<Payment>(PAYMENTS_DATA_PATH);
        const payment: Payment = {
            ...newPayment,
            id: (payments.length + 1).toString(),
        }
        payments.push(payment);
        await writeData(PAYMENTS_DATA_PATH, payments);
        return payment;
    },
    async getByReference(ref: string): Promise<Payment | undefined> {
        const payments = await readData<Payment>(PAYMENTS_DATA_PATH);
        return payments.find(p => p.providerReference === ref);
    },
    async update(id: string, updates: Partial<Payment>): Promise<Payment | null> {
        const payments = await readData<Payment>(PAYMENTS_DATA_PATH);
        const paymentIndex = payments.findIndex(p => p.id === id);
        if(paymentIndex === -1) {
            return null;
        }
        const updatedPayment = { ...payments[paymentIndex], ...updates };
        payments[paymentIndex] = updatedPayment;
        await writeData(PAYMENTS_DATA_PATH, payments);
        return updatedPayment;
    }
  }
};