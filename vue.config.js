// const path = require('path')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  // publicPath: '/uzaleo_shopfront/',
  devServer: {
    disableHostCheck: true
  },
  // configureWebpack: {
  //   plugins: [
  //     new PrerenderSPAPlugin({
  //       staticDir: path.join(__dirname, 'dist'),
  //       // Required - Routes to render.
  //       routes: ['/', '/about', '/some/deep/nested/route']
  //     })
  //   ]
  // },

  pwa: {
    name: 'Uzaleo Shopfront',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },
}
