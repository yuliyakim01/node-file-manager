import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

export function compressFile(filePath, destPath, currentDir) {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
    const fullDestPath = path.isAbsolute(destPath) ? destPath : path.join(currentDir, destPath);
    const input = fs.createReadStream(fullPath);
    const output = fs.createWriteStream(fullDestPath);
    const brotli = zlib.createBrotliCompress();

    input.pipe(brotli).pipe(output)
        .on('finish', () => console.log('File compressed successfully'))
        .on('error', (err) => console.log('Operation failed during compression', err));
}

export function decompressFile(filePath, destPath, currentDir) {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
    const fullDestPath = path.isAbsolute(destPath) ? destPath : path.join(currentDir, destPath);
    const input = fs.createReadStream(fullPath);
    const output = fs.createWriteStream(fullDestPath);
    const brotli = zlib.createBrotliDecompress();

    input.pipe(brotli).pipe(output)
        .on('finish', () => console.log('File decompressed successfully'))
        .on('error', (err) => console.log('Operation failed during decompression', err));
};
