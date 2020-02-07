const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "development",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "API_URL": JSON.stringify("http://localhost:3000/api")
            }
        }),        
    ]
});