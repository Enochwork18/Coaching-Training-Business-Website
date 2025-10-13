from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 0. Reset the database
        page.request.post("http://localhost:3000/api/admin/blog/reset")

        # 1. Navigate to the blog page and take a screenshot.
        page.goto("http://localhost:3000/blog")
        page.wait_for_selector("text=5 Pillars of a Healthy Marriage")
        page.screenshot(path="jules-scratch/verification/01_blog_list.png")

        # 2. Click on the first blog post and take a screenshot.
        page.get_by_text("5 Pillars of a Healthy Marriage").click()
        page.wait_for_selector("text=Shared Faith & Values")
        page.screenshot(path="jules-scratch/verification/02_blog_post_details.png")

        # 3. Navigate to the admin blog page and take a screenshot.
        page.goto("http://localhost:3000/admin/blog")
        page.wait_for_selector("text=5 Pillars of a Healthy Marriage")
        page.screenshot(path="jules-scratch/verification/03_admin_blog_list.png")

        # 4. Click on the "New Post" button.
        page.get_by_role("link", name="New Post").click()
        page.wait_for_selector("text=New Blog Post")

        # 5. Fill out the new post form.
        page.get_by_label("Title").fill("My New Test Post")
        page.get_by_label("Slug").fill("my-new-test-post")
        page.get_by_label("Excerpt").fill("This is a test post created by a Playwright script.")
        page.get_by_label("Content (Markdown)").fill("## Hello World\\n\\nThis is the content of the test post.")
        page.get_by_role("combobox").nth(0).click()
        page.get_by_role("option", name="Faith").click()
        page.get_by_label("Tags (comma-separated)").fill("test, playwright")
        page.get_by_label("Image URL").fill("/blog/test-image.jpg")

        # 6. Submit the new post.
        page.get_by_role("button", name="Create Post").click()

        # 7. Take a screenshot of the admin blog list with the new post.
        page.wait_for_selector("text=My New Test Post")
        page.screenshot(path="jules-scratch/verification/04_admin_blog_list_with_new_post.png")

        browser.close()

if __name__ == "__main__":
    run_verification()