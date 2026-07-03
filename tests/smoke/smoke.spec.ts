import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../utils/auth';
import { SideMenu } from '../../pages/SideMenu';

test.describe('OrangeHRM Smoke Tests', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsAdmin(page);
    });

    test('PIM page should open', async ({ page }, testInfo) => {
        const menu = new SideMenu(page, testInfo.project.name);

        await menu.openPim();

        await expect(page.getByRole('heading', { name: 'PIM' })).toBeVisible();
    });

    test('Admin page should open', async ({ page }, testInfo) => {
        const menu = new SideMenu(page, testInfo.project.name);

        await menu.openAdmin();

        await expect(page.getByRole('heading', { name: 'Admin' })).toBeVisible();
    });

    test('Leave page should open', async ({ page }, testInfo) => {
        const menu = new SideMenu(page, testInfo.project.name);

        await menu.openLeave();

        await expect(page.locator('.oxd-topbar-header-breadcrumb-module')).toBeVisible();
    });

    test('Recruitment page should open', async ({ page }, testInfo) => {
        const menu = new SideMenu(page, testInfo.project.name);

        await menu.openRecruitment();

        await expect(page.getByRole('heading', { name: 'Recruitment' })).toBeVisible();
    });

    test('My Info page should open', async ({ page }, testInfo) => {
        const menu = new SideMenu(page, testInfo.project.name);

        await menu.openMyInfo();

        await expect(page.locator('.orangehrm-edit-employee-navigation')).toBeVisible();
    });

    test('Buzz page should open', async ({ page }, testInfo) => {
        const menu = new SideMenu(page, testInfo.project.name);

        await menu.openBuzz();

        await expect(page.getByPlaceholder("What's on your mind?")).toBeVisible();
    });
})