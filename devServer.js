/* eslint no-console: 0 */
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const opn = require('opn')

let noopn = false
process.argv.forEach(function (val) {
  if (val === 'noopn') {
    noopn = true
  }
})

let config = require('./webpack.config.dev')

const port = process.env.npm_package_config_port || 3000
const host = process.env.npm_package_config_host || 'localhost'

new WebpackDevServer(webpack(config), config.devServer
).listen(port, host, function (err) {
  if (err) {
    console.log(err)
  }
  console.log(`devServer.js listening at http://${host}:${port}.`)
  if (!noopn) {
    opn(`http://${host}:${port}`).then(() => {
    })
  }
})
