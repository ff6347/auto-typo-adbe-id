// mediaqueries.js
// written by fabiantheblind

// Copyright (c)  2012 
// Fabian "fabiantheblind" Morón Zirfas  
// Permission is hereby granted, free of charge, to any 
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to 
// whom the Software is furnished to do so, subject to 
// the following conditions:  
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.  
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

// see also http://www.opensource.org/licenses/mit-license.php


$(window).resize(fit());

$(window).ready(fit());

  function fit(){
  var ww = $(window).width();
  var sz1 = 480;/* Landscape phones and down*/
  var sz2 = 767; /* Landscape phone to portrait tablet */
  var sz3 = 979; /*Portrait tablet to landscape and desktop*/
  var sz4 = 1200; /* Large desktop*/
  
  if(ww < sz1 ){ 
    /* Landscape phones and down*/
    $("#getSize1").removeClass().addClass("row-fluid");
    $("#getSize2").removeClass().addClass("span11");

  }else if(ww > sz1 && ww <  sz2){
    /* Landscape phone to portrait tablet */
    $("#getSize1").removeClass().addClass("row-fluid");
    $("#getSize2").removeClass().addClass("span11");

  }else if(ww > sz2 && ww < sz3 ){
    /*Portrait tablet to landscape*/
    $("#getSize1").removeClass().addClass("row");
    $("#getSize2").removeClass().addClass("span11 offset1");

  }else if(ww > sz3 && ww < sz4 ){

    /* tablet landscape to desktop*/
    $("#getSize1").removeClass().addClass("row");
     $("#getSize2").removeClass().addClass("span8");

  }else if(ww > sz4){
     /* Large desktop*/
    $("#getSize1").removeClass().addClass("row");
    $("#getSize2").removeClass().addClass("span8");

  }; 
    
  };

