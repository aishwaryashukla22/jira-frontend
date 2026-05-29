module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "<rootDir>/styleMock.js"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
    }
};