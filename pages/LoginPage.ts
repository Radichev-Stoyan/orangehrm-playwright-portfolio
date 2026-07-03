import { expect, type Page, type Locator } from '@playwright/test';

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(private page: Page) {
        this.usernameInput = this.page.getByPlaceholder('username');
        this.passwordInput = this.page.getByPlaceholder('password');
        this.loginButton = this.page.getByRole('button', { name: ' Login ' });
        this.errorMessage = this.page.getByText('Invalid credentials');
    }

    async goto(baseUrl: string) {
        await this.page.goto(baseUrl);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLoginPageVisible() {
        await expect(this.loginButton).toBeVisible();
    }

    async expectInvalidCredentials() {
        await expect(this.errorMessage).toBeVisible();
    }
}