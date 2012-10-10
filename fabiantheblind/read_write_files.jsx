    /*
    author: @fabiantheblind
    This script shows how to read and write files
    
    
    
    */

    main();
    function main(){
        
        var randomname = Number(new Date());
         // get the textfile
       var filepath = "~/Desktop/"+randomname +".txt";
      var write_file = File(filepath);
      
      if(!write_file.exists){
          // if the file does not exist create one
          write_file = new File(filepath);
      }else{
          // if it exsists ask the user if it should be overwritten
          var res = confirm ("The file already exists. Should I overwrite it", true,  "titleWINonly");
          // if the user hits no stop the script
          if(res != true){
              return;
              };
          };
      
      var out;// our output
      // we know already that the file exist
      // but to be shure
      if( write_file!='' ){   
            //Open the file for writing.   
            out = write_file.open( 'w', undefined, undefined );
            write_file.encoding = "UTF-8";
            write_file.lineFeed = "Unix"; //convert to UNIX lineFeed
            // txtFile.lineFeed = "Windows";
            // txtFile.lineFeed = "Macintosh";
         };  
          // got an output?
         if( out != false ){  
           // loop the list and write each item to the file 
              write_file.writeln("Hello World!");
                  // allways close files!
           write_file.close();  
         }
           
        var read_file = File(filepath);
        read_file.open('r', undefined, undefined);
          if( read_file!=''){ 
              alert ("this is read only\n "+ read_file.read());
              read_file.close();
              }
          
          
         
         var append_file  = File(filepath);
         append_file.open('a', undefined,undefined);
         if( append_file!='' ){ 
              append_file.writeln("Hello I'm an appended line!");
    
              append_file.close();
              }
          
        var read_again_file = File(filepath);
        read_again_file.open ('r', undefined, undefined);
          if( read_again_file!='' ){ 
              alert ("this is read only again\n"+ read_again_file.read());
              read_again_file.close();
              }
         
        // there is also an open for appending option
        // try to play with:
        // File.open ('a', undefined, undefined);
    };