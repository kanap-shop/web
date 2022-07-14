const path = require("path");
const glob = require("glob");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: {
        index: ["./src/css/style.css", "./src/js/home.js"],
        product: ["./src/css/product.css"],
        cart: ["./src/css/cart.css"],
        confirmation: ["./src/css/confirmation.css"]
    },
    mode: "development",
    devtool: "source-map",
    optimization: {
        usedExports: true
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === "production"
                        ? MiniCssExtractPlugin.loader
                        : "style-loader",
                    "css-loader"
                ]
            }]
    },
    resolve: {
        extensions: [".js"]
    },
    plugins: [
        new ESLintPlugin({
            extensions: ["js", "html"]
        }),
        new StylelintPlugin({
            extensions: "css"
        }),
        new CleanWebpackPlugin(),
        ...glob.sync("./public/*.html").map(x => {
            const name = x.replace(/^.*[\\\/]/, "");
            return new HtmlWebpackPlugin({
                template: `./public/${name}`,
                filename: `${name}`,
                chunks: [`${name.replace(".html", "")}`]
            });
        }),
        new CopyPlugin({
            patterns: [{ from: "./public", filter: x => !x.endsWith("html") }]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css"
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false
                    },
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true,
            })
        ]
    }
};