// Using the require keyword lets us access all of the exports
// in our ess.js file

var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require('fs');

console.log("type my-tweets, spotify-this-song, movie-this, or do-what-it-says, to get started");


// var tweets = twitter.twitterKeys;
var userCommand = process.argv[2];
var secondCommand = process.argv[3];

for(i=4; i < process.argv.length; i ++){
	secondCommand += '+' + process.argv[i];
}

//console.log(secondCommand);

function theActionSwitch(){
	switch(userCommand){
 		case 'my-tweets':
 		getTweets();
 		break;

 		case 'spotify-this-song':
 		spotifyMe();
 		break;

 		case 'movie-this':
 		aMovieForMe();
 		break;

 		case 'do-what-it-says':
 		followTheTextbook();
 		break;


	}//close switch
};//close actionSwitch
	
function getTweets(){
	console.log("These are my tweets");

	var client = new Twitter({

		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret, 
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});


	//parameters
	var parameters = {
		screen_name: 'Runtrigirl',
		count: 20
	};


	//call get method on our client variable twitter instance
	//client.get(path, params, callback)
	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if(error) {
			 return console.log(error);
			//console.log(tweets);
			 console.log(response);
			// for(i=0; i<tweets.length; i++){
			// var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweet[i].text + '\n');
			// console.log(returnedData);
			// // console.log("----------------");
			//  }
		};
	 });
};//end getTweets

function spotifyMe(){

	console.log("Music for DAYS!");

	//variable for search term, test if defind
	var searchTrack;
	if (secondCommand === undefined){
		searchTrack = "What's My Age Again?";
	}else{
		searchTrack = secondCommand;
	}

	//launch spotify search

	spotify.search({type:"track", query:searchTrack}, function(err, data){
		if (err){
			console.log("Error occurred: " + err);
			return;
		}else{
			console.log("Artist: " + data.tracks.items[0].artist[0].name);
			console.log("Song: " + data.tracks.items[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("PreviewHere: " + data.tracks.item[0].preview_url);
		}
	});

};//end spotifyme

function aMovieForMe(){
	console.log("Netflix and Chill?");

	//test if search term entered
	var searchMovie;

	if (secondCommand === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = secondCommand;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie + ' &y=&plot=long&tomatoes=true&r=json';

	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			console.log("Title: " + JSON.pare(body)["Title"]);
			console.log("Year: " + JSON.pare(body)["Year"]);
			console.log("IMDB Rating: " + JSON.pare(body)["imdbRating"]);
			console.log("Country: " + JSON.pare(body)["Country"]);
			console.log("Language: " + JSON.pare(body)["Language"]);
			console.log("Plot: " + JSON.pare(body)["Plot"]);
			console.log("Actors: " + JSON.pare(body)["Actors"]);
			console.log("Rotten Tomatoes Rating: " + JSON.pare(body)["tomatoRating"]);
			console.log("Rotten Tomatoes URL: " + JSON.pare(body)["tomatoURL"]);
						
		}
	});


};//end aMovieForMe

function followTheTextbook(){
	console.log("Looking at random.txt now");

	fs.readfile("random.txt", "utf8", function(error, data){
		if (error){
			console.log(error);
			}else
				{
				//split data, declare variables
				var dataArr = data.split(', ');
				userCommand = dataArr[0];
				secondCommand = dataArr[1];

				//multi-word search term add
				for (i = 2; i < dataArr.length; i++){
					secondCommand = secondCommand + " + " + dataArr[i];
				};
				//run Action
				theActionSwitch();
			};//end else
	});//end read file
};//end followTheTextbook


theActionSwitch();