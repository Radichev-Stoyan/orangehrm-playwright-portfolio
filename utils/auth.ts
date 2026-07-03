import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function loginAsAdmin(page: Page) {
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
}