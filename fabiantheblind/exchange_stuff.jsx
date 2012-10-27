main();
function main(){
    
    var ph= 200;// page heigt
    var pw = 200;// page width

    var doc = app.documents.add({/*make a doc*/
      documentPreferences:{
        pageWidth:pw,
        pageHeight:ph
        }
    });
    
app.activeWindow.screenMode = ScreenModeOptions.PRESENTATION_PREVIEW; // go to prsent mode

var sentences =["This is the first sentence","This is the second","This is the third"];// this is our content
var page = doc.pages[0]; // this is the page

/*
lets make a textframe that will hold our content

when InDesign is running a script it seems impossilbe to
show the content of a textframe. Thats why we need a workaround.

We do as follows:
- create a textframe
- add the content
- style the text
- create a background that hides the frame
- create outlines from the text without removing the original
    createOutlines(FALSE == dont remove original)
- than we bring that polygon to the front
    so the textframe stays hidden but the outlines show

after 3 seconds we:
- remove the polygon
- add new content the the textframe
- createOutlines without deleting tf
- move them to the front
- show them 

and so on...

*/

var tf = page.textFrames.add({
        geometricBounds:[ph/2 - 25,12.7,ph/2+25,pw - 12.7],
        contents: sentences[0],
        textFramePreferences:{
            verticalJustification: VerticalJustification.CENTER_ALIGN
            }
        });


var firstPar = tf.paragraphs.item(0); // get the first paragraph
// set some properties
firstPar.properties = {
                pointSize: 10,
                justification : Justification.CENTER_ALIGN,
                hyphenation : false,
                fillColor:doc.swatches[2]
                };



scale_till_overflow(firstPar); // scale it up. This is styling only

var poly = tf.createOutlines(false); // if true the original gets deleted returns an Array
/*
cretaOutlines returns an array of polygons
the first one is the one we need
*/
poly[0].strokeWeight = 0; // give him no stroke

/*

add bg to hide tf
everything gets stacked in the doc
so bg created after tf will hide tf
*/

var background_rect = page.rectangles.add({
  geometricBounds:[0,0,ph,pw],
  fillColor:doc.swatches[3]
});

poly[0].bringToFront(); // bring the polygon to the front

delay(3); // wait

alert("I waited 3 seconds");// warn

poly[0].remove();// remove polygon

tf.contents = sentences[1]; // now set the content of tf again

scale_till_overflow(tf.paragraphs.item(0));// style it again

poly = tf.createOutlines(false);// and make outlines again

poly[0].bringToFront();// bring it to the front

delay(5);// wait

alert("Now I waited 5 seconds");// warn

poly[0].remove();// delete the second polygon we created

tf.contents = sentences[2];// set the text

scale_till_overflow(tf.paragraphs.item(0));// style

poly = tf.createOutlines(false);// and for the last time make a polygon

poly[0].bringToFront(); // show it

delay(1);// wait

alert("Now I waited 1 seconds. bye bye");// warn

poly[0].remove();// remove it
tf.remove();
background_rect.remove();
app.activeWindow.screenMode =    ScreenModeOptions.PREVIEW_OFF ;// we are done
doc.close(SaveOptions.NO);
// done

};// end of main


function scale_till_overflow(par){

  var ptsz = par.pointSize; // get the actual pointsize

// a while loop 
// if the tf is not overlflowing scale up
while(par.parent.overflows == false){
        
    par.pointSize = ptsz;
        ptsz++;
        }

// now he has overflow so scale down again until the overflow is gon
while(par.parent.overflows == true){
         ptsz--;
        par.pointSize = ptsz;
        }

}

// delay function
  // found here http://www.wer-weiss-was.de/theme157/article1143593.html
  
  function delay(prmSec){
  prmSec *= 1000;
  var eDate = null;
  var eMsec = 0;
  var sDate = new Date();
  var sMsec = sDate.getTime();
  do {
  eDate = new Date();
  eMsec = eDate.getTime();
  } while ((eMsec-sMsec)<prmSec);
  } 