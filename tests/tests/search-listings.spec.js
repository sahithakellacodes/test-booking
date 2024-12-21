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

// P.S. use dev db for testing

// Should be able to search hotels in a city
test("should be able to search hotels in a city", async ({ page }) => {
  await page.goto(HOME_URL);
  await page.locator('input[placeholder="Where are you going?"]').fill("Goa");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(
    page.locator("span", { hasText: "3 results found in Goa" })
  ).toBeVisible();
});

// Should be able to view hotel details and book
test("should be able to view hotel details and book", async ({ page }) => {
  await page.goto(HOME_URL);

  await page.getByPlaceholder("Where are you going?").fill("Hyderabad");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("My Property").click();
  await expect(page).toHaveURL(/details/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

// Should be able to filter by Property Rating
// test("Should be able to filter by Property Rating", async ({ page }) => {
//   await page.goto(HOME_URL);
//   await page.locator('input[placeholder="Where are you going?"]').fill("Goa");
//   await page.getByRole("button", { name: "Search" }).click();

//   await expect(
//     page.locator("span", { hasText: "3 results found in Goa" })
//   ).toBeVisible();

//   await page.getByRole("span", { hasText: "5 stars" }).click();

//   await expect(
//     page.locator("span", { hasText: "1 results found in Goa" })
//   ).toBeVisible();
// });
