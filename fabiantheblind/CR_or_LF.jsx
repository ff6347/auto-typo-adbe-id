    /*  
    author: @fabiantheblind
    This script shows the diffrence between line feeds and carridge returns
    or the answer to the question:
    Why is there only one paragraph in the textfile i've loaded
    
    */

var doc = app.documents.add();
var page = doc.pages[0];
var tf = page.textFrames.add({geometricBounds:[12.7,12.7,297-12.7,210-12.7]});
app.textPreferences.showInvisibles = true;
tf.contents = "This is a newLine\nThis is a CarridgeReturn\r";
