import asyncio
from playwright.async_api import async_playwright, expect
import sys

async def test_booking_flow():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        try:
            print("1️⃣ Navigating to booking page...")
            await page.goto("http://localhost:3000/booking", wait_until="networkidle")

            print("2️⃣ Waiting for form to be ready...")
            await expect(page.locator("h1:has-text('Book a Session')")).to_be_visible()

            # Wait for services to load
            await page.locator('select[name="serviceId"] option:not([value=""])').first.wait_for(timeout=10000)

            # Fill service selection
            print("3️⃣ Selecting service...")
            await page.locator('select[name="serviceId"]').select_option(index=1)

            # Fill form fields
            print("4️⃣ Filling form fields...")
            await page.locator('input[name="clientName"]').fill("Test User")
            await page.locator('input[name="clientEmail"]').fill("test@example.com")
            await page.locator('input[name="clientPhone"]').fill("+2341234567890")
            await page.locator('input[type="date"]').fill("2025-01-20")
            await page.locator('textarea[name="message"]').fill("This is a test booking")
            await page.locator('select[name="currency"]').select_option("NGN")

            # Accept terms
            print("5️⃣ Accepting terms...")
            await page.locator('label[for="terms-checkbox"]').click()

            # Submit form
            print("6️⃣ Submitting form...")
            submit_button = page.locator('button[type="submit"]')
            await expect(submit_button).to_be_enabled()
            await submit_button.click()

            # Wait for payment step
            print("7️⃣ Waiting for payment step...")
            await expect(page.locator("h1:has-text('Complete Payment')")).to_be_visible()

            # Click payment button
            print("8️⃣ Clicking payment button...")
            await page.locator('button:has-text("Paystack")').click()

            # Wait for redirect to success page
            print("9️⃣ Waiting for success page...")
            await page.wait_for_url("**/booking/success**", timeout=15000)

            # Verify success message
            print("🔟 Verifying success message...")
            await expect(page.locator("h1:has-text('Booking Confirmed!')")).to_be_visible()

            # Take screenshot of success
            await page.screenshot(path="jules-scratch/verification/verification.png")

            print("✅ Booking flow verification PASSED!")
            return True

        except Exception as e:
            print(f"❌ Test FAILED: {str(e)}")
            await page.screenshot(path="jules-scratch/verification/verification-error.png")
            return False

        finally:
            await browser.close()

async def main():
    success = await test_booking_flow()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    asyncio.run(main())