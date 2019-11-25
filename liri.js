var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs") 

moment().format();

let command = process.argv[2];
let input = process.argv[3];

switch (command) {
    case 'concert-this':

        let concertURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
        axios.get(concertURL).then(function(response) {
            let data = response.data[0];

            let concertData = [
                "Artist: " + input,
                "\nVenue: " + data.venue.name,
                "\nLocation: " + data.venue.city + ", " + data.venue.region,
                "\nDate: " + moment(data.datetime).format("MM/DD/YYYY"),
            ].join("\n");

            console.log(concertData);
        })

        .catch(function(error) {
            console.log(error);
        });

    console.log('concert command test');
    break;
    
    case 'spotify-this-song':
    console.log('spotify command test');
    break;
    
    case 'movie-this':

        axios.get("https://www.omdbapi.com/?t=" + input + "&apikey=5762e051")
        .then(function(response) {
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.Rated);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
        })

    console.log('movie command test');
    break;
    
    case 'do-what-it-says':
    console.log('filesystem command test');
    break;

    default:
        console.log("Incorrect Command");
    
}