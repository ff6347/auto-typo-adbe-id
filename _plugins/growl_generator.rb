require 'growl'

module Jekyll
  class GrowlGenerator < Generator
    safe false
    
    def generate(site)
      Growl.notify 'Building...', :title => 'Jekyll'
    end
  end
  
  class Site
    alias jekyll_process process 
    
    def process
      jekyll_process
      Growl.notify 'Build complete', :title => 'Jekyll'
    end
  end
end
