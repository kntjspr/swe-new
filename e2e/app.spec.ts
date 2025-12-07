import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
    test('should load with black background', async ({ page }) => {
        await page.goto('/');
        const body = page.locator('body');
        await expect(body).toBeVisible();
        // Check for black background class
        await expect(body).toHaveClass(/bg-black/);
    });

    test('should display header with logo and sign-in button', async ({ page }) => {
        await page.goto('/');
        // Check logo
        const logo = page.locator('header img[alt="FitTracker Logo"]');
        await expect(logo).toBeVisible();
        // Check sign-in button
        const signInButton = page.getByRole('link', { name: /sign in|dashboard/i });
        await expect(signInButton).toBeVisible();
    });

    test('should display hero section content', async ({ page }) => {
        await page.goto('/');
        // Check main heading
        const heading = page.locator('h1');
        await expect(heading).toContainText('Forge Your');
        await expect(heading).toContainText('Physique');
        // Check CTA button
        const ctaButton = page.getByRole('link', { name: /start training/i });
        await expect(ctaButton).toBeVisible();
    });

    test('should display features section', async ({ page }) => {
        await page.goto('/');
        // Scroll to features
        await page.locator('#features').scrollIntoViewIfNeeded();
        // Check feature cards exist
        const aiGeneratorCard = page.locator('text=AI Generator');
        await expect(aiGeneratorCard).toBeVisible();
        const historyLogsCard = page.locator('text=History Logs');
        await expect(historyLogsCard).toBeVisible();
    });

    test('should have working marquee animations', async ({ page }) => {
        await page.goto('/');
        // Check marquee elements exist
        const mainMarquee = page.locator('.animate-marquee');
        await expect(mainMarquee).toBeVisible();
        const footerMarquee = page.locator('.animate-marquee-reverse');
        await expect(footerMarquee).toBeVisible();
    });
});

test.describe('Protected Routes', () => {
    test('should redirect unauthenticated users from /dashboard to /', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForURL('/');
        expect(page.url()).toContain('localhost:3000');
        expect(page.url()).not.toContain('/dashboard');
    });

    test('should redirect unauthenticated users from /generate to /', async ({ page }) => {
        await page.goto('/generate');
        await page.waitForURL('/');
        expect(page.url()).not.toContain('/generate');
    });

    test('should redirect unauthenticated users from /saved to /', async ({ page }) => {
        await page.goto('/saved');
        await page.waitForURL('/');
        expect(page.url()).not.toContain('/saved');
    });

    test('should redirect unauthenticated users from /history to /', async ({ page }) => {
        await page.goto('/history');
        await page.waitForURL('/');
        expect(page.url()).not.toContain('/history');
    });
});

test.describe('Mobile Responsiveness', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display simplified header on mobile', async ({ page }) => {
        await page.goto('/');
        // Nav links should be hidden
        const dashboardLink = page.locator('nav >> text=Dashboard');
        await expect(dashboardLink).not.toBeVisible();
        // Sign-in button should still be visible
        const signInButton = page.getByRole('link', { name: /sign in/i });
        await expect(signInButton).toBeVisible();
    });

    test('should adapt features grid to mobile', async ({ page }) => {
        await page.goto('/');
        await page.locator('#features').scrollIntoViewIfNeeded();
        // Feature cards should stack vertically on mobile
        const featureSection = page.locator('#features');
        await expect(featureSection).toBeVisible();
    });
});

test.describe('Navigation', () => {
    test('should navigate to sign-in when clicking Sign In button', async ({ page }) => {
        await page.goto('/');
        const signInButton = page.getByRole('link', { name: /sign in/i });
        await signInButton.click();
        // Should redirect to dashboard (which redirects to landing if not auth) or auth page
        await page.waitForURL(/\/(dashboard|handler)/);
    });

    test('should have working Learn More anchor link', async ({ page }) => {
        await page.goto('/');
        const learnMoreButton = page.getByRole('link', { name: /learn more/i });
        await learnMoreButton.click();
        // Should scroll to features section
        const featuresSection = page.locator('#features');
        await expect(featuresSection).toBeInViewport();
    });
});

test.describe('Styling', () => {
    test('should have correct orange theme color (#FF4B00)', async ({ page }) => {
        await page.goto('/');
        // Check CTA button has orange background
        const ctaButton = page.getByRole('link', { name: /start training/i });
        await expect(ctaButton).toHaveCSS('background-color', 'rgb(255, 75, 0)');
    });

    test('should use monospace font', async ({ page }) => {
        await page.goto('/');
        const body = page.locator('body');
        await expect(body).toHaveClass(/font-mono/);
    });
});

test.describe('API Endpoints', () => {
    test('should return 401 for unauthenticated /api/stats request', async ({ request }) => {
        const response = await request.get('/api/stats');
        expect(response.status()).toBe(401);
    });

    test('should return 401 for unauthenticated /api/workouts request', async ({ request }) => {
        const response = await request.get('/api/workouts');
        expect(response.status()).toBe(401);
    });

    test('should return 401 for unauthenticated /api/history request', async ({ request }) => {
        const response = await request.get('/api/history');
        expect(response.status()).toBe(401);
    });
});
