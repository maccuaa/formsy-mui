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
        },
        {
          name: 'Configuration',
          content: 'docs/configuration.md'
        }
      ]
    },
    {
      name: 'UI Components',
      content: 'docs/ui.md',
      components: './src/**/[A-Z]*.jsx'
    }
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'docs/components/Wrapper')
  },
  contextDependencies: [
    path.resolve(__dirname, 'src/**/[A-Z]*.jsx')
  ],
  require: [
    path.resolve(__dirname, 'docs/setup.js')
  ],
  webpackConfig: createConfig([
    babel(),
    postcss()
  ])
};
