import fs from 'fs';
import path from 'path';

/**
 * @param dir {string}
 * @param fileList {Array<string>}
 * @returns {Array<string>}
 */
function getAllFilesSync(dir, fileList = []) {
    const files = fs.readdirSync(dir); // Read the contents of the directory

    files.forEach((file) => {
        const filePath = path.join(dir, file); // Create the full path of the file/folder
        const stat = fs.statSync(filePath); // Get the status of the file/folder

        if (stat.isDirectory()) {
            // If it's a directory, recursively call getAllFilesSync
            getAllFilesSync(filePath, fileList);
        } else {
            // If it's a file, push the file path to the fileList
            fileList.push(filePath);
        }
    });

    return fileList; // Return the accumulated file paths
}

export function generateMDMeta() {
    const files = getAllFilesSync('./static/md');

    fs.writeFileSync(path.join(__dirname, 'static/md/meta.json'), JSON.stringify(files, null, 2));
}