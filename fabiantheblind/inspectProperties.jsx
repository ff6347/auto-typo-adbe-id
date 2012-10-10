    /*
    author: @fabiantheblind
    This sciprt can be used to inspect the properties of obejects
    from the ID Scripting DOM
    
    
    */
    
// Copyright (c)  2012 
// Fabian "fabiantheblind" Morón Zirfas  
// Permission is hereby granted, free of charge, to any 
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to 
// whom the Software is furnished to do so, subject to 
// the following conditions:  
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.  
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

// see also http://www.opensource.org/licenses/mit-license.php


main();

/*
  Main Function everything is in here

*/
function main(){
    
// store the reference to an object in a variable

//~ var ref = app.activeDocument.paragraphStyles.item(1);

// var ref = app.activeDocument.pages.item(0);

var ref = app.fonts.item(0); 

// you could also use the selection
// if(app.selection.length > 0){
// var obj = app.selection[0];
// };

var insepction_result = inspectObjectProps(ref);

  var res = null;
  res = confirm("Write output to file?",false,"Title WIN only");
  if(res == true){

  writeArray(insepction_result, ref);

  }else if(res == false){

  alert("Properties of "+ String(ref) +"\n" + insepction_result.join("\n"));
  };





};


/**
 *  This inspects the object by looping it and 
 *  turning the result to an string
 *  
 */ 

function inspectObjectProps(obj){

var arr = new Array();

for(var key in obj.properties){

     arr.push("\"" + key +"\":" + obj[key]);

    }

return arr;
}



function writeArray ( arr ,obj){

    //select an output folder
    var newLocation = Folder.selectDialog("Select a output folder...");
    // give the file a unique name 
    var timestamp = Number(new Date());
    // now build the filename. fn you get it?
    var fn =  "file "+ timestamp + String(obj);
    // now set the output folder
    // fs means file system
    // tf means target folder
    var tf = newLocation.fsName;
    // add the new file under the location to the filesystem
    var txtFile =  new File( tf+"/" + fn + ".txt" ); 

  var out;
   if( txtFile!='' ){   
      //Open the file for writing.   
      out = txtFile.open( 'e', undefined, undefined );
      txtFile.encoding = "UTF-8";
      txtFile.lineFeed = "Unix"; //convert to UNIX lineFeed
      // txtFile.lineFeed = "Windows";
      // txtFile.lineFeed = "Macintosh";
   }  
   if( out != false ){  

     for(var i in arr){
      txtFile.writeln(arr[i]);
     }

      txtFile.close();   
     txtFile.execute();  
   }
}


