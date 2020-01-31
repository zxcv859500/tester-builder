const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, "../backend/public/"),
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: "http://localhost:80/api",
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
