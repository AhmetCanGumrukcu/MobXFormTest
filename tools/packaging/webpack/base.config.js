import webpack from 'webpack';
import yargs from 'yargs';

export const options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .option('componententry', {
    default: '',
    type: 'string'
  })
  .option('cssentry', {
    default: '',
    type: 'string'
  })
  .option('ignoredFiles', {
     default: '',
     type: 'any'
   })
  .option('distpath', {
    default: '',
    type: 'string'
  })
  .option('componentname', {
    default: '',
    type: 'string'
  })
  .option('ignorepattern', {
    default: '',
    type: 'string'
  })
  .argv;

export const jsLoader = 'babel?cacheDirectory';

const baseConfig = {
  entry: undefined,
  output: undefined,
  externals: undefined,
  module: {
      loaders: [
                { 
                    test: /\.(js|jsx)$/, 
                    loader: jsLoader, 
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    loaders: [
                      'style-loader',
                      'css-loader',
                      'postcss-loader',
                      'sass-loader'
                    ]
                },
                { 
                  test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/, 
                  exclude: /node_modules/, 
                  loader: 'url-loader' 
                }
            ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV':  JSON.stringify('production')  //JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ]
};

if (options.optimizeMinimize) {
  baseConfig.devtool = 'source-map';
}

export default baseConfig;