    /*
    author: @fabiantheblind
    includehere.jsx
    You have to define a path
    The file called includeme.jsx has to be next to this file
    
    */

#include "includeme.jsx"

// the variable data is in the included file
alert ("This is the included data:\n" + data.toSource());
// we need a doc
// use pw and ph from data
var doc = app.documents.add({
            documentPreferences:{
                pageHeight:data.ph,
                pageWidth:data.pw
            }
    });	

// the page is already there
var page = doc.pages.item(0);

// create a graphicLine

var gl = page.graphicLines.add(); 

// loop thru the data.anchors
for(var i in data.anchors){
    /**
     * a graphicLine always has 3 pathpoints
     * so we need to add points only from the third
     * anchor from the data object
     */
    if(i < 2){
        gl.paths[0].pathPoints[i].anchor = data.anchors[i];
    }else{
        point = gl.paths[0].pathPoints.add();
        point.anchor =  data.anchors[i];
     }
    
        
    }

