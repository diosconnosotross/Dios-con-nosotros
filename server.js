const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const routes = new Set(['/', '/windows', '/fivem', '/apps', '/comunidad']);
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  if (pathname === '/api/visitor') {
    response.writeHead(501, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: 'Use Vercel Functions to enable visit logging.' }));
    return;
  }

  const isProductRoute = /^\/recurso\/\d+$/.test(pathname);
  const requestedFile = routes.has(pathname) || isProductRoute
    ? path.join(root, 'index.html')
    : path.resolve(root, `.${decodeURIComponent(pathname)}`);

  if (!requestedFile.startsWith(root + path.sep) && requestedFile !== path.join(root, 'index.html')) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  fs.readFile(requestedFile, (error, content) => {
    if (error) {
      response.writeHead(404).end('Not found');
      return;
    }

    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(requestedFile)] || 'application/octet-stream',
    });
    response.end(content);
  });
}).listen(process.env.PORT || 4173, () => {
  console.log(`Local site available at http://localhost:${process.env.PORT || 4173}`);
});