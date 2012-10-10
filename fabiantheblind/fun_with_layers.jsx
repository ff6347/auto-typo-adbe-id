    /*
    author: @fabiantheblind
    This script takes a peek into the layers
    It makes use of the printable option to make the layer invisible
    it is NOT the visible option ( the tiny eye on the lyer panel)
    have a deeper look into layers and their props here: http://jongware.mit.edu/idcs6js/pc_Layer.html
    */

main();
function main (){

var redrawState = app.scriptPreferences.enableRedraw; // save the initial state 
app.scriptPreferences.enableRedraw = true; // enable redraw // seems not to wirk well

	/*
	Lets create a nice document with lots of presets.
	To do that we define some variables for better handling
	*/

var pw = 200; // the PageHeight
var ph = 200; // the PageWidth
var gutter = 23; // the Gutter from the Margins to the page border
var columns_num = 3; // the columns in the layot
var columns_gutter = 5;

/* Create a doc with some properties */
var doc = app.documents.add({
	facingPages : false,
	documentPreferences:{
		pageWidth 	: pw,
		pageHeight 	: ph
		},
	viewPreferences:{
		horizontalMeasurementUnits 	: MeasurementUnits.MILLIMETERS,
		verticalMeasurementUnits 	: MeasurementUnits.MILLIMETERS
		}
	});
/* set some properties on the pages */
var page = doc.pages[0];
page.properties = {
		marginPreferences:{
		top 		 	: gutter,
		left 		 	: gutter,
		right 		 	: gutter,
		bottom 		 	: gutter,
		columnGutter 	: columns_gutter,
		columnCount  	: columns_num
		}
	};

var first_layer = doc.layers.item(0); // get the first layer
first_layer.name = "Printable Layer"; // rename it 

/*
Add a textframe wit hsome properties
The textframe will be on the first layer.
Whenever you multiple layers the textfrmae will be created on the last used / active Layer
Set or get the active Layer via:
app.documents.item(0).activeLayer = app.documents.item(0).layers.item(X);
*/
var first_textframe = page.textFrames.add({
				geometricBounds:[gutter,gutter,ph - gutter, pw - gutter],
				contents: "Now You see me!",
				textFramePreferences:{
            		verticalJustification: VerticalJustification.CENTER_ALIGN
            		}
				});


var firstPar = first_textframe.paragraphs[0]; // get the first paragraph
// set some properties
firstPar.properties = {
                pointSize: 23,
                justification : Justification.CENTER_ALIGN,
                hyphenation : false
                };


/*
Lets get to the gist.
you can duplicate layers like everything else.
When you do that all the objects from the duplicated layer are also duplicated

*/
var second_layer = first_layer.duplicate(false); // make a copy of the first layer

second_layer.name = "Non Printable Layer"; // give it a name

second_layer.printable = false; // now this layer wont show in the preview
second_layer.textFrames.item(0).remove();// a layer has also a collection of textFrames lets remove the duplicated tf
alert("I will move the textframe to the non printable layer in 2 seconds"); // Talk a bit
// set to preview  mode
// all content of the non printable layer wont show
app.activeWindow.screenMode = ScreenModeOptions.PREVIEW_TO_PAGE; 
/*
all the following actions cant be seen by the user because they happen on a
non displayed layer via the printable option NOT the visible option
*/
first_textframe.itemLayer = second_layer; // move the textframe
first_textframe.contents = "Now You don't"; // add some text just for fun
first_textframe.itemLayer = first_layer; // now move the tf back to the printable layer
first_textframe.contents = "Now You see me!"; // change the content

app.scriptPreferences.enableRedraw = redrawState; // !Achtung! reset this to the inital state!
};