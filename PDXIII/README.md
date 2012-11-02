FontFunFriday
=============


#![AVATAR][PDXIII-Avatar] Hello!

I am [PDXIII](http://about.me/PDXIII) & and this is

###Font Fun Friday!
![FFF-Title][FFF-Title]
####A Adobe Indesign script for font nerds.


###What's that all about?
When you scribble a font, you quickly come to a point where you need a base line or a guide for the x height and for the descenders …
But where to place them? This decision takes big influence on the whole font design. So why don't you check out the guides of some famous fonts?
This script creates a small booklet with the metrics of 22 fonts and for each font 96 fields for 96 characters (which is a little more than a German basic keyboard layout).

###Install this script
Clone thie repository int your `~/Library/Preferences/Adobe InDesign/Version 7.5/en_GB/Scripts/Scripts Panel/` folder or download the zipped files and unzip them to this location.

###Data Sources
There are three files which provied data. The script depends on *GlyphList-Unicode.json* and *FontList.json*. But first let's take a look on the file where everthing started:

####GlyphList.txt
This files contains 96 characters separated by a break row (or '\r'). The original file contains: *a, ä, b, c, d, e, f, g, h, i, j, k, l, m, n, o, ö, p, q, r, s, t, u, ü, v, w, x, y, z, ß, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ,, ., -, `, +, #, ^, @, A, Ä, B, C, D, E, F, G, H, I, J, K, L, M, N, O, Ö, P, Q, R, S, T, U, Ü, V, W, X, Y, Z, ?, !, ", §, $, %, &, /, (, ), =, ;, :, _, backtick, * , ', °, €.*
The first 48 will be displayed on the left side of the booklet, the other on the right side.

And looks like this:

    a
    ä
    b
    c
    … (the other 91 characters)
    €

**Note: If you change these characters, please be sure to have 96, because the layout is optimized for this amount!**

When you have done any changes in this file you need to format it into an *.json* file and add the unicode information for each character. Have fun! Just kidding. For god sake I wrote the python script *ConvertToUnicodeIntoJSON.py*. So open a terminal, change directory to `~/Library/Preferences/Adobe InDesign/Version 7.5/en_GB/Scripts/Scripts Panel/FontFunFriday/`
(be careful: the 'en_GB' depends on the language of your version of Indesign, would be 'de_DE' if you run a German version on your system) and type in `python ConvertToUnicodeIntoJSON.py` and the *.txt* is parsed into a *.json* file with all the additional information under the name *GlyphList-Unicode.json*.

####GlyphList-Unicode.json
In the last chapter you read how to generate this file, but what's inside? 

Let's have a look:

    [
      {
        "glyph": "a",
        "name": "LATIN SMALL LETTER A",
        "number": "0061"
      },
      {
        "glyph": "ä",
        "name": "LATIN SMALL LETTER A WITH DIAERESIS",
        "number": "00e4"
      },
      … (I think you'll get the point)
      {
        "glyph": "€",
        "name": "EURO SIGN",
        "number": "20ac"
      }
    ]

**Note: If you edit this file, don't destroy the .json format. If this happends only god can save you! Naw, just run the python script from the last chapter.**

####FontList.json
In this file keeps the fonts with their metrics information. This collection contains the information of these fonts: *Aachen Std, Adobe Garamond Pro, Andale Mono, Arial, Berthold Akzidenz Grotesk BE, Bickham Script Pro, Comic Sans MS, Cooper Std, Courier New, Georgia, Helvetica Neue, ITC Avant Garde Gothic Std Medium, Impact, Livory Regular, Meslo LG L DZ, Myriad Pro, Neutra Text, Novel Pro, Rooney Regular, Times New Roman, Trajan Pro.*

Take a look:

    [
      {
        "FontName": "Aachen Std", 
        "HkxpArray": [
          1.0, 
          1.0, 
          0.73512252042006998, 
          -0.26371061843640609
        ]
      }, 
      {
        "FontName": "Adobe Garamond Pro", 
        "HkxpArray": [
          1.0, 
          1.0784313725490196, 
          0.59879336349924583, 
          -0.38914027149321267
        ]
      }, 
      … (Yes, here are more fonts!)
      {
        "FontName": "Trajan Pro", 
        "HkxpArray": [
          1.0, 
          0.84993359893758302, 
          0.84993359893758302, 
          -0.0039840637450199202
        ]
      }
    ]

There are two ways to make your own *FontList.json*. 

1.    You open the font of your choice in the font editor software of your choice or you can try Adobe Illustrator. Then messure the height of the *H, k and x* and the lowest point of *p*. Then divide every value through the height of *H* and put these values into the `HkxpArray`.

2.    You open your full version of [Glyphs App](http://glyphsapp.com) clone my [Glyphs-Scripts Repository](https://github.com/PDXIII/Glyphs-Scripts) into your Glyphs script folder under `~/Library/Application Support/Glyphs/Scripts/` open all the fonts you want the metrics from and run the *ExportHkxpMetrics.py* script. It exports all the metrics the way it should be into a file on your desktop named *Metrics.json*. All need to do in addition is to rename it into *FontList.json* and move it into your `~/Library/Preferences/Adobe InDesign/Version 7.5/en_GB/Scripts/Scripts Panel/FontFunFriday/` folder.

The second way has a longer discription but is the faster way (and requires a full version of [Glyphs App](http://glyphsapp.com)).

###Open Adobe Indesign and run the script
I am sure you know how! If you copied or cloned the repository into the right folder, it will appear in your skript panel under *FontFunFriday.jsx*. A doubleclick will start the script.

###Unicode Information
![dialog][dialog]

After starting the script a pop up will appear asking how you like the unicode information should be displayed. There are two options:

![tile1][tile1]

1.    `a u+00061` will make a tile for scribbling for every character in the GlyphList with the character itself and the unicode number below. 

![tile2][tile2]

2.    `latin small letter a` will make a tile for scribbling, too, but puts the unicode name inside this tile. 

Try them both! 

###Grid & Masterspreads
![grid][grid]

In the first seconds while the script is running you can see how the scribble tiles are buid and placed on the page. The grid contains 6 columns and 8 rows. The size of the whole tile (inclusive the textboxes below) is 23 x 20 mm. The margins are given the gutter is calculated. There are two masterspreads. One with just the margins *Master-A* and a second one containing the tiles *Master-B*.

**Note: Feel free to change the values in the script and try out your own layout, but be awear that my layout is optimized for this given amout of characters.**

##Lines and Metrics Information
After the masters are finished, the script reads the *FontList.json* and makes for each font two facing pages with a whole set of scribble tiles (using *Master-B*). It reads the *HkxkArray* of the current font and calculates the vertikal positions of the guide lines.

####The HkxpArray
![metrics][metrics]

I already mentioned how to calculate the values for the *HkxpArray*, but let's digg a little deeper.

When I first thought about getting the metrics out of a font, I wrote a Glyphs App script ([ExportBasicMetrics.py](https://github.com/PDXIII/Glyphs-Scripts#exportbasicmetricspy)), which exports the metrics from Glyphs' font information window. Which is a kind of tricky in several points:

1.    The values are absolute. Let's take look on the Mariad Pro. This font's metrics look like this `ascender: 750.0, capital height: 674.0, x height: 484.0, descender: -250.0`.
All values describe the vertical position on a 1.000 pt high work area. Though, when you want to use these values for guide lines on work area with a different height, you need to set them into relation to each other.

2.    Some true type fonts (.ttf) seem to have a work area around 2.000 pt e.g. 
`Arial: ascender: 1491.0, capHeight: 1467.0, xHeight: 1062.0, descender: -431.0`.

3.    Some true type fonts seem to have a work area around 1.000 pt but the ascenders was designed on a 2.000 pt work area e.g. 
`Georgia: ascender: 1549.0, capHeight: 700.0, xHeight: 500.0, descender: -444.0`.

4.    The descender value is usually not the vertical position of the lowest point in a descender character, it's even below this point.

I hope you see the problem! The data we will get this way is not consistent. We need to put them in relation, and the escaping desender value is a real fuck up!

Solving the relation problem I used a format I found in an old photo type catalog from [Berthold](http://de.wikipedia.org/wiki/H._Berthold_AG). They described like this `Berthold Akzidenz Grotesk BE: H: 1, k: 0.998, 0.666, -0.315`. They set every value into relation to the height of *H*. That was what I needed and I preferre using a historical and typographical format instead of inventing my own which serves the same purpose.

For the other part of the problem I decided the best way of doing it is to messure on my own. And because of I am some lazy guy I wrote the script [ExportHkxpMetrics.py](https://github.com/PDXIII/Glyphs-Scripts#exporthkxpmetricpy) wich takes care of the messurment and calculation.

That's the story behind the *HkxpArray*!

###Styles
![masters][masters] ![paraStyles][paraStyles] ![objectStyles][objectStyles]

When the script is finished you'll have a document with 44 pages. One for the front and one for the back with *Master-A* applied and 42 with *Master-B* applied for scribbling containing the guide lines. When you take a look at the style palettes you'll see that avery kind of object or paragraph has some kind of style applied. Though it's quite easy to change the apperence of your document. If you want another font for your layout, then just make changes in the paragraph stlye *BasicFontStyle*. I tried to keep the basic style simple and undistractive. 

Feel free to find your own solution
**& have a Fun Font Friday!**

###Thanx!
+    [fabiantheblind](https://github.com/fabiantheblind/auto-typo-adbe-id) for this lection!
+    ["ScriptUI for dummies"](http://www.kahrel.plus.com/indesign/scriptui.html) by Peter Kahrel.
+    [Glyphs App](http://glyphsapp.com) for being scriptable and beautiful.
+    [schriftgestalt](https://github.com/schriftgestalt) for example scripts for Glyphs App.
+    [mekkablue](https://github.com/mekkablue) for example scripts for Glyphs App, too.

###License

Copyright (c) 2012 Peter Sekan aka PDXIII

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[FFF-Title]: https://raw.github.com/PDXIII/FontFunFriday/gh-pages/assets/images/teaser/FFF-Title.png
[PDXIII-Avatar]: https://raw.github.com/fabiantheblind/auto-typo-adbe-id/gh-pages/assets/images/avatar/PDXIII.png 
[dialog]: https://raw.github.com/fabiantheblind/auto-typo-adbe-id/gh-pages/assets/images/additional/dialog.png
[metrics]: https://raw.github.com/fabiantheblind/auto-typo-adbe-id/gh-pages/assets/images/additional/metrics.png
[tile1]: https://raw.github.com/fabiantheblind/auto-typo-adbe-id/gh-pages/assets/images/additional/tile1.png
[tile2]: https://raw.github.com/fabiantheblind/auto-typo-adbe-id/gh-pages/assets/images/additional/tile2.png
[grid]: https://raw.github.com/fabiantheblind/auto-typo-adbe-id/gh-pages/assets/images/additional/grid.png
[masters]: https://raw.github.com/fabiantheblind/auto-typo-adbe-id/gh-pages/assets/images/additional/masters.png
[objectStyles]: https://raw.github.com/fabiantheblind/auto-typo-adbe-id/gh-pages/assets/images/additional/objectStyles.png
[paraStyles]: https://raw.github.com/fabiantheblind/auto-typo-adbe-id/gh-pages/assets/images/additional/paraStyles.png
