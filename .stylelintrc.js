module.exports = {
  "root": true,
  "plugins": ["stylelint-scss"],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-config-prettier"],
  "rules": {
    "comment-empty-line-before": "always",
    "declaration-empty-line-before": "never",
    "function-comma-newline-after": "never-multi-line",
    "function-name-case": "lower",
    "comment-no-empty": true,
    "function-whitespace-after": "always",
    "indentation": 2,
    "number-leading-zero": "never",
    "number-no-trailing-zeros": true,
    "rule-empty-line-before": "always-multi-line",
    "selector-combinator-space-after": "always",
    "selector-pseudo-element-colon-notation": "double",
    "value-list-max-empty-lines": 0,
    "font-family-no-missing-generic-family-keyword": true,
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "mixin",
          "include"
        ]
      }
    ],
    "unit-no-unknown": true,

    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "value-no-vendor-prefix": null,
    "property-no-vendor-prefix": null,
    "at-rule-no-vendor-prefix": null
  }
}
