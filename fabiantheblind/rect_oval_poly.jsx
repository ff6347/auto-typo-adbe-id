    /*
    author: @fabiantheblind
    Rectangles ovlas polygons
    This script creates some graphic elements and shows how to load text
    also there is a wired JSON object for interacting with the user
    
    */

main();

function main(){
var pw = 170; // for better handling
var ph = pw/3; // also 

// make a document
var doc = app.documents.add({
    documentPreferences:{
        pageWidth:pw,
        pageHeight:ph
        }
    });

// there is already a page
var page = doc.pages[0];
// some variables for calculating positions
// of our objects
var step = (pw/3);
var gutter = 10;
var y1 = gutter;
var x1 = gutter;
var y2 = (ph - gutter);
var x2 = (step - gutter);

// make a rectangle
var rect = page.rectangles.add({geometricBounds:[y1,x1,y2,x2]});
// move to the right
x1 += step;
x2 = x2 + step ;
// make an oval
var oval = page.ovals.add({geometricBounds:[y1,x1,y2,x2]});
// move again
x1 += step;
x2 = x2 + step;
// make a polygon
var poly = page.polygons.add({geometricBounds:[y1,x1,y2,x2]});
// now we throw tem in an array
var items = [rect,oval,poly];

// load 3 images
var images = File.openDialog("Select at least "+items.length+" images","*.*",true);
// this is an object to encapsulate all the 
// communication with the user
var comunication = messages(images.length, items.length);
// if the images dont fit the number of objects
// stop the function
if(images.length < items.length){
    comunication.wrong_num();
    return;
    }else if(images.length == items.length){
    comunication.right_num();
    }else if (images.length > items.length){
    comunication.check_diff();
}
// loop our aray and do some stuff
// the objects in the array have some
// (seems like all) properties
// in common.

for(var i in items){
    thing = items[i]; // isolate it we dont know what it is
    thing.strokeWeight = 0; // set to no stroke
    thing.place(images[i]); // place one of the images
    thing.fit(FitOptions.CENTER_CONTENT); // fit it
    thing.fit(FitOptions.FILL_PROPORTIONALLY); // fit it
    // you can find out what kind of object
    // you have by checking like this
    if(thing instanceof Rectangle){
        alert("I'm an "+ thing.constructor.name +". at index " + i + "");
        thing.bottomLeftCornerOption = CornerOptions.ROUNDED_CORNER;
        }; // close if
    }; // close loop

return 0;
}; // close main function



/**
 *  This function does some communication based on a numbers
 *  Just for fun ;)
 *
 */
function messages(images_len,items_len){
    var diff = images_len - items_len;
    var obj = { 
                "images_len":images_len,
                "items_len":items_len,
                "diff":diff,
                /* the message if it is the right num*/
                "right_num":function (){
                    alert("Well done. This is the right amount of images.\n"+
                "Sing with me: '"+ items_len + "' is the magic number!\n" +
                "Yes t is my friend - It's the magic number...");
                },
                /* the message if it is not enough */
                "wrong_num":function(){
                    alert("You need more images.\nTry again.");
                    },
                /* if there are to many images do some talking */
                "one":"Hm. There is "+ diff+ " image more.\n",
                "multi": "Hm. There are "+ diff + " images more.\n",
                "end":"I will only use "+ items_len + " of them.",
                "build": function(bool){
                         if(bool == true){
                             return this.one + this.end;
                             }else{
                             return this.multi + this.end;
                         }
                     }/* close conditional*/,
                    /*now the function that gets called */
                    "check_diff":function(){
                            if(diff == 1){
                            alert(this.build(true));
                            }else{
                            alert(this.build(false));
                            }
                        }
                    }/* close build function in object. IMPORTANT dont add an ";" */
                ; /* Close the obj objecct */
            return obj;
            }
