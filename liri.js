//Inner Sanctum of the Sacred Writs
require('dotenv').config();

//Room of Requirement
let keys = require('./keys.js');
let request = require('request');
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
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: query, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let artistName = data.tracks.items[0].artists[0].name;
        let songName = data.tracks.items[0].name;
        let previewUrl = data.tracks.items[0].preview_url;
        let albumName = data.tracks.items[0].album.name;

        console.log(`🎵\nArtist: ${artistName}\nSong: ${songName}\nPreview: ${previewUrl}\nAlbum: ${albumName}\n🎵`);
    });
}

function ebert() {
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (error) {
            console.log('Something is terribly wrong.')
        }    

        if (JSON.parse(body).Response == "False") {
            console.log(`🚫 The movie you have selected is not one. Please select one that is.`)
        }

        else {
            let imdb;
            let tomatoes;
            let plot;
            if (!JSON.parse(body).Ratings[0]) {
                imdb = "🤷";
                tomatoes = "🤷";
            }
            else {
                imdb = JSON.parse(body).Ratings[0].Value;
                tomatoes = JSON.parse(body).Ratings[1].Value;
            }
            if (JSON.parse(body).Plot == "N/A") {
                plot = "🤷"
            }
            else {
                plot = `"${JSON.parse(body).Plot}"`
            }
            console.log(`🎬\nThe film ${JSON.parse(body).Title} was released in ${JSON.parse(body).Year}. It has a rating of ${imdb} on IMDB and ${tomatoes} on Rotten Tomatoes. It was produced in ${JSON.parse(body).Country} in ${JSON.parse(body).Language}. The plot is described as: ${plot} Actors in ${JSON.parse(body).Title} include ${JSON.parse(body).Actors}.\n🎬`);
        }
    });
}

//Ifs
if (process.argv[2] == `my-tweets`) {
    twit();
};

if (process.argv[2] == `spotify-this-song`) {
    if (!process.argv[3]) {
        query = "highway to the danger zone"
    }
    else {
        query = process.argv.splice(3).join("+");
    }
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

        let dataArr = data.split(/, |,/)

        if (dataArr[0] == 'my-tweets') {
            twit();
        }
        if (dataArr[0] == 'spotify-this-song') {
            if (!dataArr[1]) {
                query = "total eclipse of the heart"
            }
            else {
                query = dataArr[1].split(' ').join('+');
            }
            smoothJamz();
        }
        if (dataArr[0] == 'movie-this') {

            if (!dataArr[1]) {
                movieName = "labyrinth"
            }
            else {
                movieName = dataArr[1].split(' ').join('+');
            }
            ebert();
        }
    })
};