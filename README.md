auto-typo-adbe-id
=================

This is the code repository for the FH-Potsdam ;-⟩ project week "Typography & Automation". This documentation will be mostly german at first. I will try to translate it all to english  
  
  
###Thema: Typografie und Automation  
Ziel ist es die Grundlagen von JavaScript für Adobe Anwendungen zu erlernen, um diese in automatisierten Layouts und generativer Gestaltung anzuwenden. Anhand von Regeln soll roher Text in Form gebracht werden.  
  
Das Projekt beginnt mit einer Einführung in Javascript und wie es mit InDesign zusammenarbeitet, dann folgen Projekt- und Ideenentwicklung in Einzel- und Gruppenbesprechungen. Zum Abschluss gibt es ein kurze Gruppenpräsentationen.  
  
Vorraussetzungen:  

- Sicherer Umgang mit Adobe InDesign CS4+  
- Mobiler Computer  
- Interesse an Programmierung  
  
Beginn Dienstag 2. Oktober 10 Uhr  
Raum 3.16  
  
- [Incom.org Workspace](http://incom.org/workspace/3916#p103323)  

-----------------------  
In the first session we will dive into the basics of javascript / extendscript for Adobe applications depending on your programming skills.

    	   _____ ________________ ________  _   __   ____  _   ________
    	  / ___// ____/ ___/ ___//  _/ __ \/ | / /  / __ \/ | / / ____/
    	  \__ \/ __/  \__ \\__ \ / // / / /  |/ /  / / / /  |/ / __/   
    	 ___/ / /___ ___/ /__/ // // /_/ / /|  /  / /_/ / /|  / /___   
    	/____/_____//____/____/___/\____/_/ |_/   \____/_/ |_/_____/   
    	                                                               

#!Learn Javascript the Hard Way! || !Dont Copy & Paste!  

##Tools  

- ExtendScript Toolkit  

> The latest version of ExtendScript Toolkit (ESTK 3.8) is available with Creative Suite 6.  

> [Source](http://www.adobe.com/devnet/scripting.html)  

- [Sublime Text 2](http://www.sublimetext.com)  

- [iChm MAC](http://www.robinlu.com/ichm)  

- .chm its native WIN format [e.g. chm reader list](http://blog.kowalczyk.info/articles/chm-reader-viewer-for-windows.html)  

##Reference  

- [InDesign Scripting SDK](http://www.adobe.com/devnet/indesign/sdk/eula_cs6.html)  

- [Jongware IDJS Help](http://www.jongware.com/idjshelp.html)  


##Code  

`//Comments in english - please`  

    /* 
    Variables should have meaningfull names
    as in the examples below ;)
    */

###Variables, Operators, Arrays & Objects  

####Variables  

`var a = "Hello World!";//Strings`  

`var b = 5.5;//Numbers`  

`var c = true;//Boolean`  

####Output  

    /*
    To get a quick look at an value use alerts
    like this
    */
    var bool = true;
    alert(bool);  

####Operations  

    /*
    You can use operators to transform variables
    + - * / % = . ++ -- += -= *= /= 
    like this 
    */
    
    var a = 10000;
    var b = 356;
    var res = b / a;
    alert(res);
    alert(5%4); // modulo
    alert((a/100)*13);

####Arrays  

    /*
    Arrays are like lists of things. You can put variables
    in there and access them by an index. Like this
    */  


`var x = [1,2,3];//Array Number`  

`var x = ["Hello","World","!"]; //Array String`  


    var arr_str = ["Hello","World","!"];  
    var s1 = arr_str[1];
    var s2 = arr_str[2];
    var length_of_world = s2.length;

####Objects

`var o = {"a":"Hello World","b":5.5,"c":true,"x":[1,2,3]};//Object`  

`var ao = [{"a":7,"b":100},{"a":5,"b":42.23}];//Array Object`  

`var arr = ["a","b","c"]; var n = a.length;`

    /*
    Everyting is an object and has own properties and functions like
    the  array.length or string.split("")
    */

####Structures  

    /*
    Use structures to make decisions and repetition  
    with more operators for that  
    < > <= >= == || && !=  
    */


####Conditional  

`if ( ){ }`  

`{ } else { }`  

`{ } else if ( ) { }`  

####Loop

`while ( ) { }`  

`try { } catch (e) { }`  

    var x = [1,2,3]
    for ( var i = 0; i < x.length; i++ ) { x[i] += 1; }  

####Looping Objects

    var o = {
        "a":"Hello World",
        "b":5.5,
        "c":true,
        "x":[1,2,3]
    };//Object  

    for ( var key in o ){ alert( key );}  

####Interaction  

    /*
    Interact with the user via
    alerts, prompts and comfirms
    */

    var res = null;

    res = confirm("Hello World?",false,"Title WIN only");

    if(res == true){
        res = prompt("Enter something:","Hello World!","Title WIN only");
        alert(res);
    }else if(res == false){
        alert("nothing to see here. Move along!");
    }  


####Inspect  

`alert(x.toSource());`  

`alert(x.toString());`  

`$.writeln("Hello World");// use this in ESTK`  

####ID Scrpting DOM  

    /*
    As in javascript everything is an object  
    you can for example add a doc with a textframe on the first page with  
    */

    var aString = "Hello World!\rHello Dude. How are you?\rFine and you?";
    var doc = app.documents.add();
    var pg = doc.pages[0];
    var d_pref = doc.documentPreferences;
    var pw = d_pref.pageWidth;
    var ph = d_pref.pageHeight;


    var x1 = 13;
    var y1 = 13;
    var x2 = pw - x1;
    var y2 = ph - y1;
    var gb = [y1, x1, y2, x2];

    var tf = pg.textFrames.add();
    tf.geometricBounds = gb;
    tf.contents = aString;
    for(var i = 0; i < tf.paragraphs.length; i++){
        var par = tf.paragraphs[i];
        alert(par + "-->" + par.contents);

        for(var j = 0; j < par.words.length; j++){
            alert(par.words[j].contents);
            }
    }

##Links  

###Beginners (no programming experience)  

– [Codacademy](http://www.codecademy.com)    
- ID Scripting Tutorial PDF (find it in the SDK)  

###Intermediate (some programming experience  )  

- ID Scrpting Guide PDF (find it in the SDK)  
- provided examples  

###Advanced (experienced programmers)  

- ID Scripting SDK(Examples + Links List)  


-----------------------  

    	    __  __________________    ____  ___  _________ 
    	   /  |/  / ____/_  __/   |  / __ \/   |/_  __/   |
    	  / /|_/ / __/   / / / /| | / / / / /| | / / / /| |
    	 / /  / / /___  / / / ___ |/ /_/ / ___ |/ / / ___ |
    	/_/  /_/_____/ /_/ /_/  |_/_____/_/  |_/_/ /_/  |_|


##Links  

- [InDesign Scripting SDK](http://www.adobe.com/devnet/indesign/sdk/eula_cs6.html)  
- [ID Scripting Documentation](http://www.adobe.com/devnet/indesign/documentation.html#idscripting)  
- [Jongware IDJS Help](http://www.jongware.com/idjshelp.html)  
- [Jongware IDGrep Help](http://www.jongware.com/idgrephelp.html)  
- [Script UI for Dummies](http://www.kahrel.plus.com/indesign/scriptui.html)  
- [FHP Typo Standard 1](http://fabiantheblind.github.com/theGrids/)  
- [FHP Typo Standard 2](http://fabiantheblind.github.com/TypoStandard/)  
- [FHP Typo Standard 3](http://fabiantheblind.github.com/NextTypoStandard/)  
- [FTB ID Snippets](http://fabiantheblind.github.com/IDSnippets/)  

##Examples  

[load file not done yet](https://github.com/fabiantheblind/auto-typo-adbe-id/blob/master/this_example_does_not_exist.md)  
  
[transformation matrices not done yet](https://github.com/fabiantheblind/auto-typo-adbe-id/blob/master/this_example_does_not_exist.md)  
  
[colors not done yet](https://github.com/fabiantheblind/auto-typo-adbe-id/blob/master/this_example_does_not_exist.md)  
  
[get font number not done yet](https://github.com/fabiantheblind/auto-typo-adbe-id/blob/master/this_example_does_not_exist.md)  
  
[great power not done yet](https://github.com/fabiantheblind/auto-typo-adbe-id/blob/master/this_example_does_not_exist.md)  
  

-----------------------  

##Fori  

- [ID Hilf Dir Selbst](http://www.hilfdirselbst.ch/foren/Adobe_InDesign_Skriptwerkstatt_Forum_61.html)  
- [ID Adobe InDesign Scripting](http://forums.adobe.com/community/indesign/indesign_scripting)  

##Downloads  


##Books  

####InDesign mit JavaScript automatisieren  
ID InDesign mit JavaScript automatisieren Peter Kahrel  
Deutsche Übersetzung von Martin Fischer  
1. Auflage August 2007  
ISBN 978-3-89721-624-2  

##Pages  

##Contributers  

[fabiantheblind](https://github.com/fabiantheblind)  

##Licenses  


Copyright (c)  2012 Fabian "fabiantheblind" Morón Zirfas  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software  without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to  permit persons to whom the Software is furnished to do so, subject to the following conditions:  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

see also http://www.opensource.org/licenses/mit-license.php



