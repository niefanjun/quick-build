const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

function autoHtml(entryDir,tempDir,ifProd) {
	/**
	 读取页面入口
	**/
	let entriesDir = fs.readdirSync(entryDir);
	let tempList = fs.readdirSync(tempDir);
	let entriesList = {
		framework: ['react','react-dom']
	}
	/**
	 生成插件实例
	**/
	let HtmlWebpackPluginList = [];

	entriesDir.forEach(item => {
		if (ifProd) {
			entriesList[item] = [`./src/view/${item}/index.js`];
		} else {
			entriesList[item] = [
				`./src/view/${item}/index.js`,
				hotMiddlewareScript
			];
		}
		const templateName = tempList.indexOf(`${item}.template.html`) > -1?`${item}.template.html`:'index.template.html';
		HtmlWebpackPluginList.push(
			new HtmlWebpackPlugin({
				filename: `${item}.html`,
				template: `template/${templateName}`,
				inject: 'body',
				chunks: [item,'framework'],
				minify: {
					removeComments: true,
					collapseWhitespace: true
				}
			})
		)
	})
	return {
		entriesList,HtmlWebpackPluginList
	}
}

module.exports = autoHtml;