import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const DIST = path.join(__dirname, 'ohh-la-la-temp', 'dist');
const BASE = '/Ohh-La-La';

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);

  // Strip the base prefix
  if (urlPath.startsWith(BASE)) {
    urlPath = urlPath.slice(BASE.length) || '/';
  }

  // Resolve file path within dist
  let filePath = path.join(DIST, urlPath === '/' ? 'index.html' : urlPath);
  const ext = path.extname(filePath).toLowerCase();

  function serveFile(fp) {
    fs.readFile(fp, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
        return;
      }
      const contentType = mime[path.extname(fp).toLowerCase()] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }

  fs.access(filePath, fs.constants.F_OK, err => {
    if (!err && ext) {
      // File exists with an extension — serve it directly
      serveFile(filePath);
    } else {
      // No extension or file missing → SPA fallback to index.html
      serveFile(path.join(DIST, 'index.html'));
    }
  });
}).listen(PORT, () => console.log(`Server running at http://localhost:${PORT}${BASE}/`));
