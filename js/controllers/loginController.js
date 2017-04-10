(function () {
    'use strict';

    angular
        .module('front-app-rf')
        .controller('LoginController', LoginController);


    LoginController.$inject = ['$location', 'AuthenticationService', '$timeout', 'ApiService'];
    function LoginController($location, AuthenticationService, $timeout, ApiService) {
                
        var vm = this;
        vm.login = login;
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

    }
})();
