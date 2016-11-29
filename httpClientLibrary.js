var request = require('request');

var options = {  
    url: 'http://api.wordnik.com:80/v4/word.json/Andela/examples?includeDuplicates=true&useCanonical=true&skip=0&limit=5&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        
    }
};

request(options, function(err, res, body) {  
    let json = JSON.parse(body);
    console.log(json);
});