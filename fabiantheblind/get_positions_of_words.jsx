    /*
    author: @fabiantheblind
    This script analyses a text and gets the positions of words
    Has also a nice setup function:
    This function creates a document with some preset vales
    It also creates a textframe on page one
    */
main();

function main(){

var pw = 200; // for easier handling
var ph = 200; // for easier handling

/*
These functions build a basic setup
this is for better reuse
*/
var placeholder_text = create_placeholder(); // this si the placeholder text
var result_of_doc_setup = basic_doc_setup(pw, ph, false, placeholder_text);
alert("This is the result of the doc setup function:"+ result_of_doc_setup); // have a look at the rsult of the setup function
/*
 separate the result of the setup function into
 single variables. for better handling
*/
var doc = result_of_doc_setup[0]; // This is a doc
var page = result_of_doc_setup[1]; // This is a page
var tFrame = result_of_doc_setup[2]; // this is our textframe

/*
The next function uses the build in search options to find a user defined word
and returns an object that looks like this
{ "word":"Hello World", "position":[100,200] }wn and onspect the function with care
the trick is to look for an objects

    var x = Object.horizontalOffset;
    var y = Object.baseline;

    This only works with Text not with graphic objects

Go down and look into the function
*/
var result_of_search = text_find_word(doc, "ich");

// lets have a detaild look

// first use toSource() to get the object as string
// split the string into an array by ","
// joind the string with a breakline
// this is only for display
alert(
  "This is the result of the search:\n"+ 
  result_of_search.toSource().split(",").join("\n")
  );


// these variables are for better handling
var radius = 2.5; // this is the radius of a oval we will draw
var origin_x = pw / 2; // this is its x loc
var origin_y = 0; // this is the y loc

// create a circle on top of the page
var origin = page.ovals.add();
origin.geometricBounds = [ origin_y - radius,origin_x - radius ,origin_y + radius, origin_x + radius];
origin.fillColor = doc.swatches.item(3);/* Thats black on creation */


// now loop thru the results and draw a line from every words location
// to the origin oval

for(var i = 0; i < result_of_search.length;i++){

    var res_x = result_of_search[i].position[0]; // this is x of the result
    var res_y = result_of_search[i].position[1]; // this is y of the result

    var gl = page.graphicLines.add();
    // set the anchors of the graphicLine

    gl.paths.item(0).pathPoints[0].anchor = [origin_x,origin_y];
    gl.paths.item(0).pathPoints[1].anchor = [res_x,res_y];
  }; // end of loop


}; // end of main function


/*
This uses the find and change options to find the location of a word

*/

function text_find_word(the_doc, word_string){


  app.findTextPreferences = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
  app.changeTextPreferences = NothingEnum.nothing; // emptys the change to field!!!thats important!!!

  var result = new Array(); // this will be our return value

  app.findTextPreferences.findWhat = word_string; // set the find what field
  var fc_result = the_doc.findText(); // execute the search findText() returns an Array
  // alert(fc_result.length);
  // now loop thru the results
  for(var i = 0; i < fc_result.length;i++){
    var x = fc_result[i].horizontalOffset;
    var y = fc_result[i].baseline;
    /*
    There are also these to options
    endBaseline  -  Vertical offset of the end of the text.
    endHorizontalOffset  -  Horizontal offset of the end of the text.
    */
    // create an object and push it into the array 
    result.push({"word":word_string,"position":[x,y]});
    }
    // this returns an array of objects
    return result;
    }; // end of text_find_word function



/*
This function creates a document with some preset vales
It also creates a textframe on page one

**************ARGUMENTS**************
page_width  Number
page_height Number
facing_pages Boolean
text_frame_content String

**************RETURN VALUES**************
it returns an array of objects
[Object Document, Object Page, Object TextFrame]

*/

function basic_doc_setup(page_width, page_height, facing_pages, text_frame_content){
	
  // create a doc with a size of 200 w and h
  var doc = app.documents.add({
          documentPreferences:{
                  pageWidth : page_width,
                  pageHeight: page_height,
                  facingPages : facing_pages
              }
          });
  /*    
  get the page
  create a textframe with a the content
  */
var page = doc.pages.item(0);
var top = page.marginPreferences.top;
var left = page.marginPreferences.left;
var right = page.marginPreferences.right;
var bottom = page.marginPreferences.bottom;

// now make a textframe with the content of the argument text_frame_content
var tf = doc.pages.item(0).textFrames.add({
          geometricBounds:[top,left,page_height - bottom, page_width - right],
          contents: text_frame_content,

          });

return[doc, page, tf];

}; // end of basic_doc_setup function

/*
This function just returns this text
So it has not to be in the top of the main function

! Have a look at the unicode character
\u00E4 for ä
\u00df for ß

no arguments

returns String
*/
function create_placeholder () {
    var the_text = "Ich bin Blindtext. Von Geburt an.\r"+
    "Es hat lange gedauert, bis ich begriffen habe,\r"+
    "was es bedeutet, ein blinder Text zu sein:\r"+
    "Man macht keinen Sinn. Man wirkt hier und da aus dem Zusammenhang gerissen.\r"+
    "Oft wird man gar nicht erst gelesen.\r"+
    "Aber bin ich deshalb ein schlechter Text?\r"+
    "Ich wei\u00df, dass ich nie die Chance haben werde im Stern zu erscheinen.\r"+
    "Aber bin ich darum weniger wichtig? Ich bin blind!\r"+
    "Aber ich bin gerne Text.\r"+
    "Und sollten Sie mich jetzt tats\u00E4chlich zu Ende lesen,\r"+
    "dann habe ich etwas geschafft, was den meisten \"normalen\" Texten nicht gelingt.\r"+
    "Ich bin Blindtext. Von Geburt an.\r"+
    "Es hat lange gedauert, bis ich begriffen habe, was es bedeutet, ein blinder Text zu sein:\r"+
    "Man macht keinen Sinn. Man wirkt hier und da aus dem Zusammenhang gerissen.\r"+
    "Oft wird man gar nicht erst gelesen. Aber bin ich deshalb ein schlechter Text?\r"+
    "Ich wei\u00df, dass ich nie die Chance haben werde im Stern zu erscheinen.\r"+
    "Aber bin ich darum weniger wichtig? Ich bin blind!\r"+
    "Aber ich bin gerne Text.\r"+
    "Und sollten Sie mich jetzt tats\u00E4chlich zu Ende lesen, dann habe ich etwas geschafft,\r"+
    "was den meisten \"normalen\" Texten nicht gelingt. Ich bin Blindtext.";

 return the_text;
}; // end of placeholder text function


