const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const shouldAnalyze = process.argv.includes("--analyze");
//Remeber: Since we are using npm and not yarn, in order to pass the additional flag we need npm run build -- --analyze

const plugins = [
	new CopyPlugin({
		patterns: [
			{
				from: path.resolve(__dirname, "public", "_redirects"),
				to: "./",
			},
		],
	})
];

if(shouldAnalyze) {
	plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	},
	plugins
});
