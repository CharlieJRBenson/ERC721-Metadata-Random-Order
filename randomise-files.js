const fs = require('fs');
const path = require('path');

// Change these constants to match your directories and filetype
const metadataDirectory = 'metadata';
const imagesDirectory = 'images';
const filetype = 'png';

// Create the new directories for the reordered files
if (!fs.existsSync('metadata-ro')) {
    fs.mkdirSync('metadata-ro');
}
if (!fs.existsSync('images-ro')) {
    fs.mkdirSync('images-ro');
}

// Read all the files in the metadata directory
const metadataFiles = fs.readdirSync(metadataDirectory);

// Randomize the order of the files
metadataFiles.sort(() => Math.random() - 0.5);

// Read all the files in the images directory
const imageFiles = fs.readdirSync(imagesDirectory);

// Sort the image files in the same order as the metadata files
imageFiles.sort((a, b) => {
    const aIndex = metadataFiles.indexOf(a.replace(/.png$/, '.json'));
    const bIndex = metadataFiles.indexOf(b.replace(/.png$/, '.json'));
    return aIndex - bIndex;
});

// Write the reordered metadata files to the new directory
metadataFiles.forEach((file, index) => {
    const oldPath = path.join(metadataDirectory, file);
    const newPath = path.join('metadata-ro', `${index + 1}.json`);
    fs.copyFileSync(oldPath, newPath);
});

// Write the reordered image files to the new directory
imageFiles.forEach((file, index) => {
    const oldPath = path.join(imagesDirectory, file);
    const newPath = path.join('images-ro', `${index + 1}.${filetype}`);
    fs.copyFileSync(oldPath, newPath);
});
