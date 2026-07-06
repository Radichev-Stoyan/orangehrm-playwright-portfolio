import { expect, type Page } from "@playwright/test";
import { SideMenu } from "./SideMenu";
import { randomEmployee, type Employee } from "../utils/randomData";

export class PimPage {
    constructor(private page: Page, private projectName: string) { }

    async createEmployee() {
        const menu = new SideMenu(this.page, this.projectName);
        const employee = randomEmployee();

        await menu.openPim();

        await expect(this.page.getByRole('button', { name: ' Add ' })).toBeVisible();

        await this.page.getByRole('button', { name: ' Add ' }).click();

        await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();

        await this.page.getByPlaceholder('First Name').fill(employee.firstName);
        await this.page.getByPlaceholder('Middle Name').fill(employee.middleName);
        await this.page.getByPlaceholder('Last Name').fill(employee.lastName);
        await this.page.locator('.oxd-input--active').last().fill(employee.employeeId);

        await this.page.getByRole('button', { name: ' Save ' }).click();

        await expect(
            this.page.getByRole('heading', {
                name: `${employee.firstName} ${employee.lastName}`,
            })
        ).toBeVisible({ timeout: 15000 });

        return employee;
    };

    async searchEmployee(employee: Employee) {
        const menu = new SideMenu(this.page, this.projectName);

        await menu.openPim();

        const employeeIdInput = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .getByRole('textbox');

        if (this.projectName === 'mobile-chrome') {
            await expect(this.page.locator('.oxd-table-filter .oxd-icon-button')).toBeVisible();

            await this.page
                .locator('.oxd-table-filter .oxd-icon-button')
                .click();

            await expect(employeeIdInput).toBeVisible({ timeout: 10000 });
        }

        await employeeIdInput.fill(employee.employeeId);

        await expect(this.page.getByRole('button', { name: ' Search ' })).toBeVisible();

        await this.page.getByRole('button', { name: ' Search ' }).click();

        const employeeRow = this.page
            .getByRole('row')
            .filter({ hasText: employee.employeeId });

        await expect(employeeRow).toBeVisible({ timeout: 15000 });
        await expect(employeeRow).toContainText(employee.firstName);
        await expect(employeeRow).toContainText(employee.lastName);

        // await expect(this.page.getByRole('cell', { name: employee.employeeId, exact: true })).toBeVisible({ timeout: 15000 });
    };

    async openEmployeeProfile(employee: Employee) {
        await this.searchEmployee(employee);

        await this.page.getByRole('row', { name: employee.employeeId }).click();

        await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
    };

    async editEmployee(employee: Employee) {
        await this.openEmployeeProfile(employee);

        await this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Date of Birth' })
            .getByPlaceholder('yyyy-mm-dd')
            .fill('1992-06-15');

        await this.page.getByRole('button', { name: ' Save ' }).click();
    };

    async deleteEmployee(employee: Employee) {
        await this.searchEmployee(employee);

        const employeeRow = this.page
            .locator('.oxd-table-card')
            .filter({ hasText: employee.employeeId });

        await employeeRow.locator('button:has(.bi-trash)').click();

        await this.page.getByRole('button', { name: ' Yes, Delete ' }).click();

        await expect(this.page.getByText('Successfully Deleted')).toBeVisible();
    };
}