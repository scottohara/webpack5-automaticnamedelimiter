module.exports = {
	mode: "development",

	entry: {
		a: "./src/a.js",
		b: "./src/b.js"
	},

	output: {
		clean: true
	},

	optimization: {
		splitChunks: {
			automaticNameDelimiter: "%",
			chunks: "all",
			minSize: 0
		}
	}
};