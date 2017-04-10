(function () {
    'use strict';

    angular
        .module('front-app-rf')
        .service('InterceptorService', InterceptorService)
        .config(configInterceptor);


    InterceptorService.$inject = ['$rootScope','$location','$cookieStore'];
    function InterceptorService($rootScope, $location, $cookieStore) {
      var service = this;
      service.request = function(config) {
       return config;
     };

     service.responseError = function(response) {
       if (response.status === 401) {
           delete $rootScope.globals;
           $cookieStore.remove('globals');
           $location.path('/login');
       }
       return response;
     };

   }

  configInterceptor.$inject = ['$httpProvider'];
  function configInterceptor($httpProvider) {
    $httpProvider.interceptors.push('InterceptorService');
  }
}
)();
