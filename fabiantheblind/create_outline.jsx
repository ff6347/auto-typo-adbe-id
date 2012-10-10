    /*
    author: @fabiantheblind
    This scipt create outlines from text
    aligns some objects
    builds a group
    
    */

// this is only prerequisite make a doc with some objects
// create a doc with a size of 200 w and h
var doc = app.documents.add({
        documentPreferences:{
                pageWidth : 200,
                pageHeight: 200
            }
        });
// some colors
var polycol_stroke = doc.colors.add({
	name:"polycol_stroke",
	model:ColorModel.PROCESS,
	space:ColorSpace.RGB,
	colorValue:[10,0,10]});

var circlecol_fill = doc.colors.add({
	name:"circlecol_fill",
	model:ColorModel.PROCESS,
	space:ColorSpace.RGB,
	colorValue:[200,255,200]});

// create a circle for styling
var circle = doc.pages.item(0).ovals.add({
	geometricBounds:[25,25,175,175],
	strokeWeight:0,
	fillColor: circlecol_fill 
	});

// create a background in white
var bg = doc.pages.item(0).rectangles.add({
	geometricBounds:[0,0,200,200],
	strokeWeight:0,
	fillColor: doc.swatches.item(2) /* This is white */

});
   
// create a textframe with a content "5" 
var tf = doc.pages.item(0).textFrames.add({
        geometricBounds:[25,25,175,175],
        contents: "5"
        });
    
    
var firstPar = tf.paragraphs.item(0); // get the first paragraph
// set some properties
firstPar.properties = {
                pointSize: 500,
                hyphenation : false
                };

tf.fit(FitOptions.FRAME_TO_CONTENT); // now fit the box onto the character

/*
This is the gist.
- create outlines
- center the object
- make a group from polygon and rectangle bg
- apply some styling
- with the styling the circle gets visible again
*/


var poly = tf.createOutlines(true); // if true the original gets deleted returns an Array
poly[0].strokeWeight = 5; // give him a stroke
poly[0].strokeColor = polycol_stroke; // give him a stroke color

// center the polygon align expects an array
doc.align(poly, DistributeOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.PAGE_BOUNDS);
doc.align(poly, DistributeOptions.VERTICAL_CENTERS,AlignDistributeBounds.PAGE_BOUNDS);


var groupArray = new Array(); // create an array for the objects we want to group

groupArray.push(bg); // push the bg into it
groupArray.push(poly[0]);// push the polygon into the Array
var the_group = doc.pages.item(0).groups.add(groupArray); // add a group to the first page

the_group.transparencySettings.blendingSettings.blendMode = BlendMode.DIFFERENCE;
the_group.transparencySettings.blendingSettings.opacity = 77;

