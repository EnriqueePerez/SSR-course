require('ignore-styles');

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
}); //babel register transpiles node files into ES6 syntax

require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif'],
  name: '/assets/[hash].[ext]',
});

require('./server');
