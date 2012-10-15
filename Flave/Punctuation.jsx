////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

This script also takes two datafiles. It uses the punctuation data to create a sorted collection of all 
the dots, commas, quotaion marks, and colons. The graphics for the punctuation are small 
images (2mm x 2mm) which have to be placed in the ~/Application/Indesign/Scripts/Script Panel/*  folder.

*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////


//Document Variables
var doc = app.documents.add();
var page = doc.pages.item(0);

//Colors
var bgColor =  color_add (doc, "bgColor", ColorModel.PROCESS, [121, 181, 165]);
var color_one = color_add (doc, "color_one", ColorModel.PROCESS, [12, 5, 19, 0]);
var color_two = color_add (doc, "color_two", ColorModel.PROCESS, [83, 55, 52, 36]);

main();

function main () {

	//include the two datafiles
	#include "Data/1349967053319.js";
	#include "Data/1349967089216.js";

	//Layout Variables
	var yGrid 		= 3; //smallest 
	var xGrid 		= .25;
	var margin 		= 10;
	var gutter 		= 10*xGrid;
	var width 		= 120;
	var height 		= 30;
	var xCenter		= width/2;


	//SETUP DOCUMENT AND PAGE//

	var docPrefs 	= {
		documentPreferences : {
			"pageWidth" : width,
			"pageHeight": height
		}
	}

	var pagePrefs = {
		marginPreferences : {
			top 	: margin,
			right 	: margin,
			bottom 	: margin, 
			left 	: margin
		}
	}

	//setup document
	doc.properties = docPrefs;

	//setup page
	page.properties = pagePrefs;

	//make background
	var bg = page.rectangles.add({
		geometricBounds : [0, 0, height, width],
	});

	bg.fillColor = bgColor;
	

	//chart specific variables
	var barHeight 	= (2/3) * yGrid;

	//stores the relevant data for the barchart in one object which can easily be passed around
	var chartProperties = {
		"_yGrid" 		: yGrid,
		"_xGrid" 		: xGrid,
		"_gutter"	 	: gutter,
		"_margin"		: margin,
		"_xCenter" 		: xCenter,
		"_barHeight" 	: barHeight,
	}

	drawDotChart(data_one, 1, chartProperties, color_one);
	drawDotChart(data_two, -1, chartProperties, color_two);
}


function drawDotChart(data, side, properties, color) {
	var verticalCounter = 0;
	var horizontalCounter = 0;
	var maxSigns = 100;

	//get the xPosition of the first Dot...sorry for that
	var xOffset = properties._xCenter + (side * properties._gutter/2);
	var yOffset = properties._margin;


	//get the images needed for the drawings
	var images = {};
	if (side == 1) {
		images.dots = (File("../Scripts Panel/dot_bright.eps"));
		images.commas = (File("../Scripts Panel/comma_bright.eps"));
		images.quotes = (File("../Scripts Panel/quote_bright.eps"));
		images.colons = (File("../Scripts Panel/colon_bright.eps"));
	} else {
		images.dots = (File("../Scripts Panel/dot_dark.eps"));
		images.commas = (File("../Scripts Panel/comma_dark.eps"));
		images.quotes = (File("../Scripts Panel/quote_dark.eps"));
		images.colons = (File("../Scripts Panel/colon_dark.eps"));
	}


	//Initialize object for storing the punctuation date -> why do I have to do this, why doesn't it work when
	//punctuation.dots gets created directly?
	var punctuation = {
		dots : 0,
		commas : 0,
		quotes : 0,
		colons : 0,
	};

	//loop through the sentences and store the amount of signs
	for(var i=1; i<data.phrase_data.length; i++) {
		punctuation.dots 	+= data.phrase_data[i].dots;
		punctuation.commas 	+= data.phrase_data[i].commas;
		punctuation.quotes 	+= data.phrase_data[i].quotes;
		punctuation.colons 	+= data.phrase_data[i].colons;
	}

	
	for (var key in punctuation) {
		for (var j=0; j<punctuation[key]; j++){
			//get the positions for the signs based on the signs allready drawn
			var top = yOffset + verticalCounter * properties._yGrid;
			var left = xOffset + (side * horizontalCounter * 2);
			var bottom = top + 2;
			var right = left + (side * 2);

			//create rectangle in which we can place the image
			var sign = page.rectangles.add({
					geometricBounds : [top, left, bottom, right],
					strokeWeight: 0
				});

			sign.place(images[key]);
			sign.fit(FitOptions.CENTER_CONTENT);

			//move one horizontal position further 
			horizontalCounter++;

			//If there are more signs than "allowed" in one line move to the beginning of the next line
			if(horizontalCounter >= maxSigns) {
				horizontalCounter = 0;
				verticalCounter++;
			}
		}
	//move back to center when starting a new Line
	horizontalCounter = 0;
	//move one horizontal position when starting to draw a new sign
	verticalCounter++;
	}
}


//COLOR ADD//
/*Handy color function for creating color objects 
by Fabian Morón Zirfas / https://github.com/fabiantheblind*/

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

