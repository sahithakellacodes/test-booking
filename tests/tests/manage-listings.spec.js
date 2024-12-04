import { test, expect } from "@playwright/test";
import path from "path";
const HOME_URL = "http://localhost:5173";

// Login Before Each Test
test.beforeEach("should be able to login", async ({ page }) => {
  await page.goto(HOME_URL);

  // Get the login button and click it.
  await page.getByRole("link", { name: "Login" }).click();

  // Expects page to have a heading with the name "Login" to be visible.
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator('input[name="email"]').fill("gummybear@gmail.com");
  await page.locator('input[name="password"]').fill("gummybear");

  await page.getByRole("button", { name: "Login" }).click();

  // Expects a toast message to be visible.
  await expect(page.getByText("Login successful!")).toBeVisible(); // Toast message
});

// Add Listing Test
test("should be able to add a listing", async ({ page }) => {
  await page.goto(HOME_URL);

  // Get the list your property button and click it.
  await page.getByRole("link", { name: "List your property" }).click();

  // Expects page to have a heading with the name "List Your Property" to be visible.
  await expect(
    page.getByRole("heading", { name: "List Your Property" })
  ).toBeVisible();

  await page.locator('input[name="name"]').fill("Test Name");
  await page.locator('input[name="city"]').fill("Test City");
  await page.locator('input[name="country"]').fill("Test Country");
  await page.locator('textarea[name="description"]').fill("Test Description");
  await page.locator('input[name="price"]').fill("123");
  await page.selectOption('select[name="propertyRating"]', "3");
  await page.selectOption('select[name="adultCount"]', "2");
  await page.selectOption('select[name="childCount"]', "2");
  await page.getByText("Beach Resort").click();
  await page.getByText("Free WiFi").click();

  await page
    .locator('input[name="imageFiles"]')
    .setInputFiles([path.join(__dirname, "test-files", "test-image.jpg")]);

  await page.getByRole("button", { name: "Save" }).click();

  // Expects a toast message to be visible.
  await expect(page.getByText("Listing added successfully!")).toBeVisible(); // Toast message
});

// View Listing Test
test("should be able to view all listings", async ({ page }) => {
  await page.goto(HOME_URL);
  await page.getByRole("link", { name: "My Listings" }).click();

  await expect(
    page.getByRole("heading", { name: "My Listings" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Edit" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Delete" }).first()
  ).toBeVisible();
  await expect(page.getByText("dwihoi")).toBeVisible();
});
