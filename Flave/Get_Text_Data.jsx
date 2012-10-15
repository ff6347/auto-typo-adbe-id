////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

This Script takes a Textfile and creates a Datafile from its content. 
The Datafile contains the Number of characters, Number of different punctuation marks 
(Dots, commas, quotes, colons, questionmarks, exclamationmarks and ellipsises) and an array 
of Wordlengths for each Sentence. Sadly the Datafile is not an actual JSON file. 
The toSource() function adds strange parentheseses around each Object. So for further use you 
will have to remove these parentheseses manually - or with the «find and replace» function of a 
texteditor. Also if you want to use the Datafile with one of my other Scripts you'll have to rename 
the Dataobject in the Datafile to data_one or data_two.

*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////



main();

function main () {
	
	var data = { "phrase_data" : []}; 	//stores the data extracted from the file
	var sliceAt = /(\…|\!|\?|\.)/g; 	//defines the characters it should slice at
	
	//Prompt dialog to select your Textfile 
	var textFile = File.openDialog("Select a Textfile", "*.*", false);
	var textFilePath = textFile.fullName;

	//Create file path for the dataFile by cutting of the filename of the textFile
	var lastSlash = textFilePath.lastIndexOf("/");
	var dataFileName = Number(new Date());
	var dataFilePath = textFilePath.slice(0, lastSlash+1) + dataFileName +".js";

	//create new File (in the same Folder as the text file is) in which the data will be stored
	dataFile = new File(dataFilePath);


	if (textFile != null) {
		//Get the content of the file
		textFile.open('r');
		var content = textFile.read();
		
		//get the phrases of the input text
		var phrases = getPhrases(content, sliceAt);

		//Loop throug the phrases-Array to get back an Array for each 
		//phrase storing the length of the words
		for (var i=0; i<phrases.length; i++) {
			var wordLengths = getWordLengths(phrases[i]);
			var punctuation = getPunctuation(phrases[i]);

			//merge wordLengths-Array and punctuation Object an put them in a new Object called phrase_ata
			 punctuation.wordLengths = wordLengths;
			 var phrase_data = punctuation;

			//put phrase_data into data Object
			data.phrase_data[i] = phrase_data;
			var dataAsString 	= data.toSource();
			dataAsString		= dataAsString.replace(/\((.*)\)/, "$1");

			//add an Object name to the Data so it can be included directly in the next Script
			dataAsString = "var data = " + dataAsString;
		}
	}


	//Now write the whole object-string into a file
	var out;// our output
    if( dataFile!='' ){   
          //Open the file for writing.   
          out = dataFile.open( 'w', undefined, undefined );
          dataFile.encoding = "UTF-8";
          dataFile.lineFeed = "Unix"; //convert to UNIX lineFeed
       };  
        // got an output?
       if( out != false ){  

            dataFile.write(dataAsString);

            // allways close files!   
         	dataFile.close();  
       }
}



/////GET PHRASES/////

/* Returns an array containing the sentences of the text in _content */

function getPhrases (_content, _sliceAt) {

	var quotes = /["]/g; //defines the characters inbetween which it should not slice
	var phrases = [];
	var position = 0; 	//keeps track of the position you're looking within the current Phrase
	var quote = false;	//checks if you're inside a quotation so dots can be ignored.

	var chars = _content.length;

	//loop through the whole text to find the right positions to slice the text
	for (var i=0; i<chars; i++) {

		//isolate the character you're looking at
		var currentChar = _content.charAt(position);
		//get the previous character to check wether there was a dot in the end of the quote or not
		if(position>1) {
			var previousChar = _content.charAt(position-1);
		}

		//quote is true if you're inside a quote and false if not
		if(quotes.test(currentChar)) { quote = !quote; }

		//simplified logic stuff ((a || (b && c)) && d) means: slice at the end of a Phrase but only slice if outside or at the end of a quotation.
		if ( (_sliceAt.test(currentChar) || (quotes.test(currentChar) && _sliceAt.test(previousChar)))  && !quote) {

			//split at the current Position + 1 so the end of the Phrase gets included
			var currentPhrase = _content.slice(0, position+1);
			phrases.push(currentPhrase);
			
			_content = _content.slice(position+1, _content.length);
			position = 0;
		} else { position++; }

	}
	return phrases;
}



//GET WORD LENGTHS//

/*Returns an array of the length of the words in the Text*/

function getWordLengths (_text) {

	//split them at whitespace
	var _words = _text.split(" ");
	var _wordLengths = new Array(); //Array for storing the lengths of the words

	//loop through the array of words
	for(var i=0; i<_words.length; i++) {

		//only save wordlength if bigger than 0
		if(_words[i].length > 0){
		 	_wordLengths.push(_words[i].length);
		}
	}

	return _wordLengths;
}



//GET PUNCTUATION//

/*Returns an Object containing the number of occurrences of the punctuation Marks*/

function getPunctuation (_text) {
	var _punctuation = {
		"characters" : 0,
		"dots" : 0,
		"commas" : 0,
		"quotes" : 0,
		"colons" : 0,
		"questionmarks" : 0,
		"exclamationmarks" : 0,
		"ellipsises" : 0,
		"semicolons" : 0
	};

	for(var i=0; i < _text.length; i++) {
		var currentCharacter = _text.charAt(i);

		switch(currentCharacter) {
			case ".":
			_punctuation.dots++;
			break;

			case ",":
			_punctuation.commas++;
			break;

			case "\"":
			_punctuation.quotes++;
			break;

			case ":":
			_punctuation.colons++;
			break;

			case "?":
			_punctuation.questionmarks++;
			break;

			case "!":
			_punctuation.exclamationmarks++;
			break;

			case "…":
			_punctuation.ellipsises++;
			break;

			case ";":
			_punctuation.semicolons++;
			break;
		}

		_punctuation.characters++;
	}
return _punctuation;
}