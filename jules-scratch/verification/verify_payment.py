from playwright.sync_api import sync_playwright, expect
import datetime

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Navigate to the booking page.
        page.goto("http://localhost:3000/booking")
        try:
            page.wait_for_selector("text=Marriage & Relationship Counseling", timeout=5000)
        except:
            page.screenshot(path="jules-scratch/verification/00_error.png")
            raise

        # 2. Fill out the booking form.
        page.get_by_label("Select Service *").locator('..').click()
        page.get_by_text("Marriage & Relationship Counseling").click()
        page.get_by_label("Full Name *").fill("Test User")
        page.get_by_label("Email Address *").fill("test@example.com")
        page.get_by_label("Phone Number (with country code) *").fill("+1234567890")

        # Set a future date for the datetime-local input
        now = datetime.datetime.now()
        future_date = now + datetime.timedelta(days=7)
        date_string = future_date.strftime("%Y-%m-%dT%H:%M")
        page.get_by_label("Preferred Date & Time *").fill(date_string)

        page.get_by_label("Additional Information").fill("This is a test booking.")
        page.get_by_label("I agree to the").check()

        # 3. Proceed to the payment step.
        page.get_by_role("button", name="Proceed to Payment").click()
        page.wait_for_selector("text=Complete Payment")

        # 4. Take a screenshot of the payment page.
        page.screenshot(path="jules-scratch/verification/01_payment_page.png")

        # 5. Simulate a successful payment.
        # In a real scenario, we would interact with the payment provider's iframe.
        # For this verification, we will directly call the success callback.
        page.evaluate("() => { window.handlePaymentSuccess({ transaction: 'mock_transaction' }) }")

        # 6. Take a screenshot of the success page.
        page.wait_for_selector("text=Booking Confirmed!")
        page.screenshot(path="jules-scratch/verification/02_success_page.png")

        browser.close()

if __name__ == "__main__":
    run_verification()