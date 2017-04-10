(function() {
    'use strict';

	angular
		.module("front-app-rf")
		.config(routeConfig)
        .run(run);

		routeConfig.$inject = ['$routeProvider', '$locationProvider'];

		function routeConfig($routeProvider, $locationProvider){

		$routeProvider
            .when("/login", {
				templateUrl: 'views/dashboard/login.html',
				controller: 'LoginController',
                controllerAs: 'vm'
			})
            .when("/logout", {
				templateUrl: 'views/dashboard/login.html',
				controller: 'LoginController',
                controllerAs: 'vm'
			})
			.when("/dashboard", {
				templateUrl: 'views/dashboard/dashboard.html',
				controller: 'DashboardController'
			})
            .when("/perfil", {
				templateUrl: 'views/dashboard/perfil.html',
				controller: 'DashboardController'
			})
            .when("/bens", {
				templateUrl: 'views/bens/bens.html',
				controller: 'DashboardController'
			})
            .when("/cidadaos", {
				templateUrl: 'views/cidadaos/cidadaos.html',
				controller: 'DashboardController'
			})
            .when("/relatorios", {
				templateUrl: 'views/cidadaos/relatorios.html',
				controller: 'RelatoriosController'
			})
            /*.when("/cidadaos_rel_agrupamento_por_cidade", {
				templateUrl: 'views/cidadaos/cidadaos_rel_agrupamento_por_cidade.html',
				controller: 'DashboardController'
			})*/
			.when("/changelog", {
				templateUrl: 'views/dashboard/changelog.html'
			})
			.when("/", {
				templateUrl: "views/dashboard/login.html",
                controller: 'LoginController',
                controllerAs: 'vm'
			});

			$routeProvider.otherwise({redirectTo: "/"});

		}

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // manter o usuário logado mesmo após uma atualização de página
        $rootScope.globals = $cookieStore.get('globals') || {};

        $http.defaults.headers.common['Authorization'] = $rootScope.globals.token || "";

        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            var rotasPublicasEspeciais = [
                '/login'
            ];

            // verificar se $location.path() está entre as páginas liberadas....
            $rootScope.restrictedPage = $.inArray(
                $location.path(),
                rotasPublicasEspeciais
            ) === -1;

            if ($rootScope.globals) {

              var loggedIn = $rootScope.globals.currentUser;

              if ($rootScope.restrictedPage && !loggedIn) {
                  $location.path('/login');
              }

              if(loggedIn && $.inArray($location.path(), loggedIn.panels.concat(['/perfil','/logout','/changelog'])) === -1)
                $location.path('/dashboard');
            }
            else  {
                $location.path('/login');
            }
        });
    }

})();
