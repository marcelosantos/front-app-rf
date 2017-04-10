/**
* @desc - Esta diretiva pode ser utilizada para mostrar dados informativos com título
*
@example <info titulo=""></info>
*/

(function() {
    'use strict';

    angular
        .module('front-app-rf')
        .directive('info', info);

    function info() {

        var directive = {
            templateUrl: 'js/components/info.directive.html',
            restrict: "E",
            scope: {
                titulo: "=titulo"
            }
        };

        return directive;

    }

})();
