const { createConfig } = require('@webpack-blocks/webpack2');
const babel = require('@webpack-blocks/babel6');
const postcss = require('@webpack-blocks/postcss');
const path = require('path');

module.exports = {
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
      sections: [
        {
          name: 'Installation',
          content: 'docs/installation.md'
        }
      ]
    },
    {
      name: 'UI Components',
      content: 'docs/ui.md',
      components: './src/**/[A-Z]*.jsx'
    },
    {
      name: 'Validations',
      content: 'docs/validations.md'
    },
    {
      name: 'Examples',
      content: 'docs/examples.md'
    }
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'docs/components/Wrapper')
  },
  contextDependencies: [
    path.resolve(__dirname, 'src/**/[A-Z]*.jsx')
  ],
  require: [
    path.resolve(__dirname, 'docs/components/setup.js')
  ],
  theme: {
    // '@font-face': {
    //   fontFamily: 'Roboto',
    //   src: 'url("https://fonts.googleapis.com/css?family=Roboto:300,400,500")'
    // },
    fontFamily: {
      base: '"Roboto", "sans-serif"'
    }
  },
  webpackConfig: createConfig([
    babel(),
    postcss()
  ])
};
