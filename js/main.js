$(function() {

    var lines = [ "KEEP", "CALM", "AND", "CARRY", "ON" ];
    var maxLineLength = 0;
    var nbLines = lines.length;
    var marginPct = 10;
    var marginWidth = 0;
    var marginHeight = 0;
    var interLine = 0; // fixme
    var interLetter = 0; // fixme
    var pageWidth = $(window).width();
    var pageHeight = $(window).height();

    var params = [ "bg", "fg", "typeface", "graphic" ];

    // var WebFontConfig = {
    //     google: { families: [ 'Raleway:800:latin' ] }
    // };

    WebFont.load({
        google: { families: [ 'Raleway:800:latin' ] }
    });

    for (var j = 0; j < lines.length; j++) {
        var param = $.url().param((j + 1).toString());
        
        if (param) {
            lines[j] = param.toUpperCase();
        }

        $(".kc")
            .eq(j)
            .html(lines[j]);

        // Whitespace is counted as a letter
        maxLineLength = Math.max(lines[j].length, maxLineLength);
    }

    //var style = window.getComputedStyle($(".kc").eq(0)[0], null).getPropertyValue('font-size');
    //var fontSize = parseFloat(style);

    var marginWidth = pageWidth * marginPct / 100;
    var marginHeight = pageHeight * marginPct / 100;

    // Decide how tall the crown will be and resize, then include in font size calculation

    var usableWidth = pageWidth - marginWidth * 2 - (maxLineLength - 1) * interLetter;
    var usableHeight = pageHeight - marginHeight * 2 - (nbLines - 1) * interLine;

    var targetFontSize = Math.min(usableWidth / maxLineLength,
                                  usableHeight / nbLines);

    // fixme - need to redo this on page resize
    $("#keep-calm").css("margin-top", marginHeight);
    $(".kc").css("font-size", targetFontSize);
    $(".kc").css("line-height", interLine);

    console.log(screen.width);
    console.log(screen.height);
    console.log($(window).width());
    console.log($(window).height());
    //console.log(fontSize);
    console.log(targetFontSize);
    console.log(maxLineLength);
    console.log(marginWidth);
    console.log(marginHeight);
    console.log(usableWidth);
    console.log(usableHeight);
    console.log(maxLineLength);

});


// WebFontConfig = {
//     google: { families: [ 'Raleway:400,800:latin' ] }
// };

// (function() {
//     var wf = document.createElement('script');
//     wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
//         '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//     wf.type = 'text/javascript';
//     wf.async = 'true';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(wf, s);
// })();
