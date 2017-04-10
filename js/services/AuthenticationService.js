(function () {

    'use strict';

    angular
    .module('front-app-rf')
    .factory('AuthenticationService', AuthenticationService);

    //Serviço de Autenticação
    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'ApiService', 'Base64Service'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, ApiService, Base64Service) {

        $rootScope.globals = $cookieStore.get('globals') || {};

        $http.defaults.headers.common['Authorization'] = $rootScope.globals.token || "";

        var service = {};

        service.Login = Login;
        service.Logout = Logout;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(email, password, callback) {
            var response;
            ApiService.Login(email,password)
            .then(function (resultado) {
                if (resultado.success === true) {
                    response = { success: true, user: resultado.data };
                } else {
                    response = { success: false, message: 'Acesso não autorizado: verifique email/senha e permissão de acesso.' };
                }
                callback(response);
            });
        }

        function Logout() {
            //Implementar Logout
            //1: Limpar as credenciais locais armazenadas - ClearCredentials
            this.ClearCredentials();
            //2: mandar o back encerrar a sessão
            var result = ApiService.Logout();

        }

        function SetCredentials(username, password, user) {

            var auditor = [
                '/dashboard','/bens',
                '/cidadaos',
                '/relatorios'
            ];
            var cidadao = ['/dashboard','/bens'];

            $rootScope.globals = {
                currentUser: {
                    id: user.logado.id,
                    nome: user.logado.nome,
                    username: user.logado.nome,
                    email: user.logado.email,
                    sexo: user.logado.sexo,
                    papel: user.logado.papel,
                    endereco: user.logado.endereco,
                    cidade: user.logado.cidade,
                    idade: user.logado.idade,
                    panels: user.logado.papel == 'auditor' ? auditor : cidadao
                },
                token: user.auth_token
            };

            $cookieStore.put('globals', $rootScope.globals);

        }

        function ClearCredentials() {
            delete $rootScope.globals;
            $cookieStore.remove('globals');
        }
    }

})();
