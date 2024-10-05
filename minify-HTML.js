const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const minifyOptions = {
    collapseWhitespace: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true
};

const rootDir = './'; // Assuming the script is in the root directory

fs.readdir(rootDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.html') {
            const filePath = path.join(rootDir, file);
            
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file ${file}:`, err);
                    return;
                }

                minify(data, minifyOptions)
                    .then(minifiedHtml => {
                        fs.writeFile(filePath, minifiedHtml, 'utf8', (err) => {
                            if (err) {
                                console.error(`Error writing minified file ${file}:`, err);
                            } else {
                                console.log(`Successfully minified ${file}`);
                            }
                        });
                    })
                    .catch(err => {
                        console.error(`Error minifying ${file}:`, err);
                    });
            });
        }
    });
});