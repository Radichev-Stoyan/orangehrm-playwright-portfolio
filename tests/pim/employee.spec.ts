import { test, expect } from "@playwright/test"
import { loginAsAdmin } from "../../utils/auth"
import { SideMenu } from "../../pages/SideMenu"
import { randomEmployee } from "../../utils/randomData"

test.describe('PIM - Employee management', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsAdmin(page);
    });

    test('Adding an employee with valid data', async ({ page }, testInfo) => {
        const menu = new SideMenu(page, testInfo.project.name);
        const employee = randomEmployee();

        await menu.openPim();

        await expect(page.getByRole('button', { name: ' Add ' })).toBeVisible();

        await page.getByRole('button', { name: ' Add ' }).click();

        await expect(page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();

        await page.getByPlaceholder('First Name').fill(employee.firstName);
        await page.getByPlaceholder('Middle Name').fill(employee.middleName);
        await page.getByPlaceholder('Last Name').fill(employee.lastName);
        await page.locator('.oxd-input--active').last().fill(employee.employeeId);

        await page.getByRole('button', { name: ' Save ' }).click();

        const employeeFullName = `${employee.firstName} ${employee.lastName}`;

        await expect(page.getByRole('heading', { name: employeeFullName })).toBeVisible({ timeout: 15000 });
    });

    test('Adding an employee without a first name', async ({ page }, testInfo) => {
        const menu = new SideMenu(page, testInfo.project.name);
        const employee = randomEmployee();

        await menu.openPim();

        await expect(page.getByRole('button', { name: ' Add ' })).toBeVisible();

        await page.getByRole('button', { name: ' Add ' }).click();

        await expect(page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();

        await page.getByPlaceholder('Middle Name').fill(employee.middleName);
        await page.getByPlaceholder('Last Name').fill(employee.lastName);
        await page.locator('.oxd-input--active').last().fill(employee.employeeId);

        await page.getByRole('button', { name: ' Save ' }).click();

        await expect(page.getByText('Required')).toBeVisible();
    });
})