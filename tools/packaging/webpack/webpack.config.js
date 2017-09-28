import _ from 'lodash-compat';
import baseConfig, { options } from './base.config';

const entryFile = `${options.componententry}`;
const dispath = `${options.distpath}`;
const componentname = `${options.componentname}`;
const ignoredfiles=`${options.ignoredFiles}`;

var nodeExternals = require('webpack-node-externals');

export default _.extend({}, baseConfig, {
  entry: {
      bundle: entryFile
  },
  output: {
    path: dispath,
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: componentname,
    libraryTarget: 'umd'
  },
  externals: [nodeExternals()]
});
