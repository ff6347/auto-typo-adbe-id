# gallery.rb
# jekyll plugin
# this code creates the inner image list for twitter-bootstrap carousel
 
# found here
# https://groups.google.com/forum/?fromgroups=#!topic/jekyll-rb/Z0LZuPxUsy0
 
# first filter
# http://twitter.github.com/bootstrap/javascript.html#carousel
# needs bootstrap-carousel.js
# needs bootstrap-transition.js
#
# you have to embed it into your files with a liquid filter matter like this

# <div id="myCarousel" class="carousel slide">
#     <div class="carousel-inner">
#         {{ '' | gallery }}
#     </div>
#     <a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>
#     <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>
# </div>  
#
# place your files in assets/images/slideshow/


# second filter uses lightbox2.
#
# http://lokeshdhakar.com/projects/lightbox2/
#
# call it like this {{ 'assets/images/lightbox/*.png'| lightboxgallery : 'lightbox[group]' : 'lightbox/thumbs' : 'thumbnails', 'span2'}}


# it generates code that looks like this

# div class="span2" id="thumbnails">
# <a href="assets/images/lightbox/example-00.png" rel="lightbox[group]" title="">
# <img src="assets/images/lightbox/thumbs/example-00.png"  alt="" /></a>
# </div>
# <div class="span2" id="thumbnails">
# <a href="assets/images/lightbox/example-01.png" rel="lightbox[group]" title="">
# <img src="assets/images/lightbox/thumbs/example-01.png"  alt="" /></a>
# </div>
# <div class="span2" id="thumbnails">
# <a href="assets/images/lightbox/example-02.png" rel="lightbox[group]" title="">
# <img src="assets/images/lightbox/thumbs/example-02.png"  alt="" /></a>
# </div>
# <div class="span2" id="thumbnails">
# <a href="assets/images/lightbox/example-03.png" rel="lightbox[group]" title="">
# <img src="assets/images/lightbox/thumbs/example-03.png"  alt="" /></a>
# </div>


module Jekyll
	module Filters
		def gallery(input)
			output = ''
			Dir.glob(input).each {
				|i| output << "<div class=\"item\">
				<img src=\"#{i}\" alt=\"SLIDESHOW\" >
      			</div>"
			}
			output
		end
		
		def lightboxgallery(path, rel, pathreplace, id, span)
			output = ''
			for s in Dir.glob(path)
				t = s.dup
				#t["lightbox"] = "lightbox/thumbs"
				s["lightbox"] = "#{pathreplace}"
				output << "<div class=\"#{span}\" id=\"#{id}\">\n"
				output << "<a href=\"#{t}\" rel=\"#{rel}\" title=\"\">\n"
				output << "<img src=\"#{s}\"  alt=\"\" /></a>\n"
      			output << "</div>\n"
      		end
			output
		end

	end
end