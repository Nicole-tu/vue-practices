const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
  chainWebpack: config => {
    plugins: [
      new GoogleFontsPlugin({
        fonts: [{
            family: "Source Sans Pro"
          },
          {
            family: "Solway"
          },
          {
            family: "Dancing Script"
          },
          {
            family: "Indie Flower"
          },
          {
            family: "Amatic SC"
          },
          {
            family: "Mansalva"
          },
          {
            family: "Caveat"
          },
          {
            family: "Courgette"
          },
          {
            family: "Kalam"
          },
          {
            family: "Great Vibes"
          },
          {
            family: "Sacramento"
          },
          {
            family: "Gloria Hallelujah"
          },
          {
            family: "Patrick Hand"
          },
          {
            family: "Handlee"
          },
          {
            family: "Marck Script"
          },
          {
            family: "Parisienne"
          },
          {
            family: "Nothing You Could Do"
          },
          {
            family: "Nanum Pen Script"
          }
        ]
      })
    ];
  },
  css: {
    loaderOptions: {
      scss: {
        data: `
            @import "@assets/css/basic.css";
          `
      }
    }
  },
  filenameHashing: false,
};