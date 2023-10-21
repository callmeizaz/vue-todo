module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: ["error", "double", { allowTemplateLiterals: false }],
    "vue/no-deprecated-scope-attribute": "error",

    "vue/no-unused-components": "error",
    "vue/no-template-shadow": "error",
    "vue/no-mutating-props": "error",
    "vue/no-v-html": "error",
  },
};
