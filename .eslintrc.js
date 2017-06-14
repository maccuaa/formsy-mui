module.exports = {
  root: true,

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
      experimentalObjectRestSpread: true,
    }
  },

  env: {
    browser: true,
    es6: true,
    node: true
  },

  plugins: [
    'react'
  ],

  extends: [
    'eslint:recommended',
    'standard',
    'standard-jsx',
    'standard-react',
    'plugin:import/recommended',
    'plugin:import/react',
    'plugin:promise/recommended',
    'plugin:react/recommended'
  ],

  rules: {
    semi: ['error', 'always']
  },

  settings: {
   'import/resolver': {
     'node' :{
       extensions: ['.js','.jsx']
     }
   }
 },
}
