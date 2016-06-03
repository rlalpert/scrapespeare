var fs = require('fs');
var path = require('path');

var file = process.argv[2];
var output = path.parse(file).name;

fs.readFile(file, 'utf8', readFileCallback);

function readFileCallback (err, data) {
  if (err) throw err;
  var fullText = data; // raw data string
  var removedPunctuation = fullText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]?]/g,' '); // remove all punctuation except for apostrophes
  var removedNewlines = removedPunctuation.replace(/\r?\n|\r/g,' '); // remove newlines and replace them with ' '
  var words = removedNewlines.split(' '); // split the string into an array of words

  var wordCounts = {}; // create empty object for adding wordcounts to
  for (var i = 0; i < words.length; i++) {
    let normalizedWord = words[i].toLowerCase().trim();
    if (wordCounts.hasOwnProperty(normalizedWord)) {  // if the word already exists in the wordCounts object
      wordCounts[normalizedWord] += 1; // increment the count by one
    }
    else {
      wordCounts[normalizedWord] = 1; // if it doens't exist, add it to the object
    }
  }

  // writes resulting object to a text file
  fs.writeFile(`${output}-wordcount.txt`, JSON.stringify(wordCounts), 'utf8', (err) => {
    if (err) throw err;
    console.log(`Word count available as ${output}-wordcount.txt`);
  });
}
