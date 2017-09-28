require('babel-core/register');
import _ from 'lodash-compat';
import baseConfig, { options } from './base.config';

const entryFile = `${options.componententry}`;
const dispath = `${options.distpath}`;
const componentname = `${options.componentname}`;

var nodeExternals = require('webpack-node-externals');

export default _.extend({}, baseConfig, {
  entry: {
      index: entryFile
  },
  output: {
    path: dispath,
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: componentname,
    libraryTarget: 'umd'
  },
  externals: [nodeExternals()]
});