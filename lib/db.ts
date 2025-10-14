import fs from 'fs/promises';
import path from 'path';
import { Booking, Payment } from './types';

const bookingsPath = path.join(process.cwd(), 'data/bookings.json');
const paymentsPath = path.join(process.cwd(), 'data/payments.json');

async function readData(filePath: string) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []; // Return empty array if file doesn't exist
    }
    throw error;
  }
}

async function writeData(filePath: string, data: any) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
  const bookings = await readData(bookingsPath);
  const newBooking: Booking = {
    id: `booking-${Date.now()}`,
    ...bookingData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  bookings.push(newBooking);
  await writeData(bookingsPath, bookings);
  return newBooking;
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
    const bookings = await readData(bookingsPath);
    return bookings.find((booking: Booking) => booking.id === id);
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
  const bookings = await readData(bookingsPath);
  const bookingIndex = bookings.findIndex((booking: Booking) => booking.id === id);
  if (bookingIndex === -1) {
    throw new Error('Booking not found');
  }
  const updatedBooking = { ...bookings[bookingIndex], ...updates, updatedAt: new Date() };
  bookings[bookingIndex] = updatedBooking;
  await writeData(bookingsPath, bookings);
  return updatedBooking;
}

export async function createPayment(paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
  const payments = await readData(paymentsPath);
  const newPayment: Payment = {
    id: `payment-${Date.now()}`,
    ...paymentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  payments.push(newPayment);
  await writeData(paymentsPath, payments);
  return newPayment;
}

export async function getPaymentByReference(reference: string): Promise<Payment | undefined> {
    const payments = await readData(paymentsPath);
    return payments.find((payment: Payment) => payment.bookingId === reference);
}

export async function updatePayment(id: string, updates: Partial<Payment>): Promise<Payment> {
  const payments = await readData(paymentsPath);
  const paymentIndex = payments.findIndex((payment: Payment) => payment.id === id);
  if (paymentIndex === -1) {
    throw new Error('Payment not found');
  }
  const updatedPayment = { ...payments[paymentIndex], ...updates, updatedAt: new Date() };
  payments[paymentIndex] = updatedPayment;
  await writeData(paymentsPath, payments);
  return updatedPayment;
}