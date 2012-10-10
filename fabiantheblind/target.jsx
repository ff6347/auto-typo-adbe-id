/**
 *  Look for an active document
 *  without try catch it could produce an error
 *  
 */
var doc;
try{
    
    doc = app.activeDocument; // works with no doc
    
    var name = doc.name; // this is what throws an error
    alert("You have a active document.");
    }catch(error){
    // error is a variable that contains 
    // a message that can be read
    // alert(error);
    alert("You dont have a active document.");
}
