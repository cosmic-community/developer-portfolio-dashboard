const fs = require('fs');
const path = require('path');
const glob = require('glob');

function injectConsoleCapture() {
  const buildDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(buildDir)) {
    console.log('No .next directory found. Skipping console capture injection.');
    return;
  }

  const htmlFiles = glob.sync('**/*.html', { cwd: buildDir });
  
  htmlFiles.forEach(file => {
    const filePath = path.join(buildDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Only inject if not already present
    if (!content.includes('dashboard-console-capture.js')) {
      // Inject before closing head tag
      content = content.replace(
        '</head>',
        '  <script src="/dashboard-console-capture.js"></script>\n</head>'
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`Injected console capture into ${file}`);
    }
  });
}

injectConsoleCapture();