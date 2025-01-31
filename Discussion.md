# Extract Logs Script

## Solutions Considered

- **Reading Entire File into Memory**:  
  This approach would have loaded the entire log file into memory and then filtered the lines. However, it was inefficient for large log files.

- **Streaming with File Read & Write**:  
  Using `fs.createReadStream` and `readline` allowed efficient line-by-line processing without excessive memory usage. This was chosen for scalability and performance.

## Final Solution Summary

The final solution reads the log file line by line and writes only the matching logs to an output file. This avoids high memory consumption and ensures efficient processing, making it suitable for large log files.

## Steps to Run

1. Ensure Node.js is installed.

2. Place the `extract_logs.js` script and `test_logs.log` in the same directory.

3. Run the script with the following command:

   ```bash
   node extract_logs.js YYYY-MM-DD
