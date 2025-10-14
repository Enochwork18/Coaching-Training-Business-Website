async function testPaymentFlow() {
  const baseUrl = 'http://localhost:3000'

  console.log('1. Testing payment initialization...')
  const initResponse = await fetch(`${baseUrl}/api/payments/initialize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      serviceId: 'pre-marital-coaching',
      clientName: 'Test User',
      clientEmail: 'test@example.com',
      clientPhone: '+2341234567890',
      preferredDate: new Date().toISOString(),
      message: 'Test booking',
      paymentProvider: 'paystack',
      currency: 'NGN',
    }),
  })

  const initData = await initResponse.json()
  console.log('Init Response:', JSON.stringify(initData, null, 2))

  if (!initData.success) {
    console.error('❌ Payment initialization failed!')
    return
  }

  console.log('✅ Payment initialized successfully')
  console.log('Booking ID:', initData.booking.id)

  // Test payment verification
  console.log('\n2. Testing payment verification...')
  const verifyResponse = await fetch(`${baseUrl}/api/payments/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reference: initData.booking.id,
      provider: 'paystack',
      transactionId: 'test-txn-123',
    }),
  })

  const verifyData = await verifyResponse.json()
  console.log('Verify Response:', JSON.stringify(verifyData, null, 2))

  if (verifyData.success) {
    console.log('✅ Payment verified successfully')
  } else {
    console.error('❌ Payment verification failed!')
  }

  // Test booking retrieval
  console.log('\n3. Testing booking retrieval...')
  const bookingResponse = await fetch(`${baseUrl}/api/bookings/${initData.booking.id}`)
  const bookingData = await bookingResponse.json()
  console.log('Booking Status:', bookingData.status)
  console.log('✅ All API tests complete!')
}

testPaymentFlow().catch(console.error)