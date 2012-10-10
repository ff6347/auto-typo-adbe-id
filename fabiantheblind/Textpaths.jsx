    /*
    author: @fabiantheblind
    this script creates a textpath
    and plays with anchors
    !Ride The Walrus
    
    */

var pw = 200;
var ph = 200;
  // create a doc with a size of 200 w and h
var doc = app.documents.add({
          documentPreferences:{
                  pageWidth : pw,
                  pageHeight: ph
              }
          });

  
// the page is already there
var page = doc.pages.item(0);
  
  // create a graphicLine
  
var gl = page.graphicLines.add(); 
var off = 12.7;

var p1 = [off, ph/2];
var p2 = [pw/2, (ph/2) - off];
var p3 = [pw - off, ph/2];

var pathpoint1 = gl.paths[0].pathPoints[0];
var pathpoint2 = gl.paths[0].pathPoints[1];
var pathpoint3 = gl.paths[0].pathPoints.add();

pathpoint1.anchor = p1;
pathpoint2.anchor = p2;
pathpoint3.anchor = p3;

pathpoint1.rightDirection = [p1[0] + off, p1[1] - off];
pathpoint2.leftDirection  = [p2[0] - off*2, p2[1] + off*2];
pathpoint2.rightDirection = [p2[0] + off*2, p2[1] + off*2];
pathpoint3.leftDirection  = [p3[0] - off, p3[1] + off];
gl.strokeWeight = 0;
gl.textPaths.add({contents:"Ride the Wallrus!"});

var par = gl.textPaths.item(0).paragraphs.item(0);


var ptsz = par.pointSize; // get the actual pointsize

// a while loop 
// if the tf is not overlflowing scale up
do{
  par.pointSize = ptsz;
  ptsz++;
} while(gl.textPaths.item(0).overflows == false);

ptsz = ptsz - 5;
par.pointSize = ptsz;


