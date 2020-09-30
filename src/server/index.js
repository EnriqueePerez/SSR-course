require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
}); //babel register transpiles node files into ES6 syntax

require('./server');
