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
            await page.goto("http://localhost:3000/booking")
            await page.wait_for_load_state("networkidle")

            print("2️⃣ Waiting for form to be ready...")
            await expect(page.locator("h1:has-text('Book a Session')")).to_be_visible()

            # Verify Calendly embed is visible
            print("3️⃣ Verifying Calendly embed is visible...")
            await expect(page.locator('iframe[src*="calendly.com"]')).to_be_visible()

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