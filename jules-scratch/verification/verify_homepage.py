import asyncio
from playwright.async_api import async_playwright, expect
import sys

async def test_homepage():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        try:
            print("Navigating to homepage...")
            await page.goto("http://localhost:3000/")
            await page.wait_for_load_state("networkidle")

            print("Verifying Hero Section...")
            await expect(page.locator("h1:has-text('Connected Hearts, Empowered Minds.')")).to_be_visible()

            print("Verifying Services Preview...")
            await expect(page.locator("h2:has-text('Our Services')")).to_be_visible()

            print("Verifying About Snippet...")
            await expect(page.locator("h2:has-text('About Ìbáṣepọ̀')")).to_be_visible()

            print("Verifying Testimonials Preview...")
            await expect(page.locator("h2:has-text('What Our Clients Say')")).to_be_visible()

            print("Verifying Blog Preview...")
            await expect(page.locator("h2:has-text('From the Blog')")).to_be_visible()

            print("Verifying CTA Section...")
            await expect(page.locator("h2:has-text('Ready to Begin Your Journey?')")).to_be_visible()

            await page.screenshot(path="jules-scratch/verification/homepage.png")
            print("✅ Homepage verification PASSED!")
            return True

        except Exception as e:
            print(f"❌ Test FAILED: {str(e)}")
            await page.screenshot(path="jules-scratch/verification/homepage-error.png")
            return False

        finally:
            await browser.close()

async def main():
    success = await test_homepage()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    asyncio.run(main())