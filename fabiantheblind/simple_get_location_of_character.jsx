    /*
    author: @fabiantheblind
    This script returns the location of one selected character
    
    
    
    */



if(app.selection[0] instanceof Character){

var x = app.selection[0].horizontalOffset;
var y = app.selection[0].baseline;

alert("Your selected character is at these coordiantes:\n"+"x: " +  x +" y: "+ x);

}else{
	alert("Please select only one character");
}