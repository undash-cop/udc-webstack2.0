// Test script for the Cloudflare Worker
// Run this to test the worker locally before deployment

const testWorker = async () => {
  const baseUrl = 'http://localhost:8787';
  
  console.log('🧪 Testing Cloudflare Worker...\n');

  // Test 1: Health check
  console.log('1. Testing health check...');
  try {
    const healthResponse = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }

  // Test 2: JSON application (no file upload)
  console.log('\n2. Testing JSON application...');
  try {
    const jsonData = {
      job_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      experience: '5 years',
      cover_letter: 'Test cover letter'
    };

    const jsonResponse = await fetch(`${baseUrl}/api/applications/json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData)
    });

    const jsonResult = await jsonResponse.json();
    console.log('✅ JSON application:', jsonResult);
  } catch (error) {
    console.log('❌ JSON application failed:', error.message);
  }

  // Test 3: File upload application
  console.log('\n3. Testing file upload application...');
  try {
    // Create a test file
    const testFile = new File(['Test resume content'], 'test-resume.pdf', {
      type: 'application/pdf'
    });

    const formData = new FormData();
    formData.append('job_id', '1');
    formData.append('first_name', 'Jane');
    formData.append('last_name', 'Smith');
    formData.append('email', 'jane.smith@example.com');
    formData.append('phone', '+1234567890');
    formData.append('experience', '3 years');
    formData.append('cover_letter', 'Test cover letter for file upload');
    formData.append('resume', testFile);

    const fileResponse = await fetch(`${baseUrl}/api/applications`, {
      method: 'POST',
      body: formData
    });

    const fileResult = await fileResponse.json();
    console.log('✅ File upload application:', fileResult);
  } catch (error) {
    console.log('❌ File upload application failed:', error.message);
  }

  console.log('\n🎉 Testing complete!');
};

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testWorker().catch(console.error);
}

export { testWorker };
