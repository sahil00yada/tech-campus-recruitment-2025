const fs = require('fs');
const readline = require('readline');
const path = require('path');

if (process.argv.length < 3) {
    console.error('Usage: node extract_logs.js YYYY-MM-DD');
    process.exit(1);
}

const targetDate = process.argv[2];
const logFilePath = path.resolve(__dirname, 'test_logs.log');
const outputDir = path.resolve(__dirname, 'output');
const outputFilePath = path.join(outputDir, `output_${targetDate}.txt`);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const readStream = fs.createReadStream(logFilePath, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(outputFilePath, { encoding: 'utf-8' });
const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });

console.log(`Extracting logs for ${targetDate}...`);

rl.on('line', (line) => {
    if (line.startsWith(targetDate)) {
        writeStream.write(line + '\n');
    }
});

rl.on('close', () => {
    console.log(`Logs extracted to ${outputFilePath}`);
    writeStream.end();
});

rl.on('error', (err) => {
    console.error('Error reading log file:', err);
});

writeStream.on('error', (err) => {
    console.error('Error writing to output file:', err);
});
