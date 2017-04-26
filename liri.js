var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require('fs');

console.log("type my-tweets, spotify-this-song, movie-this, or do-what-it-says, to get started");

var userCommand = process.argv[2];
var secondCommand = process.argv[3];

for(i=4; i < process.argv.length; i ++){
	secondCommand += '+' + process.argv[i];
}

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

 		default:
 		console.log("LIRI does not know that");


	}//close switch
};//close actionSwitch

var runThis = function(argOne, argTwo){
	pick(argOne, argTwo);
}//end runThis
	
function getTweets(){
	console.log("These are my tweets");

	var client = new twitter(keys.twitterKeys);
		
	//parameters
	var params = {screen_name: 'Runtrigirl'} 
		&&	{count: 20 };

	//call get method on our client variable twitter instance
	
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error) {
			 //console.log(error);
			 for(var i =0; i < tweets.length; i++){
			 	console.log(tweets[i].created_at);
			 	console.log(' ');
			 	console.log(tweets[i].text);
			 }
			 
		}
		
	});
			
};//end getTweets


var getArtistNames = function(artists){
	return artists.name;
}

function spotifyMe(song){

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
	 	}
		else{

			var songs = data.tracks.items;
			//console.log(songs);
 			for (var i = 0; i < songs.length; i++) {
   
			 // use the various properties on songs[i] here
			console.log("Artist(s): " + songs[i].artists.map(getArtistNames));
			console.log("Song name: " + songs[i].name);
		    console.log("Album: " + songs[i].album.name);
		    console.log("Preview song: " + songs[i].preview_url);
		    
		 	}
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
			console.log("Title: " + JSON.parse(body)["Title"]);
			console.log("Year: " + JSON.parse(body)["Year"]);
			console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
			console.log("Country: " + JSON.parse(body)["Country"]);
			console.log("Language: " + JSON.parse(body)["Language"]);
			console.log("Plot: " + JSON.parse(body)["Plot"]);
			console.log("Actors: " + JSON.parse(body)["Actors"]);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
			console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
						
		}
	});


};//end aMovieForMe

function followTheTextbook(){
	console.log("Looking at random.txt now");

	fs.readFile('random.txt', 'utf8', function (error, data){
  		if (error) {
  			//throw err;
		  return console.log(error);
		}
		console.log(data);
		// else{
		var dataArr = data.split(', ');
		userCommand = dataArr[0];
		secondCommand = dataArr[1];

		for(i=2; i<dataArr.length; i++){
			secondCommand = secondCommand + " + " + dataArr[i];
			};
		
		 theActionSwitch();

	});

				
			
};//end followTheTextbook


theActionSwitch();