//**************************************************************************************************
//Purpose: Decimal Only Directive
//        Features includes no multiple decimal points input, 
//        dynamic precision set by the user on the input with an attribute precision="{n}" 
//        Also a feature includes adding integerLength="{n}" attribute to control the length of integer part
//        Another feature includes adding isCurrency="true" attribute to enable the input formatting as currency value
//Example: <.... decimal integerLength="9" precision="2" isCurrency="true">
//         The above example will let user to input like 123456789.12
//**************************************************************************************************
// using revealing module pattern to wrap the directive code
(function () {
    'use strict';

    angular
        .module('decimal')
        .directive('decimal', decimal);

    decimal.$inject = [];

    function decimal() {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attr, ctrl) {
            if (!ctrl) {
                return;
            }
            ctrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                var clean = val.replace(/[^0-9\.]/g, '');
                var decimalCheck = clean.split('.');
                // handle integer part max length
                if (attr.integerlength) {
                    var integerLength = parseInt(attr.integerlength);
                    if (decimalCheck[0].length > integerLength) {
                        decimalCheck[0] = decimalCheck[0].substr(0, integerLength);
                        if (decimalCheck.length === 1) {
                            clean = decimalCheck[0];
                        }
                    }
                }
                // default precision is two digits
                var precision = 2;
                if (attr.precision) {
                    // override precision if user provided it
                    precision = attr.precision;
                }
                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, precision);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }
                // formatting the value as currency format (comma seperated)
                if (attr.iscurrency) {
                    var parts = clean.toString().split('.');
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    clean = parts.join('.');
                }

                if (val !== clean) {
                    ctrl.$setViewValue(clean);
                    ctrl.$render();
                }
                return clean;
            });
            ctrl.$formatters.push(function (val) {
                if (val && attr.iscurrency) {
                    var parts = val.toString().split('.');
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    val = parts.join('.');
                }
                return val;
            });
            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    }

})();