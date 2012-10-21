![YOUR AVATAR](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/felix_prak/felix_prak.png)
Hi,  
=====
Highlight is a project by Felix Harle and Prak Piakot, both design students at FH Potsdam (Felix interface- and Prak product design).

We set as our goal to create a script that uses highlight data as input (different people, same text) and outputs a visualization of it in the context of the original text in one InDesign document.

Launch the script below to see our result or follow these steps to build your own visualization:

1.  Gather some markdown documents containing your text and the highlights (represented by bold text)
2.  Convert them into HTML using the following tool by Daring Fireball http://goo.gl/6rUzZ
(just paste the markdown content of your documents underneath each other in the same box and click "Convert")
3.  Copy the HTML output and paste it into our custom built tool below to extract the highlight data for use in InDesign

Include widget? https://gist.github.com/3923596
Otherwise please link to http://www.felixharle.com/extract/

4.  Copy the output of our tool and paste it into the marked area in highlight.jsx (make sure to replace the text we used with the one you want to use as well)
5.  Save and run to get the visualization

highlight.jsx
---
![TEASER IMAGE](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/felix_prak/highlight_teaser_fp.png)
Basically, the script creates a text frame for each highlight and sets it's opacity to a low level. All these text frames are then stacked over each other, which results in adjoining transparencies in places, that were highlighted by more than one person.
[link to your script](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/felix_prak/highlight.jsx)

Note  
---  
A lot of copy and paste: sorry for that! Building a whole dynamic system unfortunately is beyond our scope and clearly wasn't the goal of this course. But the idea itself has potential in our opinion: think of a button on the new york times web version that enables "Highights" and visualizes the parts of the text that the 200 people who read the piece before you have found important. Time saved.

License  
---
This work is licensed under the Creative Commons Namensnennung-Nicht-kommerziell 3.0 Unported License.

To view a copy of this license, visit [creativecommons.org/licenses/by-nc/3.0/](creativecommons.org/licenses/by-nc/3.0/)

Copyright (C) 2012 Felix Harle, Prak Piakot
Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.