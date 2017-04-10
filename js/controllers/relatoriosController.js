(function() {
    'use strict';

    angular
    .module("front-app-rf")
    .controller("RelatoriosController", RelatoriosController);

    RelatoriosController.$inject = ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService','ApiService','$injector','$cookieStore'];

    function RelatoriosController($rootScope, $scope, $http, $location, AuthenticationService, ApiService, $injector, $cookieStore) {

        $rootScope.globals = $cookieStore.get('globals') || {};

        $http.defaults.headers.common['Authorization'] = $rootScope.globals.token || "";

        //view model object
        /* jshint validthis:true */
        var vm = this;
        vm.registroDeCidadaos = {};

        vm.dataLoading = false;

        vm.gridListagemDeCidadaos = {
            data: [],
            enableSorting: true,
            enableFiltering: true,
            enableColumnMenus: false,
            columnDefs: [
                {name: 'nome', displayName: 'Nome' },
                {name: 'email', displayName: 'E-mail' },
                {name: 'endereco', displayName: 'Endereço' },
                {name: 'cidade', displayName: 'Cidade' },
                {name: 'soma_dos_bens', width: '150', displayName: 'Soma dos Bens',
                    type: 'number', cellFilter: 'roundBigCurrency'
                }
            ]
        };

        vm.gridListagemDeCidadaosCidade = {
            data: [],
            enableSorting: true,
            enableFiltering: true,
            enableColumnMenus: false,
            columnDefs: [
                {name: 'cidade', displayName: 'Cidade' },
                {name: 'total_cidadaos', width: '150', displayName: 'Total de Cidadão',
                    type: 'number', cellFilter: 'roundBigNumber'
                }
            ]
        };

        //executando funções
        if (isNotLoaded(vm.registroDeCidadaos)) {
            loadAllBoard();
        }

        function loadAllBoard() {
            var promisseCidadaos = ApiService.listarCidadaosComBensApartirDe100Mil();

            promisseCidadaos.then(function (response) {
                console.log(response.data.usuarios_por_cidade);
                vm.gridListagemDeCidadaos.data = response.data.usuarios;
                vm.gridListagemDeCidadaosCidade.data = response.data.usuarios_por_cidade;
            });
        }

    }

})();
