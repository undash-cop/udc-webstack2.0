import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const distDir = join(__dirname, 'dist');

// MIME type mapping
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

const server = createServer((req, res) => {
  let filePath = join(distDir, req.url === '/' ? '/index.html' : req.url);
  
  // Security: prevent directory traversal
  if (!filePath.startsWith(distDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  console.log(`📄 ${req.method} ${req.url} -> ${filePath}`);
  
  if (!existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>404 Not Found</title></head>
        <body>
          <h1>404 Not Found</h1>
          <p>File not found: ${req.url}</p>
          <p>Expected: ${filePath}</p>
        </body>
      </html>
    `);
    return;
  }
  
  try {
    const content = readFileSync(filePath);
    const mimeType = getMimeType(filePath);
    
    console.log(`✅ Serving: ${filePath} (${mimeType})`);
    
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=3600'
    });
    res.end(content);
  } catch (error) {
    console.error(`❌ Error serving ${filePath}:`, error.message);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Test server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${distDir}`);
  console.log(`\n🔍 Test your JavaScript files:`);
  console.log(`   Main JS: http://localhost:${PORT}/assets/index-DxaIBgRe.js`);
  console.log(`   React Core: http://localhost:${PORT}/assets/vendor-react-core-z6bBGXuk.js`);
  console.log(`   React DOM: http://localhost:${PORT}/assets/vendor-react-dom-Cje5LsMr.js`);
  console.log(`\n📱 Open in browser: http://localhost:${PORT}`);
  console.log(`\n🛑 Press Ctrl+C to stop`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});
