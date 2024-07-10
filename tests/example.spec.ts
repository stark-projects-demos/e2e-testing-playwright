import { test, expect } from "@playwright/test";
import { StarkScan } from "@stark-ci/playwright";

test("has title", async ({ page }) => {
  await page.goto("https://teamsync-stark.webflow.io/");

  await expect(page).toHaveTitle(/TeamSync/);
});

test("try TeamSync link", async ({ page }) => {
  await page.goto("https://teamsync-stark.webflow.io/");

  await expect(page.getByText(/Try TeamSync/)).toBeVisible();
});

test("accessibility scan", async ({ page }) => {
  await page.goto("https://teamsync-stark.webflow.io/");

  const results = await StarkScan(page.mainFrame(), {
    wcagVersion: "2.2",
    conformanceLevel: "AA",
    sendResults: true,
    name: "TeamSync Site",
    token: process.env.STARK_PROJECT_TOKEN!,
  });

  // Less than 50 overall accessibilty issues at WCAG 2.2 AA.
  expect(results.failed).toBeLessThan(50);

  // Less than 15 failures for contrast issues.
  expect(results.resultsByCriteria["1.4"]?.failed || 0).toBeLessThan(15);
});
