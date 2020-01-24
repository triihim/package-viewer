const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlLoaderPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlLoaderPlugin({
            template: "./src/template.html"
        })
    ]


}