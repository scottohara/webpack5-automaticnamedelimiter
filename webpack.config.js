const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
	mode: "development",

	entry: {
		a: "./src/a.js",
		b: "./src/b.js"
	},

	optimization: {
		splitChunks: {
			automaticNameDelimiter: "%",
			chunks: "all",
			minSize: 0
		}
	},

	plugins: [
		new CleanWebpackPlugin()
	]
};