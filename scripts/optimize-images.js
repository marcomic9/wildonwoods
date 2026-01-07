import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../public/images/products');

async function optimizeImages() {
    if (!fs.existsSync(inputDir)) {
        console.error(`Directory not found: ${inputDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(inputDir);

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(inputDir, file);
            const name = path.parse(file).name;
            const outputPath = path.join(inputDir, `${name}.webp`);

            console.log(`Optimizing ${file}...`);

            try {
                await sharp(inputPath)
                    .resize({ width: 1920, withoutEnlargement: true }) // Resize to max 1920px width
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                console.log(`Created ${name}.webp`);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
}

optimizeImages();
