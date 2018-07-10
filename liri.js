require("dotenv").config();

let keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (process.argv[2] == `my-tweets`) {

};

if (process.argv[2] == `spotify-this-song`) {

};

if (process.argv[2] == `movie-this`) {

};

if (process.argv[2] == `do-what-it-says`) {

};