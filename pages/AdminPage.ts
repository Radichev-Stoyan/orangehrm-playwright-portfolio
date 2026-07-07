import { expect, type Page } from "@playwright/test";
import { generateRandomPassword, generateRandomUsername, getRandomItem } from "../utils/adminRandomData";

export class AdminPage {
    constructor(private page: Page) { }

    private async selectUserRole(): Promise<'Admin' | 'ESS'> {
        const roles: Array<'Admin' | 'ESS'> = ['Admin', 'ESS'];
        const role = getRandomItem(roles);

        const userRoleDropdown = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'User Role' })
            .locator('.oxd-select-text');

        await userRoleDropdown.click();

        await this.page
            .getByRole('option', { name: role })
            .click();

        await expect(userRoleDropdown).toContainText(role);

        return role;
    }

    async selectStatus(): Promise<'Enabled' | 'Disabled'> {
        const statuses: Array<'Enabled' | 'Disabled'> = ['Enabled', 'Disabled'];
        const status = getRandomItem(statuses);

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

        return status;
    }

    async createUserAdminPage(employeeFirstName: string) {
        const saveButton = this.page.getByRole('button', { name: ' Save ' });

        await this.page.getByRole('button', { name: ' Add ' }).click();

        await expect(this.page.getByRole('heading', { name: 'Add User' })).toBeVisible();
        await expect(saveButton).toBeEnabled();

        await this.selectUserRole();

        const employeeNameInput = this.page.getByPlaceholder('Type for hints...');

        await employeeNameInput.fill(employeeFirstName);

        const suggestion = this.page
            .locator('.oxd-autocomplete-dropdown')
            .getByText(employeeFirstName, { exact: false });

        await expect(suggestion).toBeVisible();
        await suggestion.click();

        await expect(employeeNameInput).toHaveValue(new RegExp(employeeFirstName));

        await this.selectStatus();

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