![AVATAR](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/avatar_500x500px.png)
#Hello  
my name is Flavio / [Flave](https://github.com/flave). I’m an Interface Design Student at FH Potsdam.  
  
###Get_Text_Data.jsx  


![TEASER IMAGE](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Get_Text_Data.png)
This Script takes a Textfile and creates a Datafile from its content. The Datafile contains the Number of characters, Number of different punctuation marks (Dots, commas, quotes, colons, questionmarks, exclamationmarks and ellipsises) and an array of Wordlengths for each Sentence. Sadly the Datafile is not an actual JSON file. The toSource() function adds strange parentheseses around each Object. So for further use you will have to remove these parentheseses manually - or with the «find and replace» function of a texteditor. Also if you want to use the Datafile with one of my other Scripts you'll have to rename the Dataobject in the Datafile to data_one or data_two.  
[Get_Text_Data](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Get_Text_Data.jsx)  

###Simple_Barchart.jsx

![TEASER IMAGE](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Simple_Barchart.png)
This script takes two datafiles (created with the Get_Text_Data.jsx script and editedmas described). They are included with an #include. If you generate your own datafiles you’ll have to change the filenames at the #include tag to your own files name.  From its data it creates two facing horizontal barcharts. Each Bar represents the number of characters of one sentence.  
[Simple_Barchart](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Simple_Barchart.jsx)  

###Words_Barchart.jsx

![TEASER IMAGE](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Word_Barchart.png)
This script basicslly does the samething as the Simple_Barchart.jsx script. In addition the bars consist of stacked bars each representing the length of one word in the sentence.  
[Words_Barchart](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Words_Barchart.jsx)  

###Punctuation.jsx

![TEASER IMAGE](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Punctuation.png)
This script also takes two datafiles. It uses the punctuation data to create a sorted collection of all the dots, commas, quotaion marks, and colons. The graphics for the punctuation are small images (2mm x 2mm) which have to be placed in the ~/Application/Indesign/Scripts/Script Panel/*  folder.  
[Punctuation](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Punctuation.jsx)  
  
###Simple_Barchart_plus.jsx  

![TEASER IMAGE](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Simple_Barchart_plus.png)
This Script combines the Simple_Barchart and the Punctuation. It places the Punctuation below the Barchart.  
[Simple_Barchart_plus](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Simple_Barchart_plus.jsx)  

###Punctuation_Barchart_Plus.jsx

[TEASER IMAGE](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Punctuation_Barchart_Plus.png)
This Scipt basically does the same as the Simple_Barchart_Plus.jsx. In addition it  places the Punctuation of each Phrase right behind its bar.  
[Punctuation_Barchart_Plus](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/Flave/Punctuation_Barchart_Plus.jsx)  

###misc  
 
Fell free to contact me if you have any suggestions for improvement pr tips on my bad and messy programming skills!  


###License  

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) 2012 USER NAME <flaviogortana@gmail.com>  
Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.  

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE  
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION  
http://sam.zoy.org/wtfpl/  

`0. You just DO WHAT THE FUCK YOU WANT TO.  

