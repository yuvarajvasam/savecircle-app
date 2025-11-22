// Simple script to generate PWA icons
// Run with: node generate-icons.js
// Requires: npm install sharp

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a simple icon with SaveCircle branding
// Using the primary color #c9f158 (lime green) on dark background
async function generateIcon(size) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#202020"/>
      <circle cx="${size/2}" cy="${size/2}" r="${size * 0.35}" fill="#c9f158"/>
      <text x="${size/2}" y="${size/2 + size * 0.1}" 
            font-family="Arial, sans-serif" 
            font-size="${size * 0.25}" 
            font-weight="bold"
            fill="#202020" 
            text-anchor="middle">SC</text>
    </svg>
  `;

  const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);
  
  await sharp(Buffer.from(svg))
    .png()
    .resize(size, size)
    .toFile(outputPath);
  
  console.log(`Generated ${outputPath}`);
}

async function generateIcons() {
  try {
    await generateIcon(192);
    await generateIcon(512);
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    console.log('\nNote: If sharp is not installed, run: npm install sharp');
  }
}

generateIcons();

