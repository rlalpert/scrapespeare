# Scrapespeare

Scrapespeare is a small Node script for outputting word frequency to a .txt file in JSON format, originally created to scrape the complete works of Shakespeare.

# Use

```javascript
node scrapespeare.js path/to/your/file.txt
```

Takes a file as an input. Currently outputs as `filename-wordcount.txt` in the following format:

```json
// { "string": int }
// ex:
{ "Node": 1, "Rocks": 1 }
```

In its current form, it will **overwrite** existing files if they have the name of the output file. 

It also currently counts number frequency with word frequency.

*Note: This is very much a work in progress.*