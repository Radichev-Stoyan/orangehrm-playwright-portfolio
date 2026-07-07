import { expect, type Page } from "@playwright/test";
import { generateRandomPassword, generateRandomUsername } from "../utils/adminRandomData";

export class AdminPage {
    constructor(private page: Page) { }

    private async selectUserRole(role: 'Admin' | 'ESS') {
        const userRoleDropdown = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'User Role' })
            .locator('.oxd-select-text');

        await userRoleDropdown.click();

        await this.page
            .getByRole('option', { name: role })
            .click();
    }

    async selectStatus(status: 'Enabled' | 'Disabled') {
        const statusDropdown = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Status' })
            .locator('.oxd-select-text');

        await statusDropdown.click();

        await this.page
            .locator('.oxd-select-dropdown')
            .getByText(status, { exact: true })
            .click();

        await expect(statusDropdown).toContainText(status);
    }

    async createUserAdminPage(employeeFirstName: string) {
        const saveButton = this.page.getByRole('button', { name: ' Save ' });

        await this.page.getByRole('button', { name: ' Add ' }).click();

        await expect(this.page.getByRole('heading', { name: 'Add User' })).toBeVisible();
        await expect(saveButton).toBeEnabled();

        await this.selectUserRole('Admin');

        const employeeNameInput = this.page.getByPlaceholder('Type for hints...');

        await employeeNameInput.fill(employeeFirstName);

        const suggestion = this.page
            .locator('.oxd-autocomplete-dropdown')
            .getByText(employeeFirstName, { exact: false });

        await expect(suggestion).toBeVisible();
        await suggestion.click();

        await expect(employeeNameInput).toHaveValue(new RegExp(employeeFirstName));

        await this.selectStatus('Enabled');

        const usernameInput = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Username' })
            .getByRole('textbox');

        const username = generateRandomUsername();

        await usernameInput.fill(username);

        const passwordSection = this.page.locator('form').locator('input[type="password"]');

        const passwordInput = passwordSection.first();
        const confirmPasswordInput = passwordSection.nth(1);

        const password = generateRandomPassword();

        await passwordInput.fill(password);
        await confirmPasswordInput.fill(password);

        await saveButton.click();

        return username;
    }

    async searchUserByUsername(username: string) {
        const usernameInput = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Username' })
            .getByRole('textbox');

        await usernameInput.fill(username);

        await this.page.getByRole('button', { name: ' Search ' }).click();
    }
}