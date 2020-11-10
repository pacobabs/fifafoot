module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['src/**/*.ts?(x)'],
  coveragePathIgnorePatterns: ['/node_modules/', '/build/', '/test/', '/coverage/', './commitlint.config.js'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  moduleNameMapper: {
    '\\.module\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(css|scss)$': require.resolve('./__mocks__/styleMock.js'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
      './__mocks__/styleMock.js'
    ),
    '^@components/(.*)': '<rootDir>/src/components/$1',
    '^@assets/(.*)': '<rootDir>/src/assets/$1',
    '^@services/(.*)': '<rootDir>/src/services/$1',
    '^@services': '<rootDir>/src/services/index.ts',
    '^@store/(.*)': '<rootDir>/src/store/$1',
    '^@store': '<rootDir>/src/store/index.tsx',
    '^@utils': '<rootDir>/src/utils/index.ts',
    '^@test/(.*)': '<rootDir>/test/$1'
  },

  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest.preprocess.js'
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'public'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: ``
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`]
}
