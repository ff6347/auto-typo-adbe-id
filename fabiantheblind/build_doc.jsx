    /*
    author: @fabiantheblind
    this scirpt builds a document 
    
    
    
    */


main();
function main(){
    
// add a doc
var doc = app.documents.add(); 
// lets store some data in an object for better handling
meta = {
        "pw":200,
        "ph":200,
        "top":20,
        "left":20,
        "bottom":20,
        "right":20,
        "gutter":5,
        "textColumnCount":5
        };

// have a look at the build function below
doc_build(doc, true,false,meta);

// now lets make something qith those pages
var count = 0; // counter
var range = 10; // until
var frames = []; // to store the textFrames
// now loop it
while(count < range){
    // the first page is always there
    // so we have to check if we are at index 0
    var page;
    if(count != 0 ){
    page = doc.pages.add(); // if not add a page
    }else{
    page = doc.pages[0]; // we are at index 0 take the exiting page
    }
    // apply a masterspread
    page.appliedMaster = doc.masterSpreads.item(0);
    // add a textFrame and push it into an array
    // for better handling
    frames.push(page.textFrames.add());
    // now get the margins from the page
    // the get bounds function is part of the
    // Scripting Tutorial Hello Worlf from the SDK
    frames[count].geometricBounds = myGetBounds(doc, page);
    // once again we have to check if we are at index 0
    // because the textFrame 0 cant have a previous textfrmae
    // if we are not at 0 connect the actual textFrame with the previous  
    if(count != 0){
        frames[count].previousTextFrame = frames[count-1];
        }
    // now we change the 
    if((count%2) == 0){
        frames[count].textFramePreferences.properties = {
        textColumnCount : page.marginPreferences.columnCount/2,
        textColumnGutter : page.marginPreferences.columnGutter
        };
     }
    count++;
    }
// add some placeholder text
frames[0].contents = TextFrameContents.placeholderText;
// The End
return 0;
};


/**
 *  Lets build a document
 *  with lots of preferences
 */
function doc_build(doc, makeColumns,facingPages,meta){
	doc.layers.item(0).name = "the standard layer";	
	doc.layers.add({name:"a new layer"});
	    if(facingPages){
        doc.documentPreferences.facingPages = true;
    }else{
        doc.documentPreferences.facingPages = false;
    }

	// set some view parameters
    doc.viewPreferences.properties = {
        horizontalMeasurementUnits: MeasurementUnits.MILLIMETERS,
        verticalMeasurementUnits:MeasurementUnits.MILLIMETERS
	};
    // set the page size and bleed box
    doc.documentPreferences.properties = {
		pageWidth : meta.pw,
		pageHeight : meta.ph,
        documentBleedBottomOffset : 3,
        documentBleedTopOffset : 3,
        documentBleedInsideOrLeftOffset : 3,
        documentBleedOutsideOrRightOffset : 3
	};
    
    // the baseline settings
    doc.gridPreferences.properties = {
	 baselineStart : meta.top
	}
    
    // how big are the steps
	doc.gridPreferences.baselineDivision = "15pt";

// lets create some masterspreads
var master_spread1 = doc.masterSpreads.item(0).pages.item(0);// edit the masterspreads
 
    master_spread1.marginPreferences.properties = {
		right:meta.right,
		top:meta.top ,
		left:meta.left ,
		bottom:meta.bottom + 10,
		columnGutter:meta.gutter*2,
	};  

var master_spread2 = doc.masterSpreads.item(0).pages.item(1);//edit the other masterspred

	master_spread2.marginPreferences.properties = {
        right:meta.right,
        top:meta.top,
        left:meta.left,
		bottom:meta.bottom,
		columnGutter:meta.gutter
	};  

    if(makeColumns){
        master_spread1.marginPreferences.columnCount = meta.textColumnCount*2;
        master_spread2.marginPreferences.columnCount = meta.textColumnCount;
    }


}// end make doc

// part of
//ImprovedHelloWorld.jsx from InDesign scripting SDK
//An InDesign CS6 JavaScript

function myGetBounds(myDocument, myPage){
	var myPageWidth = myDocument.documentPreferences.pageWidth;
	var myPageHeight = myDocument.documentPreferences.pageHeight
	if(myPage.side == PageSideOptions.leftHand){
		var myX2 = myPage.marginPreferences.left;
		var myX1 = myPage.marginPreferences.right;
	}
	else{
		var myX1 = myPage.marginPreferences.left;
		var myX2 = myPage.marginPreferences.right;
	}
	var myY1 = myPage.marginPreferences.top;
	var myX2 = myPageWidth - myX2;
	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
	return [myY1, myX1, myY2, myX2];
}