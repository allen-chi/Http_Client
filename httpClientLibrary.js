var axios = require('axios');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('define> ');
rl.prompt();

rl.write(`define allows you to lookup dictionary words` + `\n` +  `and their meaning directly from your console.` + `\n` + `Type ".exit" to kill process!` + `\n`);


rl.question(`\n` + `Type 'word' to get definition` + `\n`, (word) => {
    var word = word.toLowerCase();

    if (word === "exit") {
      rl.write(`Application exited.`);
      process.exit();
    }

    rl.write(`Getting definition for 'word' ${word}` + `\n`);
    getWordDefinition(word)
        .then(function(response){
            displayDefintion(response.data)
        })

        .catch(function(response){
            wordDefinitionError(response);
        })
});



function displayDefintion(jsonResponse) {
  var numberFound = jsonResponse.length;

  rl.write(`Found ${numberFound} result(s): ` + `\n`);

  jsonResponse.forEach(function(item, idx) {
    rl.write(`${idx + 1}` + `\n`);
    rl.write(`Part of Speech:  ${item.partOfSpeech}` + `\n`);
    rl.write(`Definition: ${item.text}` + `\n` + `\t`);
  });
}

function getWordDefinition(word) {
    return axios.get(`http://api.wordnik.com:80/v4/word.json/${word}/definitions`, {
    params: {
      limit: 200,
      includeRelated: true,
      useCanonical: false,
      includeTags: false,
      api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
    }
  })
}
    

function wordDefinitionError(response) {
  rl.write(`Error getting word defintion please check word spelling.`);
}