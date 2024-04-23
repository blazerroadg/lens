module.exports = {
  // Tell Jest to use babel-jest for JavaScript transpilation
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  // Tell Jest to handle TypeScript files
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  // Define test environment
  testEnvironment: "jsdom",
  // Optionally, configure setupFiles to include any setup scripts
  // setupFiles: ['./jest.setup.js'],
};
