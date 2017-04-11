(function () {
    'use strict';

    angular
        .module('front-app-rf')
        .controller('LoginController', LoginController);


    LoginController.$inject = ['$location', 'AuthenticationService', '$timeout', 'ApiService'];
    function LoginController($location, AuthenticationService, $timeout, ApiService) {

        var vm = this;
        vm.login = login;
        vm.criarConta = criarConta;

        vm.dataLoading = false;

        (function initController() {
            // apagar o status de login
            AuthenticationService.ClearCredentials();
            vm.credenciais = {};
            vm.mostrarCampoSenha = true;


        })();

        function login(credenciais) {
            vm.dataLoading = true;
            AuthenticationService.Login(credenciais.email, credenciais.senha, function (response) {
              if (response.success) {
                  AuthenticationService.SetCredentials(credenciais.email, credenciais.senha,response.user);
                  vm.resposta = response;
                  vm.dataLoading = false;
                  $location.path('/dashboard');
                  window.location.reload();
               } else {
                   vm.dataLoading = false;
                   vm.resposta = response;
                   $timeout(function(){
                     vm.resposta.sucesso = response.success;
                     vm.resposta.mensagem = response.message;
                   },1000);
               }
           });
        };

        function criarConta(novaConta) {
            vm.dataLoading = true;
            ApiService.NovaConta(novaConta).then(function(response){

                vm.dataLoading = false;
                if(response.data.message == "Account created successfully"){
                    var credenciais = {
                        email: novaConta.email,
                        senha: novaConta.senha
                    }
                    vm.login(credenciais);
                }

            });
        };

    }
})();
