import asyncio
from playwright.async_api import async_playwright, expect
import sys

async def test_booking_flow():
    async with async_playwright() as p:
        # Launch browser in headed mode for debugging
        browser = await p.chromium.launch(headless=True, slow_mo=100)
        context = await browser.new_context()
        page = await context.new_page()

        # Enable console logging
        page.on("console", lambda msg: print(f"🖥️  Browser: {msg.text}"))
        page.on("pageerror", lambda err: print(f"❌ Page Error: {err}"))

        try:
            print("1️⃣ Navigating to booking page...")
            await page.goto("http://localhost:3000/booking", wait_until="networkidle")
            await page.wait_for_load_state("domcontentloaded")

            print("2️⃣ Waiting for form to be ready...")
            await expect(page.locator("text=Book a Session")).to_be_visible()

            # Wait for services to load
            await page.locator('select[name="serviceId"] option:not([value=""])').first.wait_for(timeout=10000)
            await page.wait_for_timeout(500) # Allow DOM to settle

            # Fill service selection
            print("3️⃣ Selecting service...")
            service_select = page.locator('select[name="serviceId"]')
            await service_select.wait_for(state="visible")
            # Get all options and select the first non-empty one
            options = await service_select.locator('option').all_text_contents()
            print(f"   Available services: {len(options) - 1}")
            await service_select.select_option(index=1)
            await page.wait_for_timeout(500)

            # Fill form fields in order
            print("4️⃣ Filling client name...")
            name_input = page.locator('input[name="clientName"]')
            await name_input.fill("Test User")
            await page.wait_for_timeout(300)

            print("5️⃣ Filling email...")
            email_input = page.locator('input[name="clientEmail"]')
            await email_input.fill("test@example.com")
            await page.wait_for_timeout(300)

            print("6️⃣ Filling phone...")
            phone_input = page.locator('input[name="clientPhone"]')
            await phone_input.fill("+2341234567890")
            await page.wait_for_timeout(300)

            # Handle date picker
            print("7️⃣ Setting date...")
            # Click the calendar button
            calendar_button = page.locator('button[aria-label*="calendar"], button:has-text("Pick a date")')
            if await calendar_button.count() > 0:
                await calendar_button.click()
                await page.wait_for_timeout(500)
                # Click tomorrow's date (assuming calendar opens to current month)
                tomorrow = page.locator('button[role="gridcell"]:not([disabled])').first
                await tomorrow.click()
                await page.wait_for_timeout(500)
            else:
                # Fallback to date input if calendar button not found
                date_input = page.locator('input[type="date"]')
                if await date_input.count() > 0:
                    await date_input.fill("2025-01-20")

            print("8️⃣ Filling message...")
            message_textarea = page.locator('textarea[name="message"]')
            await message_textarea.fill("This is a test booking from Playwright")
            await page.wait_for_timeout(300)

            # Select currency
            print("9️⃣ Selecting currency...")
            currency_select = page.locator('select[name="currency"]')
            await currency_select.select_option("NGN")
            await page.wait_for_timeout(300)

            # Check terms checkbox - CRITICAL STEP
            print("🔟 Checking terms and conditions...")
            terms_checkbox = page.locator('input[type="checkbox"][name="termsAccepted"]')

            # Method 1: Try direct check
            await terms_checkbox.check(force=True)
            await page.wait_for_timeout(500)

            # Verify checkbox is actually checked
            is_checked = await terms_checkbox.is_checked()
            print(f"   Checkbox checked: {is_checked}")

            if not is_checked:
                print("   ⚠️  Checkbox not checked, trying click method...")
                await terms_checkbox.click(force=True)
                await page.wait_for_timeout(500)
                is_checked = await terms_checkbox.is_checked()
                print(f"   Checkbox checked after click: {is_checked}")

            # Verify button is enabled
            print("1️⃣1️⃣ Verifying submit button is enabled...")
            submit_button = page.locator('button[type="submit"]')
            is_disabled = await submit_button.is_disabled()
            print(f"   Submit button disabled: {is_disabled}")

            if is_disabled:
                print("   ⚠️  Button still disabled! Taking screenshot...")
                await page.screenshot(path="button-disabled.png")

                # Try to force-enable for testing
                await page.evaluate('''
                    const button = document.querySelector('button[type="submit"]');
                    if (button) button.disabled = false;
                ''')
                await page.wait_for_timeout(500)

            # Submit form
            print("1️⃣2️⃣ Submitting form...")
            await submit_button.click()
            await page.wait_for_timeout(1000)

            # Wait for payment step
            print("1️⃣3️⃣ Waiting for payment step...")
            await page.wait_for_selector("text=Complete Payment", timeout=10000)
            await expect(page.locator("text=Complete Payment")).to_be_visible()

            # Take screenshot of payment page
            await page.screenshot(path="payment-step.png")
            print("   📸 Payment step screenshot saved")

            # Click payment button
            print("1️⃣4️⃣ Clicking payment button...")
            payment_button = page.locator('button:has-text("Paystack")')
            await payment_button.wait_for(state="visible")
            await payment_button.click()

            # Wait for redirect to success page
            print("1️⃣5️⃣ Waiting for success page...")
            await page.wait_for_url("**/booking/success**", timeout=15000)

            # Verify success message
            print("1️⃣6️⃣ Verifying success message...")
            await expect(page.locator("text=Booking Confirmed")).to_be_visible(timeout=10000)

            # Take screenshot of success
            await page.screenshot(path="booking-success.png")
            print("   📸 Success screenshot saved")

            print("\n✅ ✅ ✅ Booking flow test PASSED! ✅ ✅ ✅\n")
            return True

        except Exception as e:
            print(f"\n❌ ❌ ❌ Test FAILED ❌ ❌ ❌")
            print(f"Error: {str(e)}")

            # Take screenshot
            await page.screenshot(path="test-error.png")
            print(f"📸 Error screenshot saved to test-error.png")

            # Print current state
            print(f"\nCurrent URL: {page.url}")

            # Check form state
            try:
                terms_checked = await page.locator('input[type="checkbox"]').is_checked()
                button_disabled = await page.locator('button[type="submit"]').is_disabled()
                print(f"Terms checkbox checked: {terms_checked}")
                print(f"Submit button disabled: {button_disabled}")
            except:
                pass

            return False

        finally:
            await browser.close()

# Run the test
async def main():
    success = await test_booking_flow()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    asyncio.run(main())