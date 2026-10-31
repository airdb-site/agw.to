import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

const root = resolve('dist');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml' };
createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = pathname === '/__tests' ? resolve('tests/browser.html') : resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
  if (pathname !== '/__tests' && !file.startsWith(`${root}/`)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }).end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' }).end(await readFile(resolve(root, '404.html')));
  }
}).listen(4323, '127.0.0.1', () => console.log('QA: http://127.0.0.1:4323/__tests'));
