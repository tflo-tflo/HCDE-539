const fs = require('fs');
const path = require('path');
const im = require('imagemagick');

// Source and destination directories
const sourceDir = 'source-assets';
const destDir = 'assets';

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

// Function to convert HEIC to JPG
function convertHEICtoJPG(inputPath, outputPath) {
  im.convert([inputPath, outputPath], function(err, stdout, stderr) {
    if (err) {
      console.error('Error during conversion:', err);
      return;
    }
    console.log(`Converted: ${inputPath} to ${outputPath}`);
  });
}

// Read files from the source directory
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error reading source directory:', err);
    return;
  }

  // Filter for HEIC files and process each one
  files.filter(file => path.extname(file).toLowerCase() === '.heic').forEach(file => {
    const inputFilePath = path.join(sourceDir, file);
    const outputFileName = path.basename(file, path.extname(file)) + '.jpg'; // Remove .HEIC (case insensitive)
    const outputFilePath = path.join(destDir, outputFileName);

    convertHEICtoJPG(inputFilePath, outputFilePath);
  });
});