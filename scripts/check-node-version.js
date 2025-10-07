import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json to get required Node version
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const requiredNodeVersion = packageJson.engines?.node?.replace('>=', '') || '22.0.0';
const currentNodeVersion = process.version.replace('v', '');

// Simple version comparison
function compareVersions(current, required) {
  const currentParts = current.split('.').map(Number);
  const requiredParts = required.split('.').map(Number);
  
  for (let i = 0; i < Math.max(currentParts.length, requiredParts.length); i++) {
    const currentPart = currentParts[i] || 0;
    const requiredPart = requiredParts[i] || 0;
    
    if (currentPart > requiredPart) return 1;
    if (currentPart < requiredPart) return -1;
  }
  
  return 0;
}

const versionCheck = compareVersions(currentNodeVersion, requiredNodeVersion);

if (versionCheck < 0) {
  console.error(`❌ Node.js version mismatch!`);
  console.error(`   Required: >=${requiredNodeVersion}`);
  console.error(`   Current:  ${currentNodeVersion}`);
  console.error(`   Please upgrade to Node.js ${requiredNodeVersion} or higher.`);
  console.error(`   You can use: nvm use 22`);
  process.exit(1);
} else {
  console.log(`✅ Node.js version check passed!`);
  console.log(`   Required: >=${requiredNodeVersion}`);
  console.log(`   Current:  ${currentNodeVersion}`);
}
