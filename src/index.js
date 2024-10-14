import os from 'os';
import readline from 'readline';
import { handleInput } from './inputHandler.js';

// Parse username from CLI argument
const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';

// Welcome message
console.log(`Welcome to the File Manager, ${username}!`);

// Set initial working directory to user's home directory
let currentDir = os.homedir();
console.log(`You are currently in ${currentDir}`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    currentDir = handleInput(input, currentDir, username);
    console.log(`You are currently in ${currentDir}`);
});

rl.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit();
});
