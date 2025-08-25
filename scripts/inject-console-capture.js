const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to inject console capture script into HTML files
function injectConsoleCapture() {
  const buildDir = path.join(process.cwd(), '.next');
  const htmlFiles = glob.sync('**/*.html', { cwd: buildDir });
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  htmlFiles.forEach(filePath => {
    const fullPath = path.join(buildDir, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if script is already injected
    if (content.includes('dashboard-console-capture.js')) {
      return;
    }
    
    // Inject script into head
    if (content.includes('<head>')) {
      content = content.replace('<head>', `<head>\n    ${scriptTag}`);
      fs.writeFileSync(fullPath, content);
      console.log(`Injected console capture script into ${filePath}`);
    }
  });
}

// Run injection
try {
  injectConsoleCapture();
  console.log('Console capture script injection completed');
} catch (error) {
  console.error('Error injecting console capture script:', error);
  process.exit(1);
}