import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "../../utils/auth";
import { SideMenu } from "../../pages/SideMenu";
import { AdminPage } from "../../pages/AdminPage";
import { randomEmployee } from "../../utils/randomData";
import { PimPage } from "../../pages/PimPage";

test.describe('Admin - User management', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsAdmin(page);
    });

    test('Should open Admin page', async ({ page }, testInfo) => {
        const menu = new SideMenu(page, testInfo.project.name);

        await menu.openAdmin();

        await expect(page).toHaveURL(/\/admin\/viewSystemUsers/);
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    });

    test('Create user', async ({ page }, testInfo) => {
        const sideMenu = new SideMenu(page, testInfo.project.name);

        await sideMenu.openPim();

        const pimPage = new PimPage(page, testInfo.project.name);

        const employee = await pimPage.createEmployee();

        await sideMenu.openAdmin();

        const adminPage = new AdminPage(page);

        await adminPage.createUserAdminPage(employee.firstName);

        await expect(page.locator('.oxd-toast--success')).toContainText('Successfully Saved');

        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    });

    test('Search user by username', async ({ page }, testInfo) => {
        const sideMenu = new SideMenu(page, testInfo.project.name);

        await sideMenu.openPim();

        const pimPage = new PimPage(page, testInfo.project.name);

        const employee = await pimPage.createEmployee();

        await sideMenu.openAdmin();

        const adminPage = new AdminPage(page);

        const username = await adminPage.createUserAdminPage(employee.firstName);

        employee.username = username;

        await expect(page.locator('.oxd-toast--success')).toContainText('Successfully Saved');

        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

        if (testInfo.project.use.isMobile) {
            await page.locator('.oxd-table-filter .oxd-icon-button').click();
            await expect(page
                .locator('.oxd-label')
                .filter({ hasText: 'Username' })
            ).toBeVisible();
        }

        const usernameInput = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Username' })
            .getByRole('textbox');

        await usernameInput.fill(username);

        await page.getByRole('button', { name: ' Search ' }).click();

        const usernameTableCell = page
            .locator('.oxd-table-row .oxd-table-cell')
            .filter({ hasText: `${employee.username}` });

        await expect(usernameTableCell).toBeVisible();

        await adminPage.deleteUser(employee.username);
    });
})