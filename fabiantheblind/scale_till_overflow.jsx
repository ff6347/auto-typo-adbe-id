    /*
    author: @fabiantheblind
    this script centers a character on a page
    and sizes him up until he fills the textframe
    
    
    */

// create a doc with a size of 200 w and h
var doc = app.documents.add({
        documentPreferences:{
                pageWidth : 200,
                pageHeight: 200
            }
        });
/*    
create a textframe with a content and the 
textframe option set to 
Center
*/

var tf = doc.pages.item(0).textFrames.add({
        geometricBounds:[25,25,175,175],
        contents: "X",
        textFramePreferences:{
            verticalJustification: VerticalJustification.CENTER_ALIGN
            }
        });
    
    
var firstPar = tf.paragraphs.item(0); // get the first paragraph
// set some properties
firstPar.properties = {
                pointSize: 10,
                justification : Justification.CENTER_ALIGN,
                hyphenation : false
                };

/*

now lets get to the gist
how to size up a character?
a textframe has a property overflows
so we scale up with a while loop until it overflows
than wie scale down until the overflow is gone
*/

var ptsz = firstPar.pointSize; // get the actual pointsize

// a while loop 
// if the tf is not overlflowing scale up
while(tf.overflows == false){
        
    firstPar.pointSize = ptsz;
        ptsz++;
        }

// now he has overflow so scale down again until the overflow is gon
while(tf.overflows == true){
         ptsz--;
        firstPar.pointSize = ptsz;
        }

    tf.fit(FitOptions.FRAME_TO_CONTENT); // now fit the box onto the character

// we are done.
// x marks the spot