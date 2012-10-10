    /*
    author: @fabiantheblind
    Lets play with colors
    to use colors you NEED to create a swatch 
    
    
    */

main();
function main (){

// make a document
var pw = 300;
var ph = 30;
var doc = app.documents.add({
            documentPreferences:{
                pageHeight:ph,
                pageWidth:pw
            }
    });

// inspect the existing swatches
var random_num = parseInt(Math.random()*doc.swatches.length);
var random_swatch = doc.swatches[random_num];
alert("the swatch with the number "+
        random_num +" is always\n[" + random_swatch.name + "]");


// now lets create some colors
var cols = new Array();
var num_of_colors = 42*5;
// lets do it randomly
for(var j = 0; j < num_of_colors; j++){
    var r = Math.random() * 10;
    var g = Math.random() * 255;
    var b = Math.random() * 255;
    // important a color needs a unique name
    // color_add function is from indisnip.wordpress.com
    // go down to inspect what she does
    // push the swatches into an array
    cols.push(color_add (doc, "random rgb color"+j, ColorModel.PROCESS, [r,g,b]));
    }; // end of loop

// make some colors by "hand"
cols.push(color_add (doc, "cmyk color", ColorModel.PROCESS, [100,50,0,0]));
cols.push(color_add (doc, "rgb color", ColorModel.PROCESS, [10,0,100]));
cols.push(color_add (doc, "hex color", ColorModel.PROCESS, ["ffffff"]));

// this is how you create colors without that nice function
var color_by_hand =doc.colors.add();
    color_by_hand.properties = {
        name:"color by hand", 
        model:ColorModel.PROCESS,
        space:ColorSpace.RGB,
        colorValue:[100,10,100]};
    
// now we apply them

var pg = doc.pages.item(0); // get the page
var step = pw / cols.length; // calc the number of steps we have. one by color
// coordiantes
var x1 = 0;
var y1 = 0;
var x2 = step;
var y2 = ph;
// loop the colors
for(var i = 0; i < cols.length;i++){
    // add a rectangle
    var rect = pg.rectangles.add({geometricBounds:[y1,x1,y2,x2]});
    rect.fillColor = cols[i];
    rect.strokeWeight = 0;
    x1 = x2;
    x2 = x2 + step;
    }; // end of loop

}; // end of function main

// found on http://bit.ly/h5EobK indisnip.wordpress.com ->
// how to apply:

// add CMYK color
//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [80,50,30,10]);

// add RGB color
//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [33,66,99]);

// add HEX color
//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, "ABCDEF");

// add color directly
// add CMYK color to document
// and asign it to selected object
//app.selection[0].fillColor = myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [80,50,30,10]);

function color_add(myDocument, myColorName, myColorModel, myColorValue){
	if(myColorValue instanceof Array == false){
		myColorValue = [(parseInt(myColorValue, 16) >> 16 ) & 0xff, (parseInt(myColorValue, 16) >> 8 ) & 0xff, parseInt(myColorValue, 16 ) & 0xff ];
		myColorSpace = ColorSpace.RGB;
	}else{
		if(myColorValue.length == 3)
		  myColorSpace = ColorSpace.RGB;
		else
		  myColorSpace = ColorSpace.CMYK;
	}
	try{
		myColor = myDocument.colors.item(myColorName);
		myName = myColor.name;
	}
	catch (myError){
		myColor = myDocument.colors.add();
		myColor.properties = {name:myColorName, model:myColorModel, space:myColorSpace ,colorValue:myColorValue};
	}
	return myColor;
}