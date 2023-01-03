const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all",
    webSocketServer: false
  },
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
})
