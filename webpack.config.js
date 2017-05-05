var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({filename: 'main.css'});

module.exports = {
    entry: [
        './src/js/app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'resolve-url-loader', 'sass-loader']
                })
            },{
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader?limit=10000',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img/',
                    publickPath: 'img/'
                }
            }
        ]
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: 'src/login.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};