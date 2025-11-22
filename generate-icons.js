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
// Lime green circle on dark background - clean and minimalist
async function generateIcon(size) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Dark grey background -->
      <rect width="${size}" height="${size}" fill="#202020" rx="${size * 0.2}"/>
      <!-- Vibrant lime green circle -->
      <circle cx="${size/2}" cy="${size/2}" r="${size * 0.38}" fill="#c9f158"/>
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

