var fs = require('fs');
var path = require('path');

var file = process.argv[2];
var output = path.parse(file).name;

fs.readFile(file, 'utf8', readFileCallback);

function readFileCallback (err, data) {
  if (err) throw err;
  var fullText = data; // raw data string
  console.log('Read data.');
  var removedPunctuation = fullText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]?]/g,' ');
  console.log('Removed punctuation.'); // remove all punctuation except for apostrophes
  var removedNewlines = removedPunctuation.replace(/\r?\n|\r/g,' '); // remove newlines and replace them with ' '
  console.log('Removed newlines.>;');
  var words = removedNewlines.split(' '); // split the string into an array of words
  console.log('Split words into array.');

  // remove any artifacts of splitting the string into an array
  for (var i = words.length-1; i--;){
    if (words[i] === '' ) words.splice(i, 1);
  }

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
