    /*
    author: @fabiantheblind
    This script shows how to create master spreads
    
    
    */
// lets create some masterspreads
var doc = app.documents.add();
  var master_spread1 = doc.masterSpreads.item(0).pages.item(0);// edit the masterspreads
   
      master_spread1.marginPreferences.properties = {
          right: 12.7,
          top:12.7 ,
          left:12.7 ,
          bottom:12.7,
          columnGutter:5,
      };  
  
  var master_spread2 = doc.masterSpreads.item(0).pages.item(1);//edit the other masterspred
  
      master_spread2.marginPreferences.properties = {
          right: 12.7,
          top:12.7 ,
          left:12.7 ,
          bottom:12.7,
          columnGutter:5,
      };  
  
master_spread1.marginPreferences.columnCount = 5;
master_spread2.marginPreferences.columnCount = 5;

doc.pages.item(0).appliedMaster = doc.masterSpreads.item(0);
 