module.exports = {
  printWidth: 100,
  tabWidth: 4,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "avoid",
  overrides: [
    {
      files: ["*.json", "*.css", "*.scss"],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
