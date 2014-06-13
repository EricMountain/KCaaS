// todo - implement URL param mode with Angular.  Means revert to auto booting Angular?  JQuery goes, and init code moves into Angular init phases?
// todo - resize dynamically
// todo - suggest full screen display
// todo - colour selection
// todo - alternate graphic
// todo - allow smaller "and" line. autodetect


$(function() {

    var lines = [ "KEEP", "CALM", "AND", "CARRY", "ON" ];
    var maxLineLength = 0;
    var nbLines = lines.length;
    var marginPct = 5;
    var marginWidth = 0;
    var marginHeight = 0;
    var pageWidth = $(window).width();
    var pageHeight = $(window).height();

    var params = [ "bg", "fg", "typeface", "graphic" ];

    for (var j = 0; j < lines.length; j++) {
        var param = $.url().param((j + 1).toString());
        
        if (param) {
            lines[j] = param.toUpperCase();
        }

        //$(".kc")
        //    .eq(j)
        //    .html(lines[j]);

        // Whitespace is counted as a letter
        maxLineLength = Math.max(lines[j].length, maxLineLength);
    }

    ////var style = window.getComputedStyle($(".kc").eq(0)[0], null).getPropertyValue('font-size');
    ////var fontSize = parseFloat(style);

    var marginWidth = pageWidth * marginPct / 100;
    var marginHeight = pageHeight * marginPct / 100;

    var usableWidth = pageWidth - marginWidth * 2; // not needed: - (maxLineLength - 1) * interLetter;
    var usableHeight = pageHeight - marginHeight * 2; // not neede: - (nbLines - 1) * interLine;

    // Decide how tall the crown will be and resize, then include in font size calculation
    var crownPct = 20;
    var crownHeight = usableHeight * 20 / 100;
    $("#crown").attr("height", crownHeight);

    var textUsableHeight = usableHeight - crownHeight;

    var targetFontSize = Math.min(usableWidth / maxLineLength,
                                 textUsableHeight / nbLines);

    // fixme - need to redo this on page resize
    $("#keep-calm").css("margin-top", marginHeight);
    $(".kc").css({"font-size": targetFontSize,
                  "margin-top": 0,
                  "margin-bottom": 0
                 });
    $(".kc").css("line-height", "1em");

    ks = {'font-size': targetFontSize, 'margin-top': 0, 'margin-bottom': 0, 'line-height': '1em'};


    // Some debug stuff
    console.log(screen.width);
    console.log(screen.height);
    console.log($(window).width());
    console.log($(window).height());
    console.log(targetFontSize);
    console.log(maxLineLength);
    console.log(marginWidth);
    console.log(marginHeight);
    console.log(usableWidth);
    console.log(usableHeight);
    console.log(maxLineLength);

    // Bootstrap Angular
    var kcaasApp = angular.module('kcaasApp', []);

    kcaasApp.controller('kcaasCtrl', ['$scope', function($scope) {
        $scope.origText = [{value:"KEEP"}, {value:"CALM"}, {value:"AND"}, {value:"CARRY"}, {value:"ON"}];
        $scope.keepText = $scope.origText;
    
        $scope.change = function(index) {
            $scope.keepText[index].value = $scope.keepText[index].value.toUpperCase();
        };
    }]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['kcaasApp']);
    });

});

