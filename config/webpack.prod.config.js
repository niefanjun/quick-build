const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoHtml = require('../lib/autoHtml.js');
const { entriesList, HtmlWebpackPluginList } = autoHtml('./src/view/','./template',true);
const webpack = require('webpack');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
		runtimeChunk: true,
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			minChunks: 2,
			cacheGroups: {
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
		new CleanWebpackPlugin(),
		...HtmlWebpackPluginList,
		new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
		new webpack.NamedChunksPlugin(
		      chunk => {
		        return chunk.name || Array.from(chunk.modulesIterable, m => m.id).join("_")
		      }
		    ),
	    new webpack.HashedModuleIdsPlugin(),
	]
}


const prod = merge(common, config);

module.exports = prod