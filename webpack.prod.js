
const HtmlWebPackPlugin   = require('html-webpack-plugin');
const MiniCss             = require('mini-css-extract-plugin');
const Optimize            = require('optimize-css-assets-webpack-plugin');
const CopyPlugin          = require('copy-webpack-plugin');
const MinifyPlugin        = require("babel-minify-webpack-plugin");
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');

module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [ new Optimize()]
    },
    output: {
        filename: 'main.[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCss.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCss({
            filename: '[name].[contentHash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/'}
            ]
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),

    ]

}