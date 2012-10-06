/*
This script shows some user interaction
It has a delay function and rsets the view prefs

*/
main();

function main (){
var doc = app.documents.add({
		documentPreferences:{
			pageHeight:200,
			pageWidth:200
		}

});

var page = doc.pages.item(0);

     app.activeWindow.activePage = page;  
     app.activeWindow.zoomPercentage = 100;
     app.activeWindow.zoom(ZoomOptions.FIT_PAGE);
     app.activeWindow.screenMode = ScreenModeOptions.PRESENTATION_PREVIEW;

delay(5);
alert("I waited 5 seconds");

var user_time = prompt("Enter a Number","10");

delay(parseInt(user_time));

alert("I waited another " + user_time+ " seconds");

     app.activeWindow.screenMode = ScreenModeOptions.PREVIEW_TO_PAGE;

// ScreenModeOptions.PRESENTATION_PREVIEW
// ScreenModeOptions.PREVIEW_OFF 
// ScreenModeOptions.PREVIEW_TO_BLEED
// ScreenModeOptions.PREVIEW_TO_PAGE
// ScreenModeOptions.PREVIEW_TO_SLUG



}

// delay function found here
//found here http://www.wer-weiss-was.de/theme157/article1143593.html

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
