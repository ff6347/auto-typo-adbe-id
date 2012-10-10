/*
This script shows how to use a nifty js color function that I've found here
// http://www.codingforums.com/showthread.php?t=11156

This function converts HSL to RGB values.
Why use HSL?
It is much easier to create harmonic colors 
*/
main();
function main (){

/*

 This is white R: 255 G: 255 B: 255

var hue = 0;
var saturation = 0;
var lightness = 100;

var rgb = color_hsl2rgb(hue, saturation, lightness);

alert("R: " + rgb.r + " G: "+ rgb.g + " B: " + rgb.b);

 */

var pw = 200; // for easier handling
var ph = 200; // for easier handling
var gutter = 23; // the margins till the page bounds

// create a document
var doc = app.documents.add({
	facingPages:false,
	documentPreferences:{
		pageWidth:pw,
		pageHeight:ph
	}});


var radius = (pw /2) - gutter; // the radius of our circle

var page = doc.pages[0]; // get the first page

page.marginPreferences.properties = { /* set some properties */
	top: gutter,
	left: gutter,
	right:gutter,
	bottom:gutter
};

var origin = [pw/2,ph/2]; // the origin of the graphicline

// now lets loop over a circle
for(var degrees = 0; degrees < 360;degrees++ ){

/*
Now comes some wired Math stuff
To get this right we have to transform the degrees
into radians. Than we can caculate the outer point with Math.sin and Math.cos
*/
    var radians_angle = ((degrees/360)%360) * 2 * Math.PI; // turn the degrees into radians

    var x = origin[0] + radius  * Math.cos(radians_angle); // calc the outer x
    var y = origin[1] + radius  * Math.sin(radians_angle); // calc the outer y

    /*
	Lets create a color for every line
	we use the degrees of the circle to get the hue of color
	saturation and lightness are fixed values in this example
    */
	var temp_hue = degrees; // the hue of the color
	var temp_saturation = 100; // the saturation of the color
	var temp_lightness = 70; // the lighness of the color
	/*
	The conversion function returns an object that looks like this
	{ "r": value, "g": value, "b": value }
	*/
	var temp_rgb = color_hsl2rgb(temp_hue, temp_saturation, temp_lightness);


	var color = doc.colors.add();// add a color every iteration
    color.properties = { /* set some props */ 
        name:"color " + degrees, 
        model:ColorModel.PROCESS,
        space:ColorSpace.RGB,
        colorValue:[temp_rgb.r, temp_rgb.g, temp_rgb.b]
    }; 
 
// colors_convertToCMYK(color); // if you use this function by dave saunders you get CMYK colors

  	var gl = page.graphicLines.add({/* add a graphicline every iteration */
  		endCap: EndCap.ROUND_END_CAP,
  		strokeColor  : color,
  		/* leftLineEnd  : ArrowHead.CIRCLE_ARROW_HEAD, */
  		rightLineEnd : ArrowHead.CIRCLE_SOLID_ARROW_HEAD
  	});

  	gl.paths[0].pathPoints[0].anchor = origin; // set the first point of the gl
  	gl.paths[0].pathPoints[1].anchor = [x, y]; // set the secound point of the gl


	};// end of loop degrees

}; // end of main function


//DESCRIPTION: Convert RGB to rounded CMYK

/*
	©Copyright Dave Saunders
	This function converts RGB colors
	to CMYK, rounding the values to the nearest whole number.
	found here: http://indesignsecrets.com/rgb-to-cmyk-0.php
*/

function colors_convertToCMYK(color) {
    color.space = ColorSpace.cmyk;
var vals = color.colorValue;
	for (var j = vals.length - 1; j >= 0; j--) {
        vals[j] = Math.round(vals[j]);
		}
    color.colorValue = vals;
}


/* ------------------------------------------------------------------------------------------------ */
// color conversion found here
// http://www.codingforums.com/showthread.php?t=11156
// this is deep stuff just use it
function color_hsl2rgb(h, s, l) {
	var m1, m2, hue;
	var r, g, b;
	s /=100;
	l /= 100;
	if (s == 0){
		r = g = b = (l * 255);
		}else {
		if (l <= 0.5){
			m2 = l * (s + 1);
			}else{
			m2 = l + s - l * s;
			}
	m1 = l * 2 - m2;
	hue = h / 360;
	r = color_HueToRgb(m1, m2, hue + 1/3);
	g = color_HueToRgb(m1, m2, hue);
	b = color_HueToRgb(m1, m2, hue - 1/3);
	}
return {r: r, g: g, b: b};
};

function color_HueToRgb(m1, m2, hue) {
	
	var v;
	if (hue < 0){
		hue += 1;
	}else if (hue > 1){
		hue -= 1;
	}

	if (6 * hue < 1){
		v = m1 + (m2 - m1) * hue * 6;
	}else if (2 * hue < 1){
		v = m2;
	}else if (3 * hue < 2){
		v = m1 + (m2 - m1) * (2/3 - hue) * 6;
	}else{
		v = m1;
	}

	return 255 * v;
};
/* ------------------------------------------------------------------------------------------------ */

