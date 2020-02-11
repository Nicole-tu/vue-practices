module.exports = {
	devServer: {
		open: true,
		host: "0.0.0.0",
		port: 8001, //本機port設定
		https: false,
		hotOnly: false,
		proxy: null,
		before: app => {}
	},
	configureWebpack: {
		devtool: 'source-map'
	},
	css: {
		loaderOptions: {
			// sass: {
			//   data: `
			//               @import "@/style/main.scss";
			//           `
			// }
		}
	}
};
