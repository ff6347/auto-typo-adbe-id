/*
a basic find and change script not using fc queries
*/

/*
This is the text we are going to change
look at the double characters and all that tab return

*/
var the_text_to_change = "An einem Morgen später Regenfälle\r\t"+
							"kam Sierva María de Todos los Ángeles\t\r"+
							" im Zeichen des Schützen als Siebenmonatskind\r\t"+
							" recht und schlecht auf die Welt.\t\r "+
							"\t\tSie erinnerte an eine farblose Kaulquappe\r"+
							" \t\tund wäre fast von der um den Hals  gewickelten  Nabelschnur\r"+
							" \t\tstranguliert worden.";
var doc = app.documents.add(); // create a doc

var tf = doc.pages.item(0).textFrames.add({
	/* Make a textframe in the first page with that text */
	geometricBounds:[12.7,12.7,297 - 12.7, 210 - 12.7],
	contents: the_text_to_change
});



app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
app.changeGrepPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!

	// some settings
    app.findChangeGrepOptions.includeFootnotes = true;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = true;
    app.findChangeGrepOptions.includeMasterPages = true;

 	var greps = [
 		{"findWhat":"  +","changeTo":" "},// 	Find all double spaces and replace with single spaces.
		{"findWhat":"\r ","changeTo":"\r"},// 	Find all returns followed by a space And replace with single returns.
		{"findWhat":" \r","changeTo":"\r"},// 	Find all returns preceeded by a space and replace with single returns.
		{"findWhat":"\t\t+","changeTo":"\t"},// 	Find all double tab characters and replace with single tab characters.
		{"findWhat":"\r\t","changeTo":"\r"},// 	Find all returns followed by a tab character and replace with single returns.
		{"findWhat":"\t\r","changeTo":"\r"}// 	Find all tabs followed by a return character and replace with single returns.
	]

	// loop thru the greps object
	for(var i = 0;i < greps.length;i++){
		// this is like entering the find what text in the UI
		app.findGrepPreferences.findWhat = greps[i].findWhat;
		// this is like entering text in the change to
		app.changeGrepPreferences.changeTo = greps[i].changeTo;
		// and now hit the button
		doc.changeGrep();
		
		app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
		app.changeGrepPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!
	};
// we are done