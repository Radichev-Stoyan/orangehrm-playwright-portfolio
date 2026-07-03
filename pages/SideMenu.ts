import { expect, type Page } from "@playwright/test";

export class SideMenu {
    constructor(private page: Page, private projectName: string) { }

    private isMobileProject() {
        return this.projectName === 'mobile-chrome';
    }

    private async openMobileMenuIfNeeded(name: string) {
        if (!this.isMobileProject()) {
            return;
        }

        await this.page.locator('.oxd-topbar-header-hamburger').click();

        await expect(this.page.getByRole('link', { name: `${name}` })).toBeVisible();
    }

    async openPim() {
        await this.openMobileMenuIfNeeded('PIM');

        await this.page.getByRole('link', { name: 'PIM' }).click();
    };

    async openAdmin() {
        await this.openMobileMenuIfNeeded('Admin');

        await this.page.getByRole('link', { name: 'Admin' }).click();
    };

    async openLeave() {
        await this.openMobileMenuIfNeeded('Leave');

        await this.page.getByRole('link', { name: 'Leave' }).click();
    };

    async openRecruitment() {
        await this.openMobileMenuIfNeeded('Recruitment');

        await this.page.getByRole('link', { name: 'Recruitment' }).click();
    };

    async openMyInfo() {
        await this.openMobileMenuIfNeeded('My Info');

        await this.page.getByRole('link', { name: 'My Info' }).click();
    };

    async openBuzz() {
        await this.openMobileMenuIfNeeded('Buzz');

        await this.page.getByRole('link', { name: 'Buzz' }).click();
    };
}