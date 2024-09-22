 // SET SPRING PROXY PORT 8080 FOR REACT PORT 3000
 
 const { createProxyMiddleware } = require('http-proxy-middleware');

 module.exports = function(app) {
     app.use(
        '/sampledoc',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {
             '^/sampledoc': '',
         },
        })
    );

    app.use(
         '/randomdocs',
         createProxyMiddleware({
             target: 'http://localhost:8080',
             changeOrigin: true,
             pathRewrite: {
                 '^/randomdocs': '',
             },
         })
     );
     
     app.use(
        '/doc',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/doc': '',
            },
            onProxyReq: (proxyReq, req, res) => {
                const { id } = req.query;
                if (id) {
                    proxyReq.path += `?id=${id}`;
                }
            },
        })
    );
    
    // [NOT IN USE] 
    /*app.use(
         '/',
         createProxyMiddleware({
             target: 'http://localhost:8080',
             changeOrigin: true,
         })
    );*/
 };