(function() {
    'use strict';

    angular
    .module("front-app-rf")
    .controller("DashboardController", function ($rootScope, $scope, $http, $location, AuthenticationService, $cookieStore) {

        $rootScope.globals = $cookieStore.get('globals') || {};

        $http.defaults.headers.common['Authorization'] = $rootScope.globals.token || "";

        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };

        $scope.logout = function() {
            AuthenticationService.Logout();
            $location.path('/login');
        }
    });
})();
