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
// Circle on dark background matching onboarding design (like the START button)
async function generateIcon(size) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Dark background -->
      <rect width="${size}" height="${size}" fill="#202020" rx="${size * 0.15}"/>
      <!-- Outer ring (subtle gray, like the track) -->
      <circle cx="${size/2}" cy="${size/2}" r="${size * 0.44}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="${size * 0.03}"/>
      <!-- Main white circle (matching the START button) -->
      <circle cx="${size/2}" cy="${size/2}" r="${size * 0.375}" fill="#ffffff"/>
      <!-- Subtle inner shadow for depth -->
      <circle cx="${size/2}" cy="${size/2}" r="${size * 0.35}" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="${size * 0.01}"/>
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

