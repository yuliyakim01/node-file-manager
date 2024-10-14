import fs from 'fs';
import path from 'path';

export function changeDirectory(newDir, currentDir) {
    try {
        const fullPath = path.isAbsolute(newDir) ? newDir : path.join(currentDir, newDir);
        process.chdir(fullPath);
        currentDir = process.cwd();
        console.log(`You are currently in ${currentDir}`);
        return currentDir;
    } catch (err) {
        console.log('Operation failed');
    }
}

export function goUp(currentDir) {
    const parentDir = path.dirname(currentDir);
    if (parentDir !== currentDir) {
        currentDir = parentDir;
        process.chdir(currentDir);
        console.log(`You are currently in ${currentDir}`);
    }
    return currentDir;
}

export function listFiles(currentDir) {
    fs.readdir(currentDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log('Operation failed');
            return;
        }
        const directories = files.filter(f => f.isDirectory()).map(f => f.name);
        const regularFiles = files.filter(f => f.isFile()).map(f => f.name);
        const sortedFiles = [...directories.sort(), ...regularFiles.sort()];
        sortedFiles.forEach(file => {
            const type = fs.statSync(path.join(currentDir, file)).isDirectory() ? 'Directory' : 'File';
            console.log(`${file}\t${type}`);
        });
    });
}
