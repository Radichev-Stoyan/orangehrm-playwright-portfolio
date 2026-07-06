// const baseUrl: string = process.env.BASE_URL ?? 'http://localhost:8080';
// const loginUrl = `${baseUrl}/web/index.php/auth/login`;

// const timeoutMs = 120_000;
// const intervalMs = 3_000;

// function sleep(ms: number): Promise<void> {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function waitForOrangeHrm(): Promise<void> {
//     const startedAt = Date.now();

//     while (Date.now() - startedAt < timeoutMs) {
//         try {
//             const response = await fetch(loginUrl);
//             const body = await response.text();

//             if (
//                 response.ok &&
//                 body.includes('Username') &&
//                 body.includes('Password')
//             ) {
//                 console.log(`OrangeHRM login page is ready: ${loginUrl}`);
//                 return;
//             }

//             console.log(`OrangeHRM is not ready yet. Current URL checked: ${loginUrl}`);
//         } catch {
//             console.log(`Waiting for OrangeHRM at ${loginUrl}...`);
//         }

//         await sleep(intervalMs);
//     }

//     throw new Error(`OrangeHRM login page did not become ready within ${timeoutMs / 1000}s`);
// }

// waitForOrangeHrm();

/// <reference types="node" />

const baseUrl = process.env.BASE_URL ?? 'http://localhost:8080';
const loginUrl = `${baseUrl}/web/index.php/auth/login`;

const timeoutMs = 120_000;
const intervalMs = 3_000;

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForOrangeHrm(): Promise<void> {
    const startedAt = Date.now();

    while (Date.now() - startedAt < timeoutMs) {
        try {
            const response = await fetch(loginUrl);
            const body = await response.text();

            const isSetupWizard =
                body.includes('Setup Wizard') ||
                body.includes('OrangeHRM Starter Version') ||
                body.includes('Fresh Installation') ||
                body.includes('Upgrading an Existing Installation');

            const isReachable = response.ok || response.status < 500;

            if (isReachable && !isSetupWizard) {
                console.log(`OrangeHRM is ready: ${loginUrl}`);
                return;
            }

            console.log(
                `OrangeHRM is not ready yet. Status: ${response.status}. Checked: ${loginUrl}`
            );
        } catch {
            console.log(`Waiting for OrangeHRM at ${loginUrl}...`);
        }

        await sleep(intervalMs);
    }

    throw new Error(
        `OrangeHRM did not become ready within ${timeoutMs / 1000}s`
    );
}

waitForOrangeHrm();