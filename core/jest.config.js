/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    collectCoverage: true,
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        '/node_modules/(?!@babel/runtime-corejs3)',
    ],
};