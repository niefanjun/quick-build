const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/**
 * npm install @types/webpack
 * @type {import('webpack').Configuration}
 */
const config = {
    mode: 'development',
    entry: {
        "framework": ['react','react-dom']
    },
    output: {
        filename: '_dll_[name].[hash].js',
        path: path.resolve(__dirname, '../dll'),
        library: '__dll_[name]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '__dll_[name]',
            path: path.resolve(__dirname,'../dll','manifest.json')
        }),
    ]
}

module.exports = config;