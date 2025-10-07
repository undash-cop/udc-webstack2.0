import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image optimization script
async function optimizeImages() {
  const publicDir = path.join(__dirname, 'public');
  const logosDir = path.join(publicDir, 'logos');
  
  // Large images that need optimization
  const imagesToOptimize = [
    {
      input: path.join(logosDir, 'fotralife.png'),
      output: path.join(logosDir, 'fotralife-optimized.webp'),
      width: 800,
      quality: 80
    },
    {
      input: path.join(logosDir, 'yrb-services.png'),
      output: path.join(logosDir, 'yrb-services-optimized.webp'),
      width: 800,
      quality: 80
    },
    {
      input: path.join(logosDir, 'eup-dashboard.svg'),
      output: path.join(logosDir, 'eup-dashboard-optimized.svg'),
      width: 800,
      quality: 80
    },
    {
      input: path.join(publicDir, 'logo.png'),
      output: path.join(publicDir, 'logo-optimized.webp'),
      width: 400,
      quality: 85
    }
  ];

  console.log('Starting image optimization...');

  for (const image of imagesToOptimize) {
    try {
      if (fs.existsSync(image.input)) {
        const stats = fs.statSync(image.input);
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`Optimizing ${path.basename(image.input)} (${fileSizeInMB}MB)...`);

        if (image.input.endsWith('.svg')) {
          // For SVG, just copy and minify
          const svgContent = fs.readFileSync(image.input, 'utf8');
          const minifiedSvg = svgContent
            .replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();
          fs.writeFileSync(image.output, minifiedSvg);
        } else {
          // For PNG/JPG, convert to WebP
          await sharp(image.input)
            .resize(image.width, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .webp({ quality: image.quality })
            .toFile(image.output);
        }

        const newStats = fs.statSync(image.output);
        const newFileSizeInMB = (newStats.size / (1024 * 1024)).toFixed(2);
        const savings = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);
        
        console.log(`✓ Optimized ${path.basename(image.input)}: ${fileSizeInMB}MB → ${newFileSizeInMB}MB (${savings}% savings)`);
      } else {
        console.log(`⚠ File not found: ${image.input}`);
      }
    } catch (error) {
      console.error(`✗ Error optimizing ${image.input}:`, error.message);
    }
  }

  console.log('Image optimization complete!');
}

// Run optimization
optimizeImages().catch(console.error);
