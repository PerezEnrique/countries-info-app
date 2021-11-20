const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
	mode: "development",
	devServer: {
		compress: true,
		historyApiFallback: true,
	},
	devtool: "eval-source-map",
});
