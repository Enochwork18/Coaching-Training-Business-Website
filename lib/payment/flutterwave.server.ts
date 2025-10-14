export async function verifyFlutterwavePayment(transactionId: string) {
  console.log(`Verifying Flutterwave payment for transaction ID: ${transactionId}`);
  // In a real app, you would make a call to Flutterwave's API
  return Promise.resolve({
    success: true,
    data: {
      transactionId: transactionId,
      reference: `ref-${Date.now()}`,
      amount: 5000,
      currency: 'NGN',
      customerEmail: 'test@example.com',
      paidAt: new Date().toISOString(),
    },
  });
}