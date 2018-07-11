require("dotenv").config();

let keys = require("./keys.js");
let request = require("request");
let fs = require('fs');
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');


if (process.argv[2] == `my-tweets`) {
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

if (process.argv[2] == `spotify-this-song`) {
    let spotify = new Spotify(keys.spotify);

};

if (process.argv[2] == `movie-this`) {
    if (!process.argv[3]) {
        movieName = "mr nobody"
    }
    else {
        movieName = process.argv.splice(3).join("+");
    }
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log(`🎥 The film ${JSON.parse(body).Title} was released in ${JSON.parse(body).Year}. It has a rating of ${JSON.parse(body).Ratings[0].Value} on IMDB and ${JSON.parse(body).Ratings[1].Value} on Rotten Tomatoes. It was produced in ${JSON.parse(body).Country} in ${JSON.parse(body).Language}. The plot is described as: "${JSON.parse(body).Plot}" Actors in ${JSON.parse(body).Title} include ${JSON.parse(body).Actors}. 🎬`);

            //    * Title of the movie.
            //    * Year the movie came out.
            //    * IMDB Rating of the movie.
            //    * Rotten Tomatoes Rating of the movie.
            //    * Country where the movie was produced.
            //    * Language of the movie.
            //    * Plot of the movie.
            //    * Actors in the movie.
        }
    });
};

if (process.argv[2] == `do-what-it-says`) {

};