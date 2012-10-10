    /*
    author: @fabiantheblind
    With styles you can controll your text
    this script has to be saved somewhere or this wont work
    It loads itself to build some syntax highlighted text
    The syntax highlite is rough and not rock solid but it gives a look into nested GREP styles
    */


main();
function main(){

    // make a doc
    var pw = 210;
    var ph = 500;
    var doc = app.documents.add({
  documentPreferences:{
      pageWidth:pw,pageHeight:ph
      }
  });

    // build a style with nested grep styles
    var code = build_code_paragraphStyle (doc);
    // get the page
    var page = doc.pages[0];
    // make a frame
    var tf = page.textFrames.add({geometricBounds:[10,10,ph-10,pw-10]});
// load the content of the script

var scriptfile = File($.fileName);
alert(scriptfile);
var content;
if(scriptfile != false){
    scriptfile.open('r');
    content = scriptfile.read();
    }else{
    alert("Bah!");    
    }

    // add the content to the frame
    tf.contents  = content;
    scriptfile.close(); // always close files after reading
    // apply the style
    tf.paragraphs.everyItem().appliedParagraphStyle = code;

	}


// build a lot of styles
function build_code_paragraphStyle(d){
var charStyles = new Array();
var keywords = d.characterStyles.add({name:"keywords",fillColor:d.swatches.item(5)});
var comments = d.characterStyles.add({name:"comments",fillColor:d.swatches.item(3),fillTint: 70});
var operators = d.characterStyles.add({name:"operators",fillColor:d.swatches.item(7)});
var separators = d.characterStyles.add({name:"separators",fillColor:d.swatches.item(8)});
var numbers = d.characterStyles.add({name:"numbers",fillColor:d.swatches.item(9)});
var comment = d.characterStyles.add({name:"comment",fillColor:d.swatches.item(9)});
var string = d.characterStyles.add({name:"strings",fillColor:d.swatches.item(5)});


var code = d.paragraphStyles.add({name:"code",appliedFont:"Andale Mono",pointSize:10});
//change language (only in the paragraphStyle) to get the right "" for the code
		code.appliedLanguage = app.languagesWithVendors.item("English: USA");
        // do some nested grep styles
    var grp = code.nestedGrepStyles.add();
        grp.appliedCharacterStyle = keywords;
        grp.grepExpression = "abstract|boolean|break|byte|case|catch|char\ |class|const|continue|debugger|default|delete|do\ |double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in\ |instanceof|int\ |interface|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with";
        
        grp = code.nestedGrepStyles.add();
        grp.appliedCharacterStyle = operators;
        grp.grepExpression = "is|new|sizeof|typeof";
        
        grp = code.nestedGrepStyles.add();
        grp.appliedCharacterStyle = operators;
        grp.grepExpression = "[-~\\[\\]!$%&*+/:<=>?^|]+";
        
        grp = code.nestedGrepStyles.add();
        grp.appliedCharacterStyle = separators;
        grp.grepExpression = "[(){},;\\s]+";
        
        grp = code.nestedGrepStyles.add();
        grp.appliedCharacterStyle = numbers;
        grp.grepExpression = "\\<[0-9]+(\\.[0-9]+)?([eE][-+]?[0-9]+)?";
        
        grp = code.nestedGrepStyles.add();
        grp.appliedCharacterStyle = comments;
        grp.grepExpression = "/\\*+[^*]*\\*+([^/*][^*]*\\*+)*/";        
        
        
        grp = code.nestedGrepStyles.add();
        grp.appliedCharacterStyle = comment;
        grp.grepExpression = "//.*";        
        
        grp = code.nestedGrepStyles.add();
        grp.appliedCharacterStyle = string;
        grp.grepExpression = "\".*?\"";           
        
return code;        
        }