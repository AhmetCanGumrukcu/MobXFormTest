import _ from 'lodash-compat';
import baseConfig, { options } from '../webpack/base.config';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const entryFile = `${options.componententry}`;
const entryFileCss = `${options.cssentry}`;
const dispath = `${options.distpath}`;

var compilerConfig = _.extend({}, baseConfig, {
  output: {
    path: dispath,
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: "kuveytturk-components",
    libraryTarget: 'umd'
  },
  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react', 
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ],
  plugins: [
      new ExtractTextPlugin("[name].css")
  ],
  module: {
      loaders: [
          { 
              test: /\.(js|jsx)$/, 
              exclude: /node_modules/, 
              loader: 'babel?cacheDirectory' 
          },
          {
              test: /\.css$/,
              exclude: /node_modules/,
              loader: ExtractTextPlugin.extract("style-loader","css-loader")
          },
          {
              test: /\.less$/,
              exclude: /node_modules/,
              loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")
          },
          { 
              test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/, 
              exclude: /node_modules/, 
              loader: 'url-loader' 
          }
      ]
  }
});

if(entryFileCss != '') {
    compilerConfig['entry'] = { "kuveytturk-components-styles": entryFileCss };
} 
else {
    compilerConfig['entry'] = { "kuveytturk-components": entryFile };
}
export default compilerConfig;
