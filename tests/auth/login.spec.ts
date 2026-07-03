import { LoginPage } from '../../pages/LoginPage';
import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login', () => {
    test('Should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const baseUrl = process.env.BASE_URL;
        const username = process.env.ORANGE_USERNAME;
        const password = process.env.ORANGE_PASSWORD;

        if (!baseUrl || !username || !password) {
            throw new Error('Missing required environment variables');
        }

        await loginPage.goto(baseUrl);
        await loginPage.login(username, password);

        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    test('Should show error with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const baseUrl = process.env.BASE_URL;
        const username = process.env.ORANGE_USERNAME;
        const password = 'fAOWE;BG';

        if (!baseUrl || !username) {
            throw new Error('Missing required environment variables');
        }

        await loginPage.goto(baseUrl);

        await loginPage.login(username, password);

        await loginPage.expectInvalidCredentials();
    });

    test('Should require username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const baseUrl = process.env.BASE_URL;
        const username = '';
        const password = process.env.ORANGE_PASSWORD;

        if (!baseUrl || !password) {
            throw new Error('Missing required environment variables');
        }

        await loginPage.goto(baseUrl);

        await loginPage.login(username, password);

        await expect(page.getByText('Required')).toBeVisible();
    });

    test('Should require password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const baseUrl = process.env.BASE_URL;
        const username = process.env.ORANGE_USERNAME;
        const password = '';

        if (!baseUrl || !username) {
            throw new Error('Missing required environment variables');
        }

        await loginPage.goto(baseUrl);

        await loginPage.login(username, password);

        await expect(page.getByText('Required')).toBeVisible();
    });

    test('Should open forgot password page', async ({ page }) => {
        const baseUrl = process.env.BASE_URL;

        if (!baseUrl) {
            throw new Error('Missing required environment variables');
        }

        await page.goto(baseUrl);

        await page.getByText('Forgot your password? ').click();

        await expect(page.getByPlaceholder('Username')).toBeVisible();
    });
});