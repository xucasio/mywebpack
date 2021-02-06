const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack');


const config = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new HtmlWebpackPlugin({ // 把打包的文件生成在指定的html中
        filename: 'index.html',
        template: path.resolve(__dirname, './src/public/index.html')
		}),
		new CleanWebpackPlugin(), // 打包缓存清除
		new webpack.HotModuleReplacementPlugin({ // 热更新 似乎不用配置也可以，日了狗了
			// Options...
		})
	],
	module:{
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: "babel-loader",
				options: {
					presets: ['@babel/preset-env']
				}
			}]
		},
		{
			test: /\.css$/,
			exclude: /node_modules/,
			use: ["style-loader","css-loader"]
		},
		{
			test: /\.(jpg|png|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 1024,
					fallback: {
						loader: 'file-loader',
						options: {
							name: 'img/[name].[hash:8].[ext]'
						}
					}
				}
			}]
		},
		{
			test: /\.(mp4|webm|ogg|mp3|wav)(\?.*)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 1024,
					fallback: {
						loader: 'file-loader',
						options: {
							name: 'media/[name].[hash:8].[ext]'
						}
					}
				}
			}]
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 1024,
					fallback: {
						loader: 'file-loader',
						options: {
							name: 'font/[name].[hash:8].[ext]'
						}
					}
				}
			}]
		}
	]
	},
	devServer: {
		port: '3000',
		host: '127.0.0.1',
		hot: true,
		open: true
},
}
module.exports = config