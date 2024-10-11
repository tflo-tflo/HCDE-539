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
            const ext = path.extname(file).toLowerCase(); // Use toLowerCase for case-insensitivity

            if (ext === '.HEIC' || ext === '.png') { // Check for HEIC and PNG
                const outputFileName = path.basename(file, ext) + '.webp'; // Remove extension and add .webp
                const outputFilePath = path.join(destDir, outputFileName); // Save in destination directory
                await convertHEICtoWebP(inputFilePath, outputFilePath);
                
                // Compress the newly created WebP and save to the assets folder
                await compressImages(outputFilePath, outputFilePath); // Compress the newly created WebP
            } else if (ext === '.webp') { // Check for WEBP
                const compressedFilePath = path.join(destDir, file); // Output same file name in assets
                await compressImages(inputFilePath, compressedFilePath); // Compress existing WEBP files
            }
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};

// Automatically call the function when the module is imported
processFiles();