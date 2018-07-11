//Inner Sanctum of the Sacred Writs
require("dotenv").config();

//Room of Requirements
let keys = require("./keys.js");
let request = require("request");
let fs = require('fs');
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');

//Function Junction
function twit() {
    let client = new Twitter(keys.twitter);

    let params = { screen_name: 'AcctFunky' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(`😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻\nWelcome to Funky's Cat Facts!\n😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻`);
            for (i = 0; i < 20; i++) {
                console.log(`${tweets[i].text} (${tweets[i].created_at})\n😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻😻`);
            }
        }
        if (error) {
            console.log(`😿 No cat facts for you! 😿`)
        }
    });
};

function smoothJamz() {
    let spotify = new Spotify(keys.spotify);
}

function ebert() {
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        //fix this error handling stuff
        // if (!response) {
        //     console.log(`The movie you have selected is not one. Please select one that is.`)
        // }

        // if (!error && response.statusCode === 200) {
        //     console.log(body);

        //     if (body.Response == "False") {
        //         console.log(`The movie you have selected is not one. Please select one that is.`)
        //     }

        //if some data doesn't exist, nothing shows up...
        console.log(`🎬 The film ${JSON.parse(body).Title} was released in ${JSON.parse(body).Year}. It has a rating of ${JSON.parse(body).Ratings[0].Value} on IMDB and ${JSON.parse(body).Ratings[1].Value} on Rotten Tomatoes. It was produced in ${JSON.parse(body).Country} in ${JSON.parse(body).Language}. The plot is described as: "${JSON.parse(body).Plot}" Actors in ${JSON.parse(body).Title} include ${JSON.parse(body).Actors}.`);

    });
}

//If
if (process.argv[2] == `my-tweets`) {
    twit();
};

if (process.argv[2] == `spotify-this-song`) {
    smoothJamz();
};

if (process.argv[2] == `movie-this`) {
    if (!process.argv[3]) {
        movieName = "the 5000 fingers of dr t"
    }
    else {
        movieName = process.argv.splice(3).join("+");
    }
    ebert();
};

if (process.argv[2] == `do-what-it-says`) {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            console.log(`Something's kinda messed up. 🤷`)
        }
        
        var dataArr = data.split(",");

        if (dataArr[0] == 'my-tweets') {
            twit();
        }
        if (dataArr[0] == 'spotify-this-song') {
            smoothJamz();
        }
        if (dataArr[0] == 'movie-this') {
            movieName = dataArr[1];
            ebert();
        }
    })
};