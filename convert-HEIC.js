const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const im = require('imagemagick');
const os = require('os');

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
            const ext = path.extname(file).toLowerCase();

            console.log(`Processing file: ${file}`);

            if (ext === '.heic' || ext === '.png') {
                console.log(`Converting and compressing: ${file}`);
                
                // Use path.parse to get the name without extension
                const { name } = path.parse(file);
                const outputFileName = `${name}.webp`;
                const tempFilePath = path.join(os.tmpdir(), `temp_${outputFileName}`);
                const finalOutputPath = path.join(destDir, outputFileName);

                await convertHEICtoWebP(inputFilePath, tempFilePath);
                await compressImages(tempFilePath, finalOutputPath);
                fs.unlinkSync(tempFilePath);
                
            } else if (ext === '.webp') {
                console.log(`Compressing existing WebP: ${file}`);
                const compressedFilePath = path.join(destDir, file);
                await compressImages(inputFilePath, compressedFilePath);
            } else {
                console.log(`Skipping file with unsupported extension: ${file}`);
            }
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};

// Automatically call the function when the module is imported
processFiles();