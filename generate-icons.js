// Script to generate PWA icons from your logo
// Usage: 
//   1. Place your logo file as 'logo.png' or 'logo.svg' in the project root
//   2. Run: node generate-icons.js
// Requires: npm install sharp

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const rootDir = __dirname;

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Find logo file (supports .png, .jpg, .jpeg, .svg)
function findLogoFile() {
  const possibleNames = ['logo.png', 'logo.jpg', 'logo.jpeg', 'logo.svg', 'logo.PNG', 'logo.JPG', 'logo.SVG'];
  for (const name of possibleNames) {
    const filePath = path.join(rootDir, name);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
}

// Generate icon from source logo
async function generateIconFromLogo(size, logoPath) {
  const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);
  
  try {
    // Resize and center the logo on a square canvas
    await sharp(logoPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 32, g: 32, b: 32, alpha: 1 } // Dark background #202020
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Generated ${outputPath}`);
  } catch (error) {
    console.error(`Error generating ${size}x${size} icon:`, error);
    throw error;
  }
}

// Generate favicon
async function generateFavicon(logoPath) {
  const outputPath = path.join(publicDir, 'favicon.png');
  
  try {
    // Generate 32x32 for favicon
    await sharp(logoPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 32, g: 32, b: 32, alpha: 1 }
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Generated favicon`);
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

async function generateIcons() {
  try {
    const logoPath = findLogoFile();
    
    if (!logoPath) {
      console.error('❌ Logo file not found!');
      console.log('\nPlease place your logo file in the project root with one of these names:');
      console.log('  - logo.png');
      console.log('  - logo.jpg');
      console.log('  - logo.svg');
      console.log('\nThen run: node generate-icons.js');
      process.exit(1);
    }
    
    console.log(`📸 Found logo: ${path.basename(logoPath)}`);
    console.log('🔄 Generating icons...\n');
    
    await generateIconFromLogo(192, logoPath);
    await generateIconFromLogo(512, logoPath);
    await generateFavicon(logoPath);
    
    console.log('\n✅ All icons generated successfully!');
    console.log('📱 Icons are ready for PWA installation.');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    console.log('\nNote: If sharp is not installed, run: npm install sharp');
    process.exit(1);
  }
}

generateIcons();
