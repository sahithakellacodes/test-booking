import { test, expect } from "@playwright/test";
import path from "path";
const HOME_URL = "http://localhost:5173";

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
