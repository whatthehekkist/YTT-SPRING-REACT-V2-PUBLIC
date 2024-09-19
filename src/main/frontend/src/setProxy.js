// PRODUCTION: COMMENT OUT
// LOCAL: UNCOMMENT OUT

 const { createProxyMiddleware } = require('http-proxy-middleware');

 module.exports = function(app) {
     // app.use(
     //     '/',
     //     createProxyMiddleware({
     //         target: 'http://localhost:8888',
     //         changeOrigin: true,
     //     })
     // );
     app.use(
        '/sampledoc',
        createProxyMiddleware({
            target: 'http://localhost:8888',
            changeOrigin: true,
            pathRewrite: {
             '^/sampledoc': '',
         },
        })
    );
    app.use(
         '/randomdocs',
         createProxyMiddleware({
             target: 'http://localhost:8888',
             changeOrigin: true,
             pathRewrite: {
                 '^/randomdocs': '',
             },
         })
     );
     app.use(
         '/doc',
         createProxyMiddleware({
             target: 'http://localhost:8888',
             changeOrigin: true,
             pathRewrite: {
                 '^/doc': '',
             },
             onProxyReq: (proxyReq, req, res) => {
                 const { id } = req.query; // id from React
                 if (id) {
                     // 요청 URL에 쿼리 문자열을 추가
                     proxyReq.path += `?id=${id}`;
                 }
             },
         })
     );
     /*
     app.use(
         '/:id',
         createProxyMiddleware({
             target: 'http://localhost:8888',
             changeOrigin: true,
         })
     );*/
 };