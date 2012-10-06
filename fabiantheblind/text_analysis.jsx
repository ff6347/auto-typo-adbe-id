/*
This is text analysis the javascript way
This script splits a string by its words and checks for doubles
*/
main();
function main(){
  // create doc, get page, add textframe
  var doc = app.documents.add();
  var page = doc.pages[0];
  var docpref = doc.documentPreferences; // these are the prefs
// some values
  var pw = 200; 
  var ph = 200;
  // set the doc size
 docpref.pageWidth = pw;
 docpref.pageHeight = ph;
// make a textframe
  var tf = page.textFrames.add({geometricBounds:[12.7,12.7,ph-12.7,pw-12.7]});
  
  // add some placeholder text
  tf.contents = TextFrameContents.PLACEHOLDER_TEXT;
// et the content of the textFrame
var content_string = tf.contents;
// now we split that string into an array
var splitted_string_arr = content_string.split(" ");
// the function compress returns an array of object like this
// [({value:"Miu", count:1}), ({value:"sidet;", count:1}), ({value:"num", count:6})] 
var result = compressArray (splitted_string_arr);

alert("\n"+ result.toSource());
};

/*
Array compress function found here
http://ryanbosinger.com/blog/2011/javascript-count-duplicates-in-an-array/
by ryanbosinger
*/
function compressArray(original) {
 
	var compressed = [];
	// make a copy of the input array
	var copy = original.slice(0);
 
	// first loop goes over every element
	for (var i = 0; i < original.length; i++) {
 
		var myCount = 0;
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
 		// if the counter is hier than 0 do something
		if (myCount > 0) {
			var a = new Object(); // greate an object called a
			a.value = original[i]; // add the text of the word
			a.count = myCount; // add the count
			compressed.push(a); // push into the return array
		}
	}
 
	return compressed;
};