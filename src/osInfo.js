import os from 'os';

export function printEOL() {
    console.log(JSON.stringify(os.EOL));
}

export function printCPUs() {
    const cpus = os.cpus();
    console.log(`Total CPUs: ${cpus.length}`);
    cpus.forEach((cpu, idx) => {
        console.log(`CPU ${idx}: ${cpu.model}, ${cpu.speed / 1000} GHz`);
    });
}

export function printHomeDir() {
    console.log(os.homedir());
}

export function printUserName() {
    console.log(os.userInfo().username);
}

export function printArchitecture() {
    console.log(os.arch());
}
