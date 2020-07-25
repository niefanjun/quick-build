const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoHtml = require('../lib/autoHtml.js');
const { entriesList, HtmlWebpackPluginList } = autoHtml('./src/view/','./template',true);

/**
 * npm install @types/webpack
 * @type {import('webpack').Configuration}
 */
const config = {
	mode: 'production',
	entry: entriesList,
	output: {
		filename: 'js/[name].[chunkhash:8].bundle.js',
	},
	optimization: {
		minimizer: [
			new TerserPlugin(),
		],
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			cacheGroups: {
				framework: {
					test: 'framework',
					name: 'framework',
					enforce: true,
				},
				vendors: {
					priority: -10,
					test: /node_modules/,
					name: 'vendor',
					enforce: true
				}
			}
		}
	},
	plugins: [
		...HtmlWebpackPluginList,
		new CleanWebpackPlugin(),
	]
}


const prod = merge(common, config);

module.exports = prod