(function() {
    'use strict';

    angular
        .module("front-app-rf", [
            'ngAnimate', 'ui.bootstrap', 'ngRoute', 'chart.js',
            'uiGmapgoogle-maps', 'ui.grid', 'ui.grid.resizeColumns',
            'nvd3', 'angularMoment', 'toastr', 'ngCookies', 'hc.marked'
        ])
        .config(function(uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyAklFAzSpJT-3niNGHuZcWPqqY4TI1u2fc',
                v: '3.20', //defaults to latest 3.X anyhow
                libraries: 'weather,geometry,visualization'
            });
        })
        .config(function(toastrConfig) {
            angular.extend(toastrConfig, {
                'autoDismiss': true,
                'newestOnTop': true,
                'positionClass': 'toast-top-center',
                'preventDuplicates': false,
                'preventOpenDuplicates': true,
                'target': 'body',
                'progressBar': true,
                'tapToDismiss': true,
                'closeButton': true,
                'timeOut': 5000
            });
        })
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('responseErrorInterceptor');
        }])
        .run(function(amMoment){
            amMoment.changeLocale('pt-br')
        })
        .factory('responseErrorInterceptor', ['$q', '$injector', function($q, $injector){
            var service = {}

            service.responseError = function(responseError){
                if (responseError.status >= 500 && responseError.status < 600) {
                    var toastr = $injector.get('toastr');
                    toastr.success('Servidor temporariamente indisponível.', responseError.statusText);
                }
                return responseError;
            }

            return service;
        }])
        .filter('getRandomInt', function() {
            return function(text) {
                return Math.floor(Math.random() * 101);
            };
        })
        .filter('to_trusted', ['$sce', function($sce) {
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }])
        .filter('mostraTipo', function() {
            return function(n) {
                var a = ['','Imóvel','Automóvel','Aeronave','Outros'];
                return a[n];
            }
        })
        .filter('mostraSexo', function() {
            return function(n) {
                var a = ['','Feminino','Masculino'];
                return a[n];
            }
        })
        .filter('isInt', function() {
            return function(n) {
                return typeof n === 'number' && n % 1 == 0;
            }
        })
        .filter('isFloat', function() {
            return function(n) {
                return n === +n && n !== (n | 0);
            }
        })
        .filter('currencyFormat', function($filter) {
            return function(number, decimalplaces, decimalcharacter, thousandseparater) {

                if(isNaN(number)) return 'carregando';

                if (decimalplaces == null || decimalplaces == undefined) {
                    decimalplaces = 2;
                }
                if (decimalcharacter == null || decimalcharacter == undefined) {
                    decimalcharacter = ",";
                }
                if (thousandseparater == null || thousandseparater == undefined) {
                    thousandseparater = ".";
                }

                number = parseFloat(number);
                var sign = number < 0 ? "-" : "";
                var formatted = new String(number.toFixed(decimalplaces));

                if (decimalcharacter.length && decimalcharacter != ".") {
                    formatted = formatted.replace(/\./, decimalcharacter);
                }
                var integer = "";
                var fraction = "";
                var strnumber = new String(formatted);
                var dotpos = decimalcharacter.length ? strnumber.indexOf(decimalcharacter) : -1;
                if (dotpos > -1) {
                    if (dotpos) {
                        integer = strnumber.substr(0, dotpos);
                    }
                    fraction = strnumber.substr(dotpos + 1);
                } else {
                    integer = strnumber;
                }
                if (integer) {
                    integer = String(Math.abs(integer));
                }
                while (fraction.length < decimalplaces) {
                    fraction += "0";
                }
                var temparray = new Array();
                while (integer.length > 3) {
                    temparray.unshift(integer.substr(-3));
                    integer = integer.substr(0, integer.length - 3);
                }
                temparray.unshift(integer);
                integer = temparray.join(thousandseparater);
                return sign + integer + decimalcharacter + fraction;

            };
        })
        .filter('roundBigCurrency', function($filter) {
            return function(n) {

                if(isNaN(n)) return 'carregando';

                var value, suffix;
                n = parseFloat(n);
                if ($filter('isFloat')(n) || $filter('isInt')(n)) {
                    if (n >= 1000 && n < 999999) {
                        value = (n / 1000);
                        suffix = ' Mil';
                    } else if (n >= 1000000 && n < 999999999) {
                        value = (n / 1000000);
                        suffix = ' Mi';
                    } else if (n >= 1000000000 && n < 999999999999) {
                        value = (n / 1000000000);
                        suffix = ' Bi';
                    } else {
                        value = n;
                        suffix = '';
                    }

                    if ($filter('isInt')(value)) {
                        return 'R$ ' + $filter('currencyFormat')(value) + suffix;
                    } else {
                        return 'R$ ' + $filter('currencyFormat')(value) + suffix;
                    }
                }
            };
        })
        .filter('roundBigNumber', function($filter) {
            return function(n) {
                var value, suffix;
                n = parseInt(n);
                if ($filter('isInt')(n)) {
                    if (n >= 1000 && n < 999999) {
                        value = (n / 1000);
                        suffix = ' Mil';
                    } else if (n >= 1000000 && n < 999999999) {
                        value = (n / 1000000);
                        suffix = ' Mi';
                    } else if (n >= 1000000000 && n < 999999999999) {
                        value = (n / 1000000000);
                        suffix = ' Bi';
                    } else {
                        value = n;
                        suffix = '';
                    }

                    if(n >= 1000){
                        if ($filter('isInt')(value)) {
                            return $filter('currencyFormat')(value) + suffix;
                        } else {
                            return $filter('currencyFormat')(value) + suffix;
                        }
                    }else {
                        return value + suffix;
                    }

                }
            };
        })

})();
