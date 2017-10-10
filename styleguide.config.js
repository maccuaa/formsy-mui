const { createConfig } = require('@webpack-blocks/webpack2');
const babel = require('@webpack-blocks/babel6');
const postcss = require('@webpack-blocks/postcss');
const path = require('path');

module.exports = {
  sections: [
    {
      name: 'Introduction',
      content: 'docSrc/introduction.md',
      sections: [
        {
          name: 'Installation',
          content: 'docSrc/installation.md'
        }
      ]
    },
    {
      name: 'UI Components',
      content: 'docSrc/ui.md',
      components: './src/**/[A-Z]*.jsx'
    },
    {
      name: 'Validations',
      content: 'docSrc/validations.md'
    },
    {
      name: 'Examples',
      content: 'docSrc/examples.md'
    }
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'docSrc/components/Wrapper')
  },
  contextDependencies: [
    path.resolve(__dirname, 'src/**/[A-Z]*.jsx')
  ],
  require: [
    path.resolve(__dirname, 'docSrc/components/setup.js')
  ],
  styleguideDir: 'docs',
  title: 'Formsy MUI',
  theme: {
    '@font-face': {
      fontFamily: 'Roboto',
      src: 'url("https://fonts.googleapis.com/css?family=Roboto:300,400,500")'
    },
    fontFamily: {
      base: '"Roboto", "sans-serif"'
    }
  },
  webpackConfig: createConfig([
    babel(),
    postcss()
  ])
};
