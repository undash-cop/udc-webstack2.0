// Test script to verify the setup
const { validateEnvironment } = require('./src/config/environment');

console.log('🧪 Testing Form Submission System Setup...\n');

// Test 1: Environment validation
console.log('1️⃣ Testing environment validation...');
try {
  validateEnvironment();
  console.log('❌ Environment validation should fail (no env vars set)');
} catch (error) {
  console.log('✅ Environment validation working correctly');
  console.log(`   Expected error: ${error.message}\n`);
}

// Test 2: File upload utilities
console.log('2️⃣ Testing file upload utilities...');
const { validateFileType, validateFileSize } = require('./src/utils/fileUpload');

const validFileType = validateFileType('application/pdf');
const invalidFileType = validateFileType('image/jpeg');
const validFileSize = validateFileSize(1024 * 1024); // 1MB
const invalidFileSize = validateFileSize(10 * 1024 * 1024); // 10MB

console.log(`   PDF validation: ${validFileType ? '✅' : '❌'}`);
console.log(`   JPEG validation: ${!invalidFileType ? '✅' : '❌'}`);
console.log(`   1MB validation: ${validFileSize ? '✅' : '❌'}`);
console.log(`   10MB validation: ${!invalidFileSize ? '✅' : '❌'}\n`);

// Test 3: Email service structure
console.log('3️⃣ Testing email service structure...');
const emailService = require('./src/services/emailService');
console.log(`   sendConfirmationEmail: ${typeof emailService.sendConfirmationEmail === 'function' ? '✅' : '❌'}`);
console.log(`   sendHRNotification: ${typeof emailService.sendHRNotification === 'function' ? '✅' : '❌'}\n`);

// Test 4: Zod validation
console.log('4️⃣ Testing Zod validation...');
const { z } = require('zod');

const testSchema = z.object({
  firstName: z.string().min(2),
  email: z.string().email()
});

try {
  testSchema.parse({ firstName: 'John', email: 'john@example.com' });
  console.log('✅ Valid data validation: PASS');
} catch (error) {
  console.log('❌ Valid data validation: FAIL');
}

try {
  testSchema.parse({ firstName: 'J', email: 'invalid-email' });
  console.log('❌ Invalid data validation: FAIL (should have thrown error)');
} catch (error) {
  console.log('✅ Invalid data validation: PASS (correctly threw error)');
}

console.log('\n🎉 Setup verification complete!');
console.log('\n📋 Next steps:');
console.log('1. Set up environment variables (.env.local)');
console.log('2. Configure Cloudflare R2');
console.log('3. Set up Gmail app password');
console.log('4. Run: npm run dev:full');
console.log('5. Test form submission at http://localhost:5173/careers');
