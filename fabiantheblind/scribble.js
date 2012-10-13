var ph = 200;
var pw = 200;

var doc = app.documents.add({
	documentPreferences:{
		pageWidth:pw,
		pageHeight:ph
}});

var tf = doc.pages.item(0).textFrames.add({geometricBounds:[12.7,12.7,ph-12.7,pw - 12.7]});

tf.contents = TextFrameContents.PLACEHOLDER_TEXT;

var par_first_ip = tf.paragraphs.item(0).insertionPoints.item(0);

alert( par_first_ip.constructor.name );

var rect_in_text = par_first_ip.rectangles.add({geometricBounds:[12.7,12.7,20,20]});

rect_in_text.place(File.openDialog("Select at image","*.*",false));

rect_in_text.fit(FitOptions.CONTENT_TO_FRAME);