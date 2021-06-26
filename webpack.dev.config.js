const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const config = {
    entry: {
        'babel-polyfill': 'babel-polyfill',
        'index': './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './build'),
        publicPath: ''
    },
    target: 'node',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['transform-class-properties']
                    }
                }
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                path.join(process.cwd(), 'build/**/*')
            ]
        })
    ],
    node: {
        __dirname: true
    }
}

if (process.env.NODE_ENV !== 'production') {
    config.plugins.push(new WebpackShellPlugin({ onBuildEnd: ['nodemon build/index.bundle.js --watch build'] }));
}

module.exports = config;