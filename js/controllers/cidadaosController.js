(function() {
    'use strict';

    angular
    .module("front-app-rf")
    .controller("CidadaosController", CidadaosController);

    CidadaosController.$inject = ['$rootScope', '$scope', '$http', '$location', 'AuthenticationService','ApiService','$injector','$cookieStore'];

    function CidadaosController($rootScope, $scope, $http, $location, AuthenticationService, ApiService, $injector, $cookieStore) {

        $rootScope.globals = $cookieStore.get('globals') || {};

        $http.defaults.headers.common['Authorization'] = $rootScope.globals.token || "";

        //view model object
        /* jshint validthis:true */
        var vm = this;
        vm.registroDeCidadaos = {};

        vm.opcoesDeSexo = [
            { id: 0, titulo: "Sexo..." },
            { id: 1, titulo: "Feminino" },
            { id: 2, titulo: "Masculino" },
        ];

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
                /*{name: 'soma_dos_bens', width: '150', displayName: 'Soma dos Bens',
                    type: 'number', cellFilter: 'roundBigCurrency'
                }*/
            ]
        };

        //executando funções
        if (isNotLoaded(vm.registroDeCidadaos)) {
            loadAllBoard();
        }

        function loadAllBoard() {
            var promisseCidadaos = ApiService.listarCidadaos();

            promisseCidadaos.then(function (response) {
                vm.gridListagemDeCidadaos.data = response.data;
            });
        }

        vm.cadastrar = function(cidadao){

            vm.dataLoading = true;

            ApiService.cadastrarCidadao(cidadao).success(function(response){

                //notificações das operações
                var toastr = $injector.get('toastr');
                if(response.status == 401)
                    toastr.error('Você não possui essa permissão');
                else
                    toastr.success('Cadastrado com sucesso');

                //limpando o form
                vm.cidadao = {};

                //atualizando o grid
                loadAllBoard();

                vm.dataLoading = false;

            });

        }

        vm.atualizarCidadao = function(cidadao){

            vm.dataLoading = true;

            ApiService.atualizarCidadao(cidadao).success(function(response){

                //notificações das operações
                var toastr = $injector.get('toastr');
                toastr.success('Atualizado com sucesso');

                cidadao.auth_token = $rootScope.globals.token;
                AuthenticationService.SetCredentials(cidadao.email,cidadao.senha,{logado: cidadao});
                vm.dataLoading = false;

            });

        }

        vm.dataEditMode = false;

        vm.edicao = function(cidadao){

            vm.dataEditMode = true;
            //limpando o form
            vm.cidadao = cidadao;
            angular.element('#nome').trigger('focus');

        }

        vm.remover = function(cidadao){

            ApiService.removerCidadao(cidadao).then(function(response){

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
