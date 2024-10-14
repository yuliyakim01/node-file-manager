import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export function calculateHash(filePath, currentDir) {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
    const hash = crypto.createHash('sha256');
    const fileStream = fs.createReadStream(fullPath);
    
    fileStream.on('data', (data) => hash.update(data));
    fileStream.on('end', () => {
        console.log(hash.digest('hex'));
    });
};
