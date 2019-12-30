module.exports = {
  extends: ['airbnb-typescript/base'],
  env: {
    node: true,
  },
  rules: {
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreStrings: true,
    }],
  }
};
