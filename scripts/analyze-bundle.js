import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Analyze bundle sizes
function analyzeBundle() {
  const distDir = path.join(__dirname, '..', 'dist', 'assets');
  
  if (!fs.existsSync(distDir)) {
    console.log('❌ Dist directory not found. Please run build first.');
    return;
  }

  const files = fs.readdirSync(distDir);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const cssFiles = files.filter(file => file.endsWith('.css'));
  
  console.log('📊 Bundle Analysis');
  console.log('==================');
  
  let totalJsSize = 0;
  let totalCssSize = 0;
  
  console.log('\n📦 JavaScript Files:');
  jsFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalJsSize += stats.size;
    
    const status = stats.size > 100 * 1024 ? '❌' : '✅';
    console.log(`  ${status} ${file}: ${sizeKB} KB`);
  });
  
  console.log('\n🎨 CSS Files:');
  cssFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalCssSize += stats.size;
    
    const status = stats.size > 50 * 1024 ? '❌' : '✅';
    console.log(`  ${status} ${file}: ${sizeKB} KB`);
  });
  
  const totalSize = totalJsSize + totalCssSize;
  const totalSizeKB = (totalSize / 1024).toFixed(2);
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  
  console.log('\n📈 Summary:');
  console.log(`  Total JS Size: ${(totalJsSize / 1024).toFixed(2)} KB`);
  console.log(`  Total CSS Size: ${(totalCssSize / 1024).toFixed(2)} KB`);
  console.log(`  Total Bundle Size: ${totalSizeKB} KB (${totalSizeMB} MB)`);
  
  // Check if any file exceeds 100KB
  const oversizedFiles = [];
  jsFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);
    if (stats.size > 100 * 1024) {
      oversizedFiles.push({ file, size: (stats.size / 1024).toFixed(2) });
    }
  });
  
  if (oversizedFiles.length > 0) {
    console.log('\n⚠️  Files exceeding 100KB:');
    oversizedFiles.forEach(({ file, size }) => {
      console.log(`  ❌ ${file}: ${size} KB`);
    });
  } else {
    console.log('\n✅ All files are under 100KB!');
  }
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  if (totalSize > 200 * 1024) {
    console.log('  - Consider further code splitting');
    console.log('  - Remove unused dependencies');
    console.log('  - Use dynamic imports for heavy components');
  }
  if (totalJsSize > 150 * 1024) {
    console.log('  - Optimize JavaScript bundle');
    console.log('  - Use tree shaking more aggressively');
  }
  if (totalCssSize > 50 * 1024) {
    console.log('  - Optimize CSS bundle');
    console.log('  - Remove unused CSS');
  }
}

analyzeBundle();
