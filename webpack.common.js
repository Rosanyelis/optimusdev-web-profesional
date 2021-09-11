const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SRC_DIR = __dirname + '/src';
const DIST_DIR = __dirname + '/dist';

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        bundle: SRC_DIR + '/index.js',
        scripts: SRC_DIR + '/scripts.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            
            {
                test: /\.(png|jpg)$/,
                loader:'file-loader',
                options:{
                    name:'[path][name].[ext]'
                }
            },
            {
            
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/react',
                        '@babel/preset-env'
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-object-rest-spread"
                    ]
                }
            }
        },
        {
            test: /\.(scss|sass|css)$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        url: false
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins() {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        url: false
                    }
                },
                {
                    loader: "webpack-import-glob-loader",
                    options: {
                        url: false
                    }
                },

            ]
        },
        {
            test: /\.(html)$/,
            exclude: /node_modules/,
            use: {
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }
        },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'opttimusdev.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: "hola.css"
        }),
        new FriendlyErrorsWebpackPlugin(),
    ],
    stats: {
        assetsSort: "chunks",
        builtAt: true,
        children: false,
        chunkGroups: true,
        chunkOrigins: true,
        colors: false,
        errors: true,
        errorDetails: true,
        env: true,
        modules: false,
        performance: true,
        providedExports: false,
        source: false,
        warnings: true
    }
};