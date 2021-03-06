// todo - resize dynamically
// todo - suggest full screen display
// todo - colour selection
// todo - alternate graphic
// todo - allow smaller "and" line. autodetect
// todo - avoid showing elements until page disposition has been computed (the crown moves, the form too)

$(function() {

    function deepCopy(object) {
        if (typeof object === 'undefined')
            return undefined;

        if (object === null || typeof object !== 'object')
            return object;

        var deepCopyObject = object.constructor();
        for (var key in object)
            if (object.hasOwnProperty(key))
            deepCopyObject[key] = deepCopy(object[key]);

        return deepCopyObject;
    }

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
        // Whitespace is counted as a letter
        maxLineLength = Math.max(lines[j].length, maxLineLength);
    }

    var marginWidth = pageWidth * marginPct / 100;
    var marginHeight = pageHeight * marginPct / 100;

    var usableWidth = pageWidth - marginWidth * 2;
    var usableHeight = pageHeight - marginHeight * 2;

    // Decide how tall the crown will be and resize, then include in font size calculation
    var crownPct = 20;
    var crownHeight = usableHeight * 20 / 100;
    $("#crown").attr("height", crownHeight);

    var textUsableHeight = usableHeight - crownHeight;

    var targetFontSize = Math.min(usableWidth / maxLineLength,
                                  textUsableHeight / nbLines);

    $("#keep-calm").css("margin-top", marginHeight);
    $(".kc").css({"font-size": targetFontSize,
                  "margin-top": 0,
                  "margin-bottom": 0,
                  "line-height": "1em"
    });

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
    var kcaasApp = angular.module('kcaasApp', ['ngRoute']);

    kcaasApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:line1/:line2/:line3/:line4/:line5', { controller: 'kcaasCtrl'});
    }]);

    kcaasApp.controller('kcaasCtrl', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location) {
        $scope.origText = [{value:"KEEP"}, {value:"CALM"}, {value:"AND"}, {value:"CARRY"}, {value:"ON"}];
        $scope.keepText = deepCopy($scope.origText);

        $scope.$routeParams = $routeParams;
        $scope.$route = $route;
        $scope.$location = $location;

        var render = function() {
            if ($routeParams.line1)
                $scope.keepText[0] = {value:$routeParams.line1.toUpperCase()};
            if ($routeParams.line2)
                $scope.keepText[1] = {value:$routeParams.line2.toUpperCase()};
            if ($routeParams.line3)
                $scope.keepText[2] = {value:$routeParams.line3.toUpperCase()};
            if ($routeParams.line4)
                $scope.keepText[3] = {value:$routeParams.line4.toUpperCase()};
            if ($routeParams.line5)
                $scope.keepText[4] = {value:$routeParams.line5.toUpperCase()};
        };

        $scope.checkForAnd = function(index) {
            if (["AND", "ET"].indexOf($scope.keepText[index].value) !== -1) {
                return {"font-size": targetFontSize * 0.7};
            } else {
                return {"font-size": targetFontSize};
            }
        };

        $scope.change = function(index) {
            $scope.keepText[index].value = $scope.keepText[index].value.toUpperCase();
        };

        $scope.$on(
            "$routeChangeSuccess",
            function( $currentRoute, $previousRoute ){
                render();
            }
        );
    }]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['kcaasApp']);
    });

});
