const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const im = require('imagemagick');

// Source and destination directories
const sourceDir = path.join(__dirname, 'source-assets');
const destDir = path.join(__dirname, 'assets');

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

// Function to convert HEIC to WebP
function convertHEICtoWebP(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        im.convert([inputPath, outputPath], function(err) {
            if (err) {
                reject(`Error during conversion of ${inputPath}: ${err}`);
            } else {
                console.log(`Converted: ${inputPath} to ${outputPath}`);
                resolve(outputPath);
            }
        });
    });
}

// Function to compress images
const compressImages = async (filePath, outputFilePath) => {
    try {
        await sharp(filePath)
            .resize({ width: 1200 }) // Resize to a width of 1200px (adjust as needed)
            .toFormat('webp', { quality: 80 }) // Convert to WebP with 80% quality
            .toFile(outputFilePath);

        console.log(`Compressed ${filePath} to ${outputFilePath}`);
    } catch (error) {
        console.error('Error compressing image:', error);
    }
};

// Function to process all HEIC files and compress WebP images
const processFiles = async () => {
    try {
        const files = fs.readdirSync(sourceDir);

        for (const file of files) {
            const inputFilePath = path.join(sourceDir, file);
            const ext = path.extname(file).toUpperCase(); // Use toUpperCase for case-insensitivity

            if (ext === '.HEIC') { // Check for HEIC extension
                const outputFileName = path.basename(file, ext) + '.webp'; // Remove .HEIC and add .webp
                const outputFilePath = path.join(sourceDir, outputFileName); // Save in source-assets
                await convertHEICtoWebP(inputFilePath, outputFilePath);
                
                // Compress the converted WebP and save to the assets folder
                const compressedFilePath = path.join(destDir, outputFileName);
                await compressImages(outputFilePath, compressedFilePath); // Compress the newly created WebP
            } else if (['.webp'].includes(ext)) {
                const compressedFilePath = path.join(destDir, file); // Output same file name in assets
                await compressImages(inputFilePath, compressedFilePath); // Compress existing WebP files
            }
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};

// Automatically call the function when the module is imported
processFiles();