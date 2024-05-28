const fs = require('fs');

// Sample object
const obj = {
  a: 5,
  b: 2,
  c: 8,
  d: 3
};

const arr = Object.entries(obj).sort((a, b) => a[1] - b[1]);

const output = arr.map((pair, index) => ({
  word: pair[0],
  frequency: pair[1],
  rank: index + 1,
  multipliedValue: (index + 1) * pair[1]
}));

// Save output to file
fs.writeFile('output.json', JSON.stringify(output, null, 2), err => {
  if (err) {
    console.error('Error saving file:', err);
    return;
  }
  console.log('File saved successfully.');
});
