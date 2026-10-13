import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/services",
  "/gallery",
  "/meet-cassie",
  "/reviews",
  "/book",
  "/privacy",
];
for (const width of [360, 390, 768, 1024, 1280, 1440])
  for (const colorScheme of ["light"] as const) {
    test(`${width}px: all pages`, async ({ page }) => {
      await page.setViewportSize({ width, height: 960 });
      await page.emulateMedia({ colorScheme });
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      for (const route of routes) {
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);
        await expect(page.locator("h1")).toHaveCount(1);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        if (width === 390 || width === 1440)
          await page.screenshot({
            path: `screenshots/${width}-${colorScheme}-${route.replaceAll("/", "") || "home"}.png`,
            fullPage: true,
          });
      }
      expect(errors).toEqual([]);
    });
  }
test("stays light when the device prefers dark mode", async ({ page }) => {
  const background = async (colorScheme: "light" | "dark") => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    return page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  };
  expect(await background("dark")).toBe(await background("light"));
});
test("keyboard navigation and slider", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  const slider = page.getByRole("slider");
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveValue("51");
});
test("reduced motion disables loops", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const names = await page
    .locator(".mascot-tail,.bubble,.hero-blob")
    .evaluateAll((nodes) =>
      nodes.map((n) => getComputedStyle(n).animationName),
    );
  expect(names.every((n) => n === "none")).toBe(true);
});
test("empty and invalid input", async ({ page }) => {
  await page.goto("/book");
  await page.getByRole("button", { name: "Request a Spa Day" }).click();
  await expect(page.locator("#ownerName")).toBeFocused();
  await page.locator("#email").fill("invalid");
  expect(
    await page
      .locator("#email")
      .evaluate((n) => (n as HTMLInputElement).validity.valid),
  ).toBe(false);
});
test("valid form without secrets", async ({ page }) => {
  test.skip(
    process.env.RUN_UNCONFIGURED_FORM_TEST !== "1",
    "Do not send live appointments in QA",
  );
  await page.goto("/book");
  for (const [id, value] of Object.entries({
    ownerName: "QA Test",
    phone: "6145550123",
    dogName: "Test Pup",
    breed: "Mixed",
    date: "2099-06-20",
  }))
    await page.locator(`#${id}`).fill(value);
  await page.locator("#size").selectOption("medium");
  await page.locator("#service").selectOption("bath");
  await page.locator("#time").selectOption("flexible");
  await page.getByRole("button", { name: "Request a Spa Day" }).click();
  // Scope to the form: Next.js also renders a role="alert" route announcer.
  await expect(page.locator(".form-message")).toContainText(
    "temporarily unavailable",
  );
});
test("no-JS content", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("From scruffy to snuggly.")).toBeVisible();
  await context.close();
});
