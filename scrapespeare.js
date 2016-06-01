var fs = require('fs');

var file = process.argv[2];

fs.readFile(file, 'utf8', (err, data) => {
  if (err) throw err;
  var fullText = data; // raw data string
  var removedPunctuation = fullText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]?]/g,' '); // remove all punctuation except for apostrophes
  var removedNewlines = removedPunctuation.replace(/\r?\n|\r/g,' '); // remove newlines and replace them with ' '
  var lowerCase = removedNewlines.toLowerCase(); // normalize everything tp lowercase
  var words = lowerCase.split(' '); // split the string into an array of words

// remove any artifacts of splitting the string into an array
for (var i = words.length-1; i--;){
  if (words[i] === '' ) words.splice(i, 1);
}

words.forEach((word) => {
  word.trim(); // trim any whitespace, just in case
});

// console.log(words.slice(250, 280)); // check our work

var wordCounts = {}; // create empty object for adding wordcounts to

for (var i = 0; i < words.length; i++) {
  if (wordCounts.hasOwnProperty(words[i])) {  // if the word already exists in the wordCounts object
    wordCounts[words[i]] += 1; // increment the count by one
  }
  else {
    wordCounts[words[i]] = 1; // if it doens't exist, add it to the object
  }
}

// writes resulting object to a text file
fs.writeFile('wordcount.txt', JSON.stringify(wordCounts), 'utf8', (err) => {
  if (err) throw err;
  console.log('Finished creating word count.');
}); 

});