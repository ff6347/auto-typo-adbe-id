// based on this processing sketch by
// PhiLho
// http://forum.processing.org/topic/how-can-i-draw-this#25080000000995029
// the size of the page
var ph= 150;
var pw= 150;

    // we need a doc
  // use pw and phas size
  var doc = app.documents.add({
              documentPreferences:{
                  pageHeight:ph,
                  pageWidth:pw
              }
      }); 
  
  // the page is already there
  var page = doc.pages.item(0);
  // get the center of the page
  var cx = pw / 2;
  var cy = ph / 2;
  // define the initial radius
  var init_rad = 0.9 *(pw / 2);
  var radius = init_rad;
  //this is the amplitude fpr the disturb
  var  amplitude = radius / 10;
 
  // create a graphicLine
  var gl = page.graphicLines.add(); 
  var radians_angle; // this will hold the angle in radians
  var rounds = 10; // how many rounds
    
//~   we need to count the pathpoints.
//~   the first an second always exist in  a grapic line
  var count = 0;
  
  // loop thru the data.anchors
  
  for(var degrees = 0; degrees < 360*rounds; degrees++){
      
      // calculate the degree to radians
      radians_angle = ((degrees/360)%360) * 2 * Math.PI;
    // get the point
      var point = gl.paths[0].pathPoints[degrees];
     // set the disturb to 0 if you want striaght lines
    var disturb1 = amplitude * Math.sin(radians_angle * (Math.random()*(init_rad)/rounds)); 
    // calc the position on the circle
    var x1 = cx + (radius + disturb1) * Math.cos(radians_angle);
    var y1 = cy + (radius + disturb1) * Math.sin(radians_angle);
      /**
       * a graphicLine always has 2 pathpoints
       * so we need to add points only from the third index
       * 
       */
      if(count < 2){
          point.anchor = [x1,y1];
      }else{
          point = gl.paths[0].pathPoints.add();
          point.anchor =  [x1,y1];
       }
        
        // now make the circle smaller by every round
        if(degrees%360 == 0)radius-= ((init_rad)/rounds );
        count++;
      }