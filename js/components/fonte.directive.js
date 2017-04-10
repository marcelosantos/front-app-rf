/**
* @desc - Esta diretiva pode ser utilizada para mostrar a fonte da informação
*
@example <fonte titulo=""></fonte>
*/

(function() {
    'use strict';

    angular
        .module('front-app-rf')
        .directive('fonte', fonte);

    function fonte() {

        var directive = {
            templateUrl: 'js/components/fonte.directive.html',
            restrict: "E",
            scope: {
                titulo: "=titulo"
            }
        };

        return directive;

    }

})();
