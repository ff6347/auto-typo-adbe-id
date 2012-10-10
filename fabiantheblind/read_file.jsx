    /*
    author: @fabiantheblind
    This script shows how to read in a file and evaluate the JSON STring from in there
    It needs the JSONString.json file to be next to the script
    !Achtung! eval is evil! Improper use of eval opens up your code for injection attacks
    http://stackoverflow.com/a/86580
    */

var script_file = File($.fileName); // get the location of the scriptfile

var script_file_path = script_file.path; // get the path

// var file_to_read = File(script_file_path + "/testfile.txt"); // this could be reading a textfile
var file_to_read = File(script_file_path + "/JSONString.json"); // but we want JSON
var my_JSON_object = null; // create an empty variable
//  alert(file_to_read); // This could be interesting
var content; // this will hold the String content from the file
if(file_to_read != false){// if it is really there
      file_to_read.open('r'); // open it
      content = file_to_read.read(); // read it
      // !Achtung! eval is evil 
      // Improper use of eval opens up your code for injection attacks
      // http://stackoverflow.com/a/86580
      my_JSON_object =  eval("{"+ content + "}");// now evaluate the string from the file
      
      alert(my_JSON_object.length); // if it all went fine we have now a JSON Object insted of a string call length
      file_to_read.close(); // always close files after reading
      }else{
      alert("Bah!"); // if something went wrong
}
