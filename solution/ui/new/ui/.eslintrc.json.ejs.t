---
    to: ui/.eslintrc.json
---
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:jest/recommended",
    "eslint-config-prettier",
    "plugin:cypress/recommended"
  ],
  "parser": "babel-eslint",
  "plugins": ["jest", "prettier", "react"],
  "rules": {
    "prettier/prettier": ["error"],
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "^_.+",
        "argsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
        "args": "after-used",
        "ignoreRestSiblings": true
      }
    ],
    "prefer-destructuring": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "class-methods-use-this": 0,
    "no-use-before-define": 0,
    "no-console": 0,
    "no-plusplus": 0,
    "no-nested-ternary": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-filename-extension": 0,
    "react/destructuring-assignment": 0,
    "react/sort-comp": 0,
    "react/prop-types": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest/globals": true
  }
}
