    /**
    *  author: @fabiantheblind
    *  Fonts can be a pain in the ***
    *  You can call them by name, but than you have to be very precise
    *  by writing their name in the script
    *
    */

  /*  an easier way is to call them by number
   *  but there you will face problems when you activate or deacitvate fonts
   *  because their numbers will change
   *  
   *  This script writes a list of all available fonts
   *  on your system to the desktop
   *  have a look into new file
   *  the weight is separated by a TAB
   *  if you want to call a font by the name
   *  you have to write that TAB.
   *  some IDEs translate TAB into for whitespaces
   *  so be carful
   *  
   */
  
  main(); // main everything is in here
  
  function main(){
      
  var list = new Array(); // a list
  
  // loop thru the fonts and add their info in a list
  for (var i = 0; i < app.fonts.length;i++){
          list.push("app.fonts.item("+ String(i) +") --> " +app.fonts[i].name);
      };  // end loop
  
  // get the textfile
  var txtFile = File("~/Desktop/id_fontslist.txt");
  
  if(!txtFile.exists){
      // if the file does not exist create one
      txtFile = new File("~/Desktop/id_fontslist.txt");
  }else{
      // if it exsists ask the user if it should be overwritten
      var res = confirm ("The file already exists. Should I overwrite it", true,  "titleWINonly");
      // if the user hits no stop the script
      if(res != true){
          return;
          };
      };
  
  var out;// our output
  // we know already that the file exists
  // but to be sure
  if( txtFile!='' ){   
        //Open the file for writing.   
        out = txtFile.open( 'e', undefined, undefined );
        txtFile.encoding = "UTF-8";
        txtFile.lineFeed = "Unix"; //convert to UNIX lineFeed
        // txtFile.lineFeed = "Windows";
        // txtFile.lineFeed = "Macintosh";
     };  
      // got an output?
     if( out != false ){  
       // loop the list and write each item to the file 
       for(var i in list){
          txtFile.writeln(list[i]);
       };
       // always close files!
       txtFile.close();   
       txtFile.execute();  
      };
  // this is more the C or C++ style
  // but it is good for the console
  // we know everything went fine
  return 0;
  };