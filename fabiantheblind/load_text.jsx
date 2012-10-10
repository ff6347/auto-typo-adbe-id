    /*
    author: @fabiantheblind
    This script loads a textfile and creates a document with a textFrames
    to place the content.
    
    
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





var txtFile = File.openDialog("Choose your file","*.*",false);
var content;
if(txtFile != false){
	txtFile.open('r');
if(txtFile.length > 0){  
    content = txtFile.read();
    }

	if(content.length > 0){
		var doc = app.documents.add();
		var docPref = doc.documentPreferences;
			docPref.pageWidth =  150;
			docPref.pageHeight =  150;
		var pw = docPref.pageWidth;
		var ph = docPref.pageHeight;
		var page = doc.pages.item(0);
		var tf = page.textFrames.add({geometricBounds:[10,10,ph - 10, pw - 10],contents : content});
		}

}



