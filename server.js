const ParcelProxyServer = require('parcel-proxy-server')

// configure the proxy server
const server = new ParcelProxyServer({
  entryPoint: './public/index.html',
  parcelOptions: {
    // provide parcel options here
    // these are directly passed into the
    // parcel bundler
    //
    // More info on supported options are documented at
    // https://parceljs.org/api
  },
  proxies: {
    '/spotifyUrl': {
      target: 'https://accounts.spotify.com',
      secure: false,
      logLevel: 'debug',
      changeOrigin: true,
      pathRewrite: {
        '^/spotifyUrl': '',
      },
    },
    '/spotifyApiUrl': {
      target: 'https://api.spotify.com/',
      secure: false,
      logLevel: 'debug',
      changeOrigin: true,
      pathRewrite: {
        '^/spotifyApiUrl': '',
      },
    },
  },
})

// the underlying parcel bundler is exposed on the server
// and can be used if needed
server.bundler.on('buildEnd', () => {
  console.log('Build completed!')
})

// start up the server
server.listen(8000, () => {
  console.log('Parcel proxy server has started')
})
