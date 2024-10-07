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

// Function to convert HEIC to JPG
function convertHEICtoJPG(inputPath, outputPath) {
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
            .resize({ width: 800 }) // Resize to a width of 800px (adjust as needed)
            .toFormat('jpeg', { quality: 80 }) // Convert to JPG with 80% quality
            .toFile(outputFilePath);

        console.log(`Compressed ${filePath} to ${outputFilePath}`);
    } catch (error) {
        console.error('Error compressing image:', error);
    }
};

// Function to process all HEIC files and compress JPGs
const processFiles = async () => {
    try {
        const files = fs.readdirSync(sourceDir);

        for (const file of files) {
            const inputFilePath = path.join(sourceDir, file);
            const ext = path.extname(file).toUpperCase(); // Use toUpperCase for case-insensitivity

            if (ext === '.HEIC') { // Check for HEIC extension
                const outputFileName = path.basename(file, ext) + '.jpg'; // Remove .HEIC and add .jpg
                const outputFilePath = path.join(sourceDir, outputFileName); // Save in source-assets
                await convertHEICtoJPG(inputFilePath, outputFilePath);
                
                // Compress the converted JPG and save to the assets folder
                const compressedFilePath = path.join(destDir, outputFileName);
                await compressImages(outputFilePath, compressedFilePath); // Compress the newly created JPG
            } else if (['.jpg', '.jpeg'].includes(ext)) {
                const compressedFilePath = path.join(destDir, file); // Output same file name in assets
                await compressImages(inputFilePath, compressedFilePath); // Compress existing JPGs
            }
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};

// Automatically call the function when the module is imported
processFiles();
