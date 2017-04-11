(function() {
    'use strict';

    angular
    .module("front-app-rf")
    .controller("BensController", BensController);

    BensController.$inject = ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService','ApiService','$injector','$cookieStore'];

    function BensController($rootScope, $scope, $http, $location, AuthenticationService, ApiService, $injector, $cookieStore) {

        $rootScope.globals = $cookieStore.get('globals') || {};

        $http.defaults.headers.common['Authorization'] = $rootScope.globals.token || "";

        //view model object
        /* jshint validthis:true */
        var vm = this;
        vm.registroDeBens = {};

        vm.opcoesDeBem = [
            { id: 0, titulo: "Tipo..." },
            { id: 1, titulo: "Imóvel" },
            { id: 2, titulo: "Automóvel" },
            { id: 3, titulo: "Aeronave" },
            { id: 4, titulo: "Outros" },
        ];

        vm.dataLoading = false;

        vm.gridListagemDeBens = {
            data: [],
            enableSorting: true,
            enableFiltering: true,
            enableColumnMenus: false,
            columnDefs: [
                {name: 'nome', displayName: 'Nome do Bem' },
                {name: 'tipo', displayName: 'Tipo do Bem', cellFilter: 'mostraTipo' },
                {name: 'valor', width: '150', displayName: 'Valor',
                    type: 'number', cellFilter: 'roundBigNumber'
                }
            ]
        };

        //executando funções
        if (isNotLoaded(vm.registroDeBens)) {
            loadAllBoard();
        }

        function loadAllBoard() {
            var promisseBens = ApiService.listarBens();

            promisseBens.then(function (response) {
                vm.gridListagemDeBens.data = response.data
            });
        }

        vm.cadastrar = function(bem){

            vm.dataLoading = true;

            ApiService.cadastrarBem(bem).then(function(response){

                //notificações das operações
                var toastr = $injector.get('toastr');
                toastr.success('Cadastrado com sucesso');

                //limpando o form
                vm.bem = {};

                //atualizando o grid
                loadAllBoard();

                vm.dataLoading = false;

            });

        }

        vm.dataEditMode = false;

        vm.edicao = function(bem){

            vm.dataEditMode = true;
            //limpando o form
            vm.bem = bem;
            angular.element('#nome').trigger('focus');

        }

        vm.editar = function(bem){

            vm.dataLoading = true;

            ApiService.editarBem(bem).then(function(response){

                //notificações das operações
                var toastr = $injector.get('toastr');
                toastr.success('Atualizado com sucesso');

                //limpando o form
                vm.bem = {};

                //atualizando o grid
                loadAllBoard();

                vm.dataLoading = false;
                vm.dataEditMode = false;

            });

        }

        vm.remover = function(bem){

            ApiService.removerBem(bem).then(function(response){

                //notificações das operações
                var toastr = $injector.get('toastr');
                toastr.success('Removido com sucesso');

                //atualizando o grid
                loadAllBoard();

                vm.dataLoading = false;

            });

        }

    }

})();
