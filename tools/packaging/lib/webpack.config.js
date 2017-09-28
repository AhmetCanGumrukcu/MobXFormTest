import _ from 'lodash-compat';
import baseConfig, { options } from '../webpack/base.config';

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
        filename: '[name].js',
        library: componentname,
        libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()]
});
