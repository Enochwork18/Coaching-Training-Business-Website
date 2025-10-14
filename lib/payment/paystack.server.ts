export async function verifyPaystackPayment(reference: string) {
  console.log(`Verifying Paystack payment for reference: ${reference}`);
  // In a real app, you would make a call to Paystack's API
  return Promise.resolve({
    success: true,
    data: {
      transactionId: `test-txn-${Date.now()}`,
      reference: reference,
      amount: 5000,
      currency: 'NGN',
      customerEmail: 'test@example.com',
      paidAt: new Date().toISOString(),
    },
  });
}