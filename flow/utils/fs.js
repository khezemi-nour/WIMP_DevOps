const fs = require('fs');

// Folder name to create
const folder = 'data';

// Check if a file or folder exists at the given path
exports.exists = (filePath) => {
  return fs.existsSync(filePath);
};

// Create a folder if it doesn't exist
exports.createFolder = () => {
  if (!fs.existsSync(folder)) {
    fs.mkdir(folder);
    console.log(`Folder '${folder}' has been created successfully!`);
  } else {
    console.error(`Folder '${folder}' already exists.`);
  }
};

// Create a JSON file with the provided data
exports.createJsonFile = (data, filePath) => {
  const jsonString = JSON.stringify(data, null, 2);

  fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('JSON file has been created successfully!');
    }
  });
};
