var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var Spotify = require("node-spotify-api")
// var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs") 

moment().format();

let command = process.argv[2];
let input = process.argv[3];

let spotify = new Spotify({
    id: 'f44ec5fe1f9f471cb9826a1a9592c417',
    secret: '2cb8f8876f7545078ccfdede83543ddb',
})

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

        spotify.search({type: 'track' , query: input })
        .then(function(response) {
            let data = response.tracks.items[0].album;

            let songData = [
                "Artist" + data.artists[0].name,
                "\nSong" + input,
                "\nSpotify Link: " + data.artists[0].external_urls.spotify,
                "\nAlbum: " + data.name,
            ].join("\n\n");

            console.log(songData);
        })
        .catch(function(err) {
            console.log(err);
        });

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

        fs.readFile("random.txt", "UTF-8", function(error, data) {
            if (error) {
                console.log("Error; " + error);
            } else {
                let choice = data.split(",")
                console.log(choice[1]);

                spotify.search({type: 'track' , query: choice[1] })
        .then(function(response) {
            let data = response.tracks.items[0].album;

            let songData = [
                "Artist" + data.artists[0].name,
                "\nSong" + choice[0],
                "\nSpotify Link: " + data.artists[0].external_urls.spotify,
                "\nAlbum: " + data.name,
            ].join("\n\n");

            console.log(songData);
        })
        .catch(function(err) {
            console.log(err);
        });
            }
        })

    console.log('filesystem command test');
    break;

    default:
        console.log("Incorrect Command");
    
}