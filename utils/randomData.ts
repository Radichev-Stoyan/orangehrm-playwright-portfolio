export function randomString(prefix = 'test') {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export function randomEmployee() {
    return {
        firstName: `QA${Date.now()}`,
        middleName: 'Auto',
        lastName: `Tester${Math.floor(Math.random() * 10000)}`,
        employeeId: `${Date.now().toString().slice(-5)}`
    };
}