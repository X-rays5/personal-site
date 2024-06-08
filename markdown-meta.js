import fs from 'fs';
import path from 'path';

/**
 * @param dir {string}
 * @param fileList {Array<string>}
 * @returns {Array<string>}
 */
function getAllFilesSync(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getAllFilesSync(filePath, fileList);
        } else if (file.endsWith('.md')) {
            fileList.push(file);
        }
    });

    return fileList;
}

export function generateMDMeta() {
    const files = getAllFilesSync('./static/md');

    fs.writeFileSync(path.join(__dirname, 'static/md/meta.json'), JSON.stringify(files, null, 2));
}