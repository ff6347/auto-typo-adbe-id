---
layout: singlepage
title: felix and prak highlight
---
#![AVATAR](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/felix_prak/felix_prak.png) Hi,  
we are Felix Harle and Prak Piakot, both design students at FH Potsdam (Felix interface- and Prak product design).  
###[highlight](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/felix_prak/highlight.jsx)  

![TEASER](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/felix_prak/highlight_teaser_fp.png)  
We set as our goal to create a script that uses highlight data as input (different people, same text) and outputs a visualization of it in the context of the original text in one InDesign document.  
Basically, the script creates a text frame for each highlight and sets it's opacity to a low level. All these text frames are then stacked over each other, which results in adjoining transparencies in places that were highlighted by more than one person.
Launch [the script](https://raw.github.com/fabiantheblind/auto-typo-adbe-id/master/felix_prak/highlight.jsx) to see our result or follow these steps to build your own visualization:  

1. Gather some markdown documents containing your text and the highlights (represented by bold text)  
2. Convert them into HTML using [this tool by Daring Fireball](http://daringfireball.net/projects/markdown/dingus)
(just paste the markdown content of your documents underneath each other in the same box and click "Convert")  
3. Copy the HTML output and paste it into our custom built tool below to extract the highlight data for use in InDesign  
4. Copy the output of our tool and paste it into the marked area in highlight.jsx (make sure to replace the text we used with the one you want to use as well)  
5. Save and run to get the visualization  
  
<div id="toarray_wrap">
    <style type="text/css">
    #toarray_wrap {
    max-width: 620px;
    margin: 0 auto;
    font: normal 100% "Helvetica Neue", sans-serif;
    line-height: 21px;
}
#toarray_ul {
    display: none;
    font-family: monospace;
    background-color: rgba(193,213,250,0.8);
    padding: 5px 10px 6px 10px;
    margin: 14px 0 10px 0;
    list-style: none;
}
#toarray_textarea {
    width: 100%;
    line-height: 21px;
    font-size: 16px;
    font-family: "Helvetica Neue", sans-serif;
    color: #333;
    margin: 20px 0 5px 0;
    padding: 1.5%;
}
#toarray_button {
    margin: 0 0 10px 0;
}
#toarray_button span {
    padding: 0 4px 0 4px;
}
#mdcontent {
    display: none;
}
</style>
    <textarea id="toarray_textarea" rows="14" cols="80" placeholder="Paste HTML here">
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna <strong>aliqua</strong>. Ut enim ad minim veniam, quis nostrud <strong>exercitation</strong> ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute <strong>irure</strong> dolor in <strong>reprehenderit</strong> in voluptate velit esse cillum dolore eu fugiat nulla <strong>pariatur</strong>. Excepteur sint <strong>occaecat</strong> cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </textarea>
    <button id="toarray_button"><span>Extract Highlight Data</span></button>
    <div id="mdcontent"></div>
    <ul id="toarray_ul" >
        <li>var highlight_data =  [];</li>
    </ul>
</div>

<script type="text/javascript">
$("#toarray_textarea").keyup(function () {
    var value = $(this).val();
    $("#mdcontent").append(value);
}).keyup();
$("#toarray_button").click(function() {
    $("#mdcontent p").contents().unwrap();
    var count = $("#mdcontent strong").length;
    var highlight = [];
    for (var i = 1; i <= count; i++) {
        highlight[i-1] = $("strong:nth-child(" + i + ")").text();
    }
    for (var j = 0; j < highlight.length; j++) {
        $("#toarray_ul").append("<li>highlight_data[" +j+ "] = " + "&quot" + highlight[j] + "&quot" + "&#59;</li>");
    }
    $("#toarray_ul").css({display: "block"});
});
</script>




###Note  

A lot of copy and paste: sorry for that! Building a whole dynamic system unfortunately is beyond our scope and clearly wasn't the goal of this course. But the idea itself has potential in our opinion: think of a button on the new york times web version that enables "Highights" and visualizes the parts of the text that the 200 people who read the piece before you have found important. Time saved.

You can also clone the jQuery widget with [Git](http://git-scm.com) by running:  

{% highlight sh %}
git clone git://gist.github.com/3923596.git gist-3923596
{% endhighlight %}  

###License  

This work is licensed under the Creative Commons Namensnennung-Nicht-kommerziell 3.0 Unported License.  
To view a copy of this license, visit [creativecommons.org/licenses/by-nc/3.0/](creativecommons.org/licenses/by-nc/3.0/)  

Copyright (C) 2012 Felix Harle, Prak Piakot  
Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.  