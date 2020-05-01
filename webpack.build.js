/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    watch: false,
    // devtool: 'cheap-source-map',
    entry: ['./src/js/L.PM.js'],
    mode: 'production',
    output: {
        filename: 'leaflet-geoman.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/@turf/*')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader',],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'leaflet-geoman.css' }),
        // new ExtractTextPlugin('leaflet.pm.css'),   DEPRECATED
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         ie8: true,
        //         warnings: false, // Suppress uglification warnings
        //         output: {
        //             comments: false,
        //         },
        //     },
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
};
