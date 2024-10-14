import {
    addFile,
    deleteFile,
    readFile,
    renameFile,
    copyFile,
    moveFile
} from './fileOperations.js';

import { changeDirectory, goUp, listFiles } from './navigation.js';
import { compressFile, decompressFile } from './compression.js';
import { calculateHash } from './hash.js';
import {
    printEOL,
    printCPUs,
    printHomeDir,
    printUserName,
    printArchitecture
} from './osInfo.js';

export function handleInput(input, currentDir, username) {
    const [command, ...args] = input.trim().split(' ');

    switch (command) {
        case 'up':
            return goUp(currentDir);
        case 'cd':
            return changeDirectory(args[0], currentDir);
        case 'ls':
            listFiles(currentDir);
            break;
        case 'add':
            addFile(args[0], currentDir);
            break;
        case 'rm':
            deleteFile(args[0], currentDir);
            break;
        case 'cat':
            readFile(args[0], currentDir);
            break;
        case 'rn':
            renameFile(args[0], args[1], currentDir);
            break;
        case 'cp':
            copyFile(args[0], args[1], currentDir);
            break;
        case 'mv':
            moveFile(args[0], args[1], currentDir);
            break;
        case 'hash':
            calculateHash(args[0], currentDir);
            break;
        case 'compress':
            compressFile(args[0], args[1], currentDir);
            break;
        case 'decompress':
            decompressFile(args[0], args[1], currentDir);
            break;
        case 'os':
            switch (args[0]) {
                case '--EOL':
                    printEOL();
                    break;
                case '--cpus':
                    printCPUs();
                    break;
                case '--homedir':
                    printHomeDir();
                    break;
                case '--username':
                    printUserName();
                    break;
                case '--architecture':
                    printArchitecture();
                    break;
                default:
                    console.log('Invalid input');
            }
            break;
        case '.exit':
            console.log(`Thank you for using File Manager, ${username}, goodbye!`);
            process.exit();
        default:
            console.log('Invalid input');
    }
    return currentDir;
};
