module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: "http://localhost:3000/api",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        devServer: {
            host: '0.0.0.0',
            port: '8080'
        }
    }
}