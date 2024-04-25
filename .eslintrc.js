module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "google",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [
    "/lib/**/*",
    "/functions/**/*",
    "/build/**/*",
    "*.config.js",
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": 0,
    "import/no-named-as-default": 0,
  },
};
