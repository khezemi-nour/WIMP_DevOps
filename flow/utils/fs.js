const fs = require("fs/promises"); // Using fs promises API
const path = require("path");
// Folder name to create
const folder = "data";
const folderpath = path.join(__dirname, folder);

// Check if a file or folder exists at the given path
exports.exists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true; // File exists
  } catch (error) {
    return false; // File doesn't exist
  }
};

exports.createFolder = async () => {
  try {
    await fs.mkdir(folder, { recursive: true });
    console.log("Folder created successfully");
  } catch (err) {
    console.error("Error creating folder:", err);
    throw err; // Rethrow the error to be caught in the caller function if needed
  }
};

// Create a JSON file with the provided data
exports.createJsonFile = async (data, filename) => {
  const jsonObject = JSON.parse(data); // Convert JSON string to JavaScript object
  const jsonString = JSON.stringify(jsonObject, null, 2); // Convert JavaScript object to JSON string with indentation
  const filepath = path.join(folder, filename);

  try {
    await fs.writeFile(filepath, jsonString, "utf-8");
    console.log("JSON file has been created successfully!");
    return filename;
  } catch (err) {
    console.error("Error writing JSON file:", err);
    throw err; // Rethrow the error to be caught in the caller function if needed
  }
};
