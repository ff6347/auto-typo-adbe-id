    /*
    author: @fabiantheblind
    
    This is text analysis the InDesign way.
    It uses the InDesign Find And Change Options
    
    */


main();
function main(){
  // create doc, get page, add textframe
    var the_text_to_analyse = "Ich bin Blindtext. Von Geburt an.\r"+
    "Es hat lange gedauert, bis ich begriffen habe,\r"+
    "was es bedeutet, ein blinder Text zu sein:\r"+
    "Man macht keinen Sinn. Man wirkt hier und da aus dem Zusammenhang gerissen.\r"+
    "Oft wird man gar nicht erst gelesen.\r"+
    "Aber bin ich deshalb ein schlechter Text?\r"+
    "Ich weiß, dass ich nie die Chance haben werde im Stern zu erscheinen.\r"+
    "Aber bin ich darum weniger wichtig? Ich bin blind!\r"+
    "Aber ich bin gerne Text.\r"+
    "Und sollten Sie mich jetzt tatsächlich zu Ende lesen,\r"+
    "dann habe ich etwas geschafft, was den meisten \"normalen\" Texten nicht gelingt.\r"+
    "Ich bin Blindtext. Von Geburt an.\r"+
    "Es hat lange gedauert, bis ich begriffen habe, was es bedeutet, ein blinder Text zu sein:\r"+
    "Man macht keinen Sinn. Man wirkt hier und da aus dem Zusammenhang gerissen.\r"+
    "Oft wird man gar nicht erst gelesen. Aber bin ich deshalb ein schlechter Text?\r"+
    "Ich weiß, dass ich nie die Chance haben werde im Stern zu erscheinen.\r"+
    "Aber bin ich darum weniger wichtig? Ich bin blind!\r"+
    "Aber ich bin gerne Text.\r"+
    "Und sollten Sie mich jetzt tatsächlich zu Ende lesen, dann habe ich etwas geschafft,\r"+
    "was den meisten \"normalen\" Texten nicht gelingt. Ich bin Blindtext.";

  var doc = app.documents.add();
  var page = doc.pages[0];
  var docpref = doc.documentPreferences; // these are the prefs
// some values
  var pw = 200; 
  var ph = 200;
  // set the doc size
 docpref.pageWidth = pw;
 docpref.pageHeight = ph;
// make a textframe
  var tf = page.textFrames.add({geometricBounds:[12.7,12.7,ph-12.7,pw-12.7]});
  
  // add some placeholder text
  tf.contents = the_text_to_analyse;

  /*
  It is important to empty the Find Chagne fields of the interface
  */
  app.findTextPreferences = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
  app.changeTextPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!
  // some settings for FC
  app.findChangeTextOptions.includeFootnotes = true;
  app.findChangeTextOptions.includeHiddenLayers = false;
  app.findChangeTextOptions.includeLockedLayersForFind = false;
  app.findChangeTextOptions.includeLockedStoriesForFind = true;
  app.findChangeTextOptions.includeMasterPages = true;

  // app.findChangeTextOptions.properties = {
  //     includeFootnotes : true,
  //     includeHiddenLayers : false,
  //     includeLockedLayersForFind : false,
  //     includeLockedStoriesForFind : true,
  //     includeMasterPages : true
  // };


var result_list = new Array(); // this will hold our result
/*
  loop the words
  we get the result and push it into an object
  than we remove all results so they dont get a double count
*/
  for(var i = 0; i < tf.words.length;i++){
      var a_single_word = tf.words[i].contents; // get the word for better handling

      app.findTextPreferences.findWhat = a_single_word; // fill in the serach term
      app.changeTextPreferences.changeTo = "";//after we counted the words we remove them

      var result = doc.findText(); // now execute the FC

      // we push the word and the count of it into an
      // JSON OBJECT
      result_list.push({
        "word":a_single_word,
        "count":result.length
      });
      doc.changeText();
      app.findTextPreferences = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
      app.changeTextPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!
  }; // end loop

result_list.sort(compare); // this is deep JS stuff
var word_num = result_list.length;
// alert(result_list.toSource());

// Give back the result in a nice fashion
alert(
  "You have " + word_num +" words in your text.\n" +
  "The five top words are:\n"+
  "Number 5: "+ result_list[word_num - 5].word + " - " + result_list[word_num -5].count +"\n"+
  "Number 4: "+ result_list[word_num - 4].word + " - " + result_list[word_num -4].count +"\n"+
  "Number 3: "+ result_list[word_num - 3].word + " - " + result_list[word_num -3].count +"\n"+
  "Number 2: "+ result_list[word_num - 2].word + " - " + result_list[word_num -2].count +"\n"+
  "Number 1: "+ result_list[word_num - 1].word + " - " + result_list[word_num -1].count +"\n"+
  "Amazing. Isn't it?"
  );

// you could just copy paste this alert into another file 
// have a look how to include a file in here
// https://github.com/fabiantheblind/auto-typo-adbe-id/wiki/Includes
//  alert("var data = " + result_list.toSource());


} // end main function



// this is deep Javascript Stuff 
// you can write your custom comparator 
// read this Stackoverflow post
// http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript
function compare(a,b) {
  if (a.count < b.count)
     return -1;
  if (a.count > b.count)
    return 1;
  return 0;
}

