  /*
  a basic find and change script not using fc queries
  */
  
  /*
  This is the text we are going to change
  look at the fnords
  
  */
  var the_text_to_change = "An einem Morgen später Regenfällefnord\r"+
                              "kam Sierva María de Todos los Ángelesfnord\r"+
                              "im Zeichen des Schützen als Siebenmonatskind\r"+
                              "recht und schlecht auf die Welt.fnord\r "+
                              "fnordSie erinnerte an eine farblose Kaulquappe\r"+
                              "und wäre fast von der um den Hals gewickelten Nabelschnur\r"+
                              "stranguliert worden.";
  var ph = 150;
  var pw = 150;
  var doc = app.documents.add({
    documentPreferences:{
      pageHeight:ph,
      pageWidth:pw
    }
  }); // create a doc
  
  var tf = doc.pages.item(0).textFrames.add({
      /* Make a textframe in the first page with that text */
      geometricBounds:[12.7,12.7,ph - 12.7, pw - 12.7],
      contents: the_text_to_change,
              textFramePreferences:{
            verticalJustification: VerticalJustification.CENTER_ALIGN
            }
  });
  

var all_paragraphs = tf.paragraphs.everyItem(); // get the first paragraph
// set some properties
all_paragraphs.properties = {
                pointSize: 23,
                justification : Justification.CENTER_ALIGN,
                hyphenation : false
                };
  
  
  app.findTextPreferences = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
  app.changeTextPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!
  
      // some settings
      app.findChangeTextOptions.includeFootnotes = true;
      app.findChangeTextOptions.includeHiddenLayers = false;
      app.findChangeTextOptions.includeLockedLayersForFind = false;
      app.findChangeTextOptions.includeLockedStoriesForFind = true;
      app.findChangeTextOptions.includeMasterPages = true;

          // this is like entering the find what text in the UI
          app.findTextPreferences.findWhat = "fnord";
          // this is like entering text in the change to
          //app.changeTextPreferences.changeTo = "";
          // but you can also set some properties
          // have a look at this
          // http://jongware.mit.edu/idcs6js/pc_ChangeTextPreference.html
          app.changeTextPreferences.underline = true;
          app.changeTextPreferences.pointSize = 5;
          app.changeTextPreferences.fillTint = 42;
          // and now hit the button
          doc.changeText();
          
          app.findTextPreferences = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
          app.changeTextPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!
  // we are done
