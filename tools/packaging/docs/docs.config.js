import _ from 'lodash-compat';
import webpack from 'webpack';
import baseConfig, { options, jsLoader } from '../webpack/base.config';

const entryFile = `${options.componententry}`;
const dispath = `${options.distpath}`;

export default _.extend({}, baseConfig, {
  entry: {
    app: entryFile
  },
  output: {
    filename: '[name].js',
    path: dispath
  },
  module: {
      loaders: [
          { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel?cacheDirectory' },
          {
              test: /\.css$/,
              exclude: /node_modules/,
              loader: "style-loader!css-loader"
          },
          { test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/, exclude: /node_modules/, loader: 'url-loader' }
      ]
  }
});
