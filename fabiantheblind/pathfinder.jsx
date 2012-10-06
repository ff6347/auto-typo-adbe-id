main();

function main () {
/*
These functions build a basic setup
this is for better reuse
*/
var build_setup_result = build_setup();

/*
 separate the result of the setup function into
 single variables. for better handling
*/
var doc = build_setup_result[0]; // This is a doc
var page = build_setup_result[1]; // This is a page
var polygon1 = build_setup_result[2]; // this is our poly1
var polygon2 = build_setup_result[3]; // this is our poly2

page.duplicate(); // duplicate the first page several times
page.duplicate();
page.duplicate();
page.duplicate();

// polygon1.addPath(polygon2); //these are the results of the setup

// these are the duplicated pages

doc.pages.item(1).polygons.item(0).addPath(             doc.pages.item(1).polygons.item(1));
doc.pages.item(2).polygons.item(0).subtractPath(        doc.pages.item(2).polygons.item(1));
doc.pages.item(3).polygons.item(0).intersectPath(       doc.pages.item(3).polygons.item(1));
doc.pages.item(4).polygons.item(0).excludeOverlapPath(  doc.pages.item(4).polygons.item(1));


}; // end of function main


function build_setup(){
// create a doc with a size of 200 w and h
var doc = app.documents.add({

        documentPreferences:{
                pageWidth : 200,
                pageHeight: 200,
                facingPages: false,

            }
        });

var page = doc.pages.item(0); // get the page
/*    
create a textframe with a content and the 
textframe option set to 
Center
*/

var tf1 = doc.pages.item(0).textFrames.add({
        geometricBounds:[25,25,175,175],
        contents: "X",
        textFramePreferences:{
            verticalJustification: VerticalJustification.CENTER_ALIGN
            }
        });
    
    
var firstPar = tf1.paragraphs.item(0); // get the first paragraph
// set some properties
firstPar.properties = {
                pointSize: 500,
                justification : Justification.CENTER_ALIGN,
                hyphenation : false
                };

/*    
create a textframe with a content and the 
textframe option set to 
Center
*/

var tf2 = doc.pages.item(0).textFrames.add({
        geometricBounds:[25,25,175,175],
        contents: "O",
        textFramePreferences:{
            verticalJustification: VerticalJustification.CENTER_ALIGN
            }
        });
    
    
var firstPar = tf2.paragraphs.item(0); // get the first paragraph
// set some properties
firstPar.properties = {
                pointSize: 500,
                justification : Justification.CENTER_ALIGN,
                hyphenation : false
                };


var poly1 = tf1.createOutlines(true); // make a polygon from the text
var poly2 = tf2.createOutlines(true); // make a polygon from the text


return [doc, page, poly1[0], poly2[0]];

}; // end of setup