////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

This Scipt basically does the same as the Simple_Barchart_Plus.jsx. In addition it  places the 
Punctuation of each Phrase right behind its bar.

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


	//get the maximum of sentences one text contains to determine the height of the document
	var maxPhrases = Math.max(data_one.phrase_data.length, data_two.phrase_data.length);

	//get the maximum of characters one sentence contains to determinate the width of the document
	var maxCharacters = Math.max(getMax(data_one), getMax(data_two));


	//Layout Variables
	var yGrid 		= 3;  		//used for determine the y position of bars and other elements
	var xGrid 		= .25; 		//used for determine the x position of bars and other elements
	var margin 		= 25;		//determines the start of the chart
	var gutter 		= 10*xGrid;	//determines the gap in the middle of the chart
	
	var width 		= (2 * maxCharacters * xGrid) + (2 * margin) + gutter;
	var height 		= (maxPhrases + 1) * yGrid + (2 * margin) + 20;
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

	//setup document and page
	doc.properties = docPrefs;
	page.properties = pagePrefs;

	//make background
	var bg = page.rectangles.add({
		geometricBounds : [0, 0, height, width],
	});

	bg.fillColor = bgColor;

	
	/////SETUP AND DRAW BARCHART/////

	//chart-specific variables
	var barHeight 	= (2/3) * yGrid;
	var chartHeight = (maxPhrases + 1) * yGrid;
	
	//stores the relevant data for the barchart in one 
	//object which can easily be passed around
	var chartProperties = {
		"_yGrid" 		: yGrid,
		"_xGrid" 		: xGrid,
		"_gutter"	 	: gutter,
		"_margin"		: margin,
		"_xCenter" 		: xCenter,
		"_barHeight" 	: barHeight,
		"_chartHeight"	: chartHeight
	}

	//draw the chart
	drawSimpleBarchart(data_one, 1, chartProperties, color_one);
	drawSimpleBarchart(data_two, -1, chartProperties, color_two);

	//draw the dots 'n' stuff behind the chart
	drawDots(data_one, 1, chartProperties);
	drawDots(data_two, -1, chartProperties);

	//draw the dot charts
	drawDotChart(data_one, 1, chartProperties);
	drawDotChart(data_two, -1, chartProperties);
}


//DRAW SIMPLE BARCHART//

/*data = the data for the Barchart
side = 1 / -1 = draw the chart on the right or left side
properties = object with the relevant measurements needed to draw the chart*/

function drawSimpleBarchart(data, side, properties, color) {

	//determine the starting Point of the Chart
	var xOrigin = properties._xCenter + (side * properties._gutter/2);
	var yOrigin = properties._margin;

	//draw headline
	for (var i = 0; i < data.phrase_data.length; i++) {

		if(i==0) {
			var top  	= yOrigin + properties._yGrid * i;
			var left 	= xOrigin;
			var right  	= xOrigin + (side * data.phrase_data[i].characters * properties._xGrid);
			var bottom 	= top + properties._barHeight*2;
		}

		//calculate the dimensions of the bar
		if(i>0) {
			var top  	= yOrigin + properties._yGrid * (i+1);
			var left 	= xOrigin;
			var right  	= xOrigin + (side * data.phrase_data[i].characters * properties._xGrid);
			var bottom 	= top + properties._barHeight;
		}

		//draw bar
		var bar = page.rectangles.add({ 
			geometricBounds : [top, left, bottom, right],
			fillColor : color,
			strokeWeight : 0
		});
	};
}



//DRAW DOTS//

/*Draws the punctuation at the End of the Barchart*/

function drawDots (data, side, properties) {
	
	//keeps track of how many sings per line allready have been drawn
	var counter = 0;

	var images = [];
	
	if(side == 1) {
		images.push(File("../Scripts Panel/dot_bright.eps"));
		images.push(File("../Scripts Panel/comma_bright.eps"));
		images.push(File("../Scripts Panel/quote_bright.eps"));
		images.push(File("../Scripts Panel/colon_bright.eps"));
	} else {
		images.push(File("../Scripts Panel/dot_dark.eps"));
		images.push(File("../Scripts Panel/comma_dark.eps"));
		images.push(File("../Scripts Panel/quote_dark.eps"));
		images.push(File("../Scripts Panel/colon_dark.eps"));
	}

	//loop through the sentences	
	for(var i=1; i<data.phrase_data.length; i++) {

		//get the xPosition of the first Dot...sorry for that
		var xOffset = properties._xCenter + (side * properties._gutter/2) + (side * data.phrase_data[i].characters * properties._xGrid);	
		var yOffset = properties._margin;

		//push the punctuation-data in a new array...because my datamodel is soo unconvinient!
		var punctuation = [];
		punctuation.push(data.phrase_data[i].dots);
		punctuation.push(data.phrase_data[i].commas);
		punctuation.push(data.phrase_data[i].quotes);
		punctuation.push(data.phrase_data[i].colons);


		//loop through the punctuation-array
		for (var p=0; p<punctuation.length; p++) {

			//loop through one instance of punctuation and draw something
			for(var d=0; d<punctuation[p]; d++) {	

				var top 	= yOffset + properties._yGrid * (i+1);
				var left 	= xOffset + (side * counter * 2);
				var bottom  = top + 2;
				var right  	= left + (side * 2);

				var testRect = page.rectangles.add({
					geometricBounds : [top, left, bottom, right],
					strokeWeight: 0
				});

				testRect.place(images[p]);
				testRect.fit(FitOptions.CENTER_CONTENT);

				counter++;
			}
		}

	//reset counter when going to the next line
	counter = 0;
	}
}


//DRAW 

function drawDotChart(data, side, properties, color) {
	var verticalCounter = 0;
	var horizontalCounter = 0;
	var maxSigns = 100;

	//get the xPosition of the first Dot...what a mess
	var xOffset = properties._xCenter + (side * properties._gutter/2);
	var yOffset = properties._chartHeight+ properties._margin + 10;


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
		dots 	: 0,
		commas 	: 0,
		quotes 	: 0,
		colons 	: 0,
	};

	//loop through the sentences and store the amount of signs
	for(var i=1; i<data.phrase_data.length; i++) {
		punctuation.dots 	+= data.phrase_data[i].dots;
		punctuation.commas 	+= data.phrase_data[i].commas;
		punctuation.quotes 	+= data.phrase_data[i].quotes;
		punctuation.colons 	+= data.phrase_data[i].colons;
	}

	//loop through the punctuation object 
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


//GET MAX//

//get the maximum of characters contained by one word out of the data set
function getMax(_data) {
	var _max = 0;
	for (var i = 0; i < _data.phrase_data.length; i++) {
		if(_data.phrase_data[i].characters>_max) {
			_max = _data.phrase_data[i].characters;
		}
	}
	return _max;
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