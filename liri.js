// Using the require keyword lets us access all of the exports
// in our ess.js file

var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
//var fs = require('fs');

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

	var client = new twitter({

		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret, 
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});


	//parameters
	var params = {
		screen_name: 'Runtrigirl'} &&
		{count: 20
	};


	//call get method on our client variable twitter instance
	//client.get(path, params, callback)
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error) {
			 //console.log(error);
			 console.log(tweets);
			}
		else{
			throw error
		}
			 console.log(response);
			var tweets = tweets.trim(", ");
			console.log(tweets);
			// for(i=0; i<tweets.length; i++){
			// var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweet[i].text + '\n');
			//  console.log(returnedData);
			//  console.log("----------------");
			//    }
		});
	 //});
};//end getTweets

//};//close switch here or line 43

var getArtistNames = function(artists){
	return artists.name;
}
function spotifyMe(song){

	console.log("Music for DAYS!");
//something to look at from instructor
// spotify.search({type:"track", query: 'dancing in the moonlight'}, function(err, data){
// 	if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
    // else{
    // 	var songInfo = data.tracks.item[0];
    // 	var songResult = console.log(songInfo.artists[0].name);
    // 					console.log(songInfo.name);
    // }
// console.log(data.tracks.items[0]);
// 
//  }
//  });
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
   
// // use the various properties on songs[i] here
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

	var fs = require('fs');

	fs.readfile("random.txt", "utf8", function(error, data){
		console.log(data);
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