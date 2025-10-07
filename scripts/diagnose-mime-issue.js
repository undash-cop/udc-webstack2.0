import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diagnose MIME type issues
function diagnoseMimeIssue() {
  console.log('🔍 Diagnosing MIME Type Issues');
  console.log('================================');
  
  const distDir = path.join(__dirname, '..', 'dist');
  const assetsDir = path.join(distDir, 'assets');
  const indexPath = path.join(distDir, 'index.html');
  
  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.log('❌ Dist directory not found. Please run build first.');
    return;
  }
  
  // Check if assets directory exists
  if (!fs.existsSync(assetsDir)) {
    console.log('❌ Assets directory not found.');
    return;
  }
  
  // Read index.html
  const htmlContent = fs.readFileSync(indexPath, 'utf8');
  
  // Extract all script and link references
  const scriptRegex = /<script[^>]+src="([^"]+)"[^>]*>/g;
  const linkRegex = /<link[^>]+href="([^"]+)"[^>]*>/g;
  
  const scripts = [];
  const links = [];
  
  let match;
  while ((match = scriptRegex.exec(htmlContent)) !== null) {
    scripts.push(match[1]);
  }
  
  while ((match = linkRegex.exec(htmlContent)) !== null) {
    links.push(match[1]);
  }
  
  console.log('\n📄 HTML References:');
  console.log('Scripts:', scripts.length);
  console.log('Links:', links.length);
  
  // Check if referenced files exist
  console.log('\n🔍 Checking Referenced Files:');
  
  const allReferences = [...scripts, ...links];
  const missingFiles = [];
  const existingFiles = [];
  
  allReferences.forEach(ref => {
    // Remove leading slash and convert to file path
    const filePath = path.join(distDir, ref.startsWith('/') ? ref.slice(1) : ref);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      existingFiles.push({
        ref,
        size: stats.size,
        path: filePath
      });
    } else {
      missingFiles.push(ref);
    }
  });
  
  console.log(`✅ Existing files: ${existingFiles.length}`);
  console.log(`❌ Missing files: ${missingFiles.length}`);
  
  if (missingFiles.length > 0) {
    console.log('\n❌ Missing Files:');
    missingFiles.forEach(file => console.log(`  - ${file}`));
  }
  
  // Check file extensions and MIME types
  console.log('\n📋 File Analysis:');
  existingFiles.forEach(({ ref, size, path: filePath }) => {
    const ext = path.extname(filePath);
    const mimeType = getMimeType(ext);
    const sizeKB = (size / 1024).toFixed(2);
    
    console.log(`  ${ref}: ${sizeKB}KB (${mimeType})`);
  });
  
  // Check for common issues
  console.log('\n🔧 Common Issues Check:');
  
  // Check if files are actually JavaScript
  const jsFiles = existingFiles.filter(({ path: filePath }) => 
    path.extname(filePath) === '.js'
  );
  
  jsFiles.forEach(({ ref, path: filePath }) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const isJS = content.includes('function') || content.includes('import') || content.includes('export');
    
    if (!isJS) {
      console.log(`⚠️  ${ref} might not be valid JavaScript`);
    }
  });
  
  // Check for HTML content in JS files
  jsFiles.forEach(({ ref, path: filePath }) => {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('<!DOCTYPE html>') || content.includes('<html')) {
      console.log(`❌ ${ref} contains HTML content (likely a 404 page)`);
    }
  });
  
  console.log('\n💡 Recommendations:');
  if (missingFiles.length > 0) {
    console.log('1. Rebuild the project: npm run build:production');
    console.log('2. Check for build errors in the console');
    console.log('3. Verify all imports are correct');
  }
  
  console.log('4. Check server configuration for proper MIME types');
  console.log('5. Ensure all assets are being served correctly');
  console.log('6. Check browser network tab for 404 errors');
}

function getMimeType(ext) {
  const mimeTypes = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf'
  };
  
  return mimeTypes[ext] || 'application/octet-stream';
}

diagnoseMimeIssue();
