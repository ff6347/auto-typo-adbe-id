# -*- coding: iso-8859-1 -*-
import unicodedata

gl = open('GlyphList.txt')

string = str(gl.read())
string = unicode(string, 'utf-8')

gl.close()
glyphs = string.split()

# print glyphs

try:
	# This tries to open an existing file but creates a new file if necessary.
	gl_unicode = open('GlyphsList-UniCode.json', 'w')
except IOError:
	pass

glyphObjects= []
for glyph in glyphs:

	if glyph.encode('utf-8') == '"':
		character = '\t\t"glyph": "\\"",\n'
	else:
		character = '\t\t"glyph": "%s",\n' % glyph.encode('utf-8')
	name = '\t\t"name": "%s",\n' % unicodedata.name(glyph)
	num = '\t\t"number": "%04x"\n' % ord(glyph)

	glyphObject = '\n\t{\n%s%s%s\t}'%(character, name, num)
	glyphObjects.append(glyphObject)

	# if glyphs[glyph] < len(glyphs):
	# 	gl_unicode.write(',\n')

gl_unicode.write('[%s\n]' % ','.join(glyphObjects))

gl_unicode.close()