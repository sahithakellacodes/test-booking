import {test, expect} from "@playwright/test";

const HOME_URL = "http://localhost:5173";

// Login Test
test("should be able to login", async ({ page }) => {
  await page.goto(HOME_URL);

  // Get the login button and click it. 
  await page.getByRole("link", { name: "Login" }).click();

  // Expects page to have a heading with the name "Login" to be visible.
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator('input[name="email"]').fill("gummybear@gmail.com");
  await page.locator('input[name="password"]').fill("gummybear");

   await page.getByRole("button", { name: "Login" }).click();


  // Expects page to have a heading with the name "FindMyStay" to be visible.
  await expect(page.getByRole("link", { name: "FindMyStay" })).toBeVisible();
  await expect(page.getByText("Login successful!")).toBeVisible(); // Toast message
});

// Register Test
test("should be able to register", async ({ page }) => {
  await page.goto(HOME_URL);

  // Get the login button and click it.
  await page.getByRole("link", { name: "Register" }).click();

  // Expects page to have a heading with the name "Create an account" to be visible.
  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();

  await page.locator('input[name="username"]').fill("gummwedwedwdrwferfwewybear");
  await page.locator('input[name="email"]').fill("gummywefdewedbe2re3aferfwr@gmail.com");
  await page.locator('input[name="password"]').fill("gummybeare8123928dh91");
  await page.locator('input[name="confirmPassword"]').fill("gummybeare8123928dh91");
  
  await page.getByRole("button", { name: "Create Account" }).click();

  // Expects page to have a heading with the name "FindMyStay" to be visible.
  await expect(page.getByRole("link", { name: "FindMyStay" })).toBeVisible();
  // await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
  await expect(page.getByText("Registered successfully!")).toBeVisible(); // Toast message
});
