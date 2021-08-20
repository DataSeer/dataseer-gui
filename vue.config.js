const path = require("path");

module.exports = {
	runtimeCompiler: true,
	configureWebpack: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, './src'),
				"@icon": path.resolve(__dirname, './src/assets/images/icons')
			},
			extensions: ['.js', '.vue', '.json']
		}
	}
};
