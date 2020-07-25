const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const webpack = require('webpack');
const autoHtml = require('../lib/autoHtml.js');

const { entriesList, HtmlWebpackPluginList } = autoHtml('./src/view/','./template');
/**
 * npm install @types/webpack
 * @type {import('webpack').Configuration}
 */
const config = {
	mode: 'development',
	entry: entriesList,
	output: {
		filename: 'js/[name].[hash:8].bundle.js',
	},
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		...HtmlWebpackPluginList,
		new webpack.HotModuleReplacementPlugin(),
	]
}
const dev =  merge(common, config);

module.exports = dev