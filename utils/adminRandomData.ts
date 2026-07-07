export function generateRandomUsername() {
    return `user_${Date.now()}`;
}

export function generateRandomPassword(length = 12): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';

    const allCharacters = lowercase + uppercase + numbers + symbols;

    const password = [
        lowercase[Math.floor(Math.random() * lowercase.length)],
        uppercase[Math.floor(Math.random() * uppercase.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
    ];

    for (let i = password.length; i < length; i++) {
        password.push(allCharacters[Math.floor(Math.random() * allCharacters.length)]);
    }

    return password.sort(() => Math.random() - 0.5).join('');
}

export function getRandomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}