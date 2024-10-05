const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Define source and output directories (root folder)
const sourceDir = '.';  // Current directory (root folder)
const outputDir = '.';  // Current directory (root folder)

// Function to convert a Markdown file to HTML
function convertMarkdownToHTML(inputPath, outputPath) {
  fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${inputPath}:`, err);
      return;
    }

    // Convert Markdown to HTML
    const htmlContent = marked(data);
    
    // Add a basic HTML structure with a CSS link
    const completeHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${path.basename(outputPath, '.html')}</title>
          <link rel="stylesheet" href="styles.css"> 
      </head>
      <body>
          ${htmlContent}
      </body>
      </html>
    `;

    // Write the HTML to a new file
    fs.writeFile(outputPath, completeHTML, (err) => {
      if (err) {
        console.error(`Error writing file ${outputPath}:`, err);
        return;
      }
      console.log(`Converted ${inputPath} to ${outputPath}`);
    });
  });
}

// Function to process Markdown files in the source directory
function processMarkdownFiles() {
  // Read files from the source directory
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error('Error reading source directory:', err);
      return;
    }

    // Filter for .md files and convert each one
    files.filter(file => path.extname(file).toLowerCase() === '.md').forEach(file => {
      const inputFilePath = path.join(sourceDir, file);
      const outputFilePath = path.join(outputDir, `${path.basename(file, '.md')}.html`); // Change .md to .html

      convertMarkdownToHTML(inputFilePath, outputFilePath);
    });
  });
}

// Automatically call the function when the module is imported
processMarkdownFiles();
