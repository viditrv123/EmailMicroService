module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ["next", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}