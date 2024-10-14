import fs from 'fs';
import path from 'path';

export function addFile(fileName, currentDir) {
    const filePath = path.join(currentDir, fileName);
    fs.writeFile(filePath, '', (err) => {
        if (err) {
            console.log('Operation failed');
        } else {
            console.log(`File ${fileName} created successfully.`);
        }
    });
}

export function deleteFile(filePath, currentDir) {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.log('Operation failed');
        } else {
            console.log('File deleted');
        }
    });
}

export function readFile(filePath, currentDir) {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
    const readStream = fs.createReadStream(fullPath, 'utf8');
    readStream.on('data', (chunk) => {
        console.log(chunk);
    }).on('error', () => {
        console.log('Operation failed');
    });
}

export function renameFile(oldPath, newName, currentDir) {
    const oldFilePath = path.isAbsolute(oldPath) ? oldPath : path.join(currentDir, oldPath);
    const newFilePath = path.join(currentDir, newName);
    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            console.log('Operation failed');
        } else {
            console.log('File renamed');
        }
    });
}

export function copyFile(src, destDir, currentDir) {
    const srcPath = path.isAbsolute(src) ? src : path.join(currentDir, src);
    const destPath = path.isAbsolute(destDir) ? destDir : path.join(currentDir, destDir, path.basename(src));
    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.pipe(writeStream).on('error', () => {
        console.log('Operation failed');
    }).on('finish', () => {
        console.log('File copied');
    });
}

export function moveFile(src, destDir, currentDir) {
    const srcPath = path.isAbsolute(src) ? src : path.join(currentDir, src);
    const destPath = path.isAbsolute(destDir) ? destDir : path.join(currentDir, destDir, path.basename(src));
    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.pipe(writeStream);
    writeStream.on('finish', () => {
        fs.unlink(srcPath, (err) => {
            if (err) {
                console.log('Operation failed during file deletion');
            } else {
                console.log('File moved successfully');
            }
        });
    }).on('error', (err) => {
        console.log('Operation failed during file writing');
    });
};
