    /*
    author: @fabiantheblind
    This script creates objecxt styles and applies them
    to some pageItem.
    
    
    */



// create a document
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
  // make a rectangle for the background
  var bg_rect = page.rectangles.add({
  			geometricBounds:[0,0,ph,pw],
    		fillColor: doc.swatches.item(4)
    	}); 
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


//make a object style
var objSt1  = doc.objectStyles.add();
// add some properties
objSt1.properties = {
		name:"my first objectstyle",
		strokeWeight: 3,
		strokeColor:doc.swatches.item(7),
		strokeTint: 23,
		bottomLeftCornerOption:CornerOptions.FANCY_CORNER,
		transparencySettings:{
				blendingSettings:{
					opacity:50,
					blendMode: BlendMode.COLOR

					}
				}
		};

// define a object style
var objSt2  = doc.objectStyles.add();
// add some properties
objSt2.properties = {
		name:"my second objectstyle",
		strokeWeight: 5,
		fillColor: doc.swatches.item(5),
        strokeAlignment:StrokeAlignment.CENTER_ALIGNMENT,
		  transparencySettings:{
				blendingSettings:{
					blendMode: BlendMode.COLOR
					}
				}
		};

// now lets apply some styles


items[0].appliedObjectStyle = objSt1; // apply the first style
items[1].appliedObjectStyle = objSt2; // apply the second style

// do it single lined
// have a look at these Options
// http://jongware.mit.edu/idcs6js/pc_PageItem.html

items[2].transparencySettings.blendingSettings.blendMode = BlendMode.LIGHTEN;
items[2].transparencySettings.blendingSettings.opacity = 77;
items[2].fillColor = doc.swatches.item(3);
items[2].strokeWeight = 3;



// we are done










