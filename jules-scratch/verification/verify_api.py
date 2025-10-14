import asyncio
from playwright.async_api import async_playwright, expect

async def test_api_route():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        try:
            print("Navigating to /api/services...")
            response = await page.goto("http://localhost:3000/api/services")

            print(f"Response status: {response.status}")

            if response.status == 200:
                print("✅ API route is working!")
                json_response = await response.json()
                print("Response JSON:", json_response)
                return True
            else:
                print("❌ API route is NOT working.")
                print("Response text:", await response.text())
                return False

        except Exception as e:
            print(f"An error occurred: {e}")
            return False

        finally:
            await browser.close()

async def main():
    success = await test_api_route()
    import sys
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    asyncio.run(main())