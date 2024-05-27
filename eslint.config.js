// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  // Enable stylistic formatting rules
  // stylistic: true,
  react: true,
  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },


  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    '**/fixtures',
    // ...globs
  ]
})