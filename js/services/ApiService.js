(function () {
    'use strict';

    angular
        .module('front-app-rf')
        .factory('ApiService', ApiService);

    ApiService.$inject = ['$http', 'Base64Service','$rootScope','$cookieStore'];

    function ApiService($http, Base64Service, $rootScope, $cookieStore) {

        $rootScope.globals = $cookieStore.get('globals') || {};

        $http.defaults.headers.common['Authorization'] = $rootScope.globals.token || "";

        var UID = $rootScope.globals.currentUser ? $rootScope.globals.currentUser.id : Logout() ;
        var service = {};
        var SERVER = 'https://api-app-rf.herokuapp.com'; //'http://192.168.33.10:3000';

        //Bens API
        service.listarBens = listarBens;
        service.cadastrarBem = cadastrarBem;
        service.editarBem = editarBem;
        service.removerBem = removerBem;

        //Cidadão API
        service.listarCidadaos = listarCidadaos;
        service.listarCidadaosComBensApartirDe100Mil = listarCidadaosComBensApartirDe100Mil;
        service.cadastrarCidadao = cadastrarCidadao;
        service.atualizarCidadao = atualizarCidadao;
        service.removerCidadao = removerCidadao;

        service.Login = Login;
        service.Logout = Logout;
        
        return service;

        function listarBens() {
            return $http.get(SERVER + '/usuarios/'+ UID +'/bems');
        }

        function cadastrarBem(bem) {
            return $http.post(SERVER + '/usuarios/'+ UID +'/bems',{
                nome: bem.nome,
                tipo: bem.tipo,
                valor: bem.valor
            });
        }

        function editarBem(bem) {
            return $http.put(SERVER + '/usuarios/'+ UID +'/bems/' + bem.id,{
                nome: bem.nome,
                tipo: bem.tipo,
                valor: bem.valor
            });
        }

        function removerBem(bem) {
            return $http.delete(SERVER + '/usuarios/'+ UID +'/bems/' + bem.id);
        }

        function listarCidadaos() {
            return $http.get(SERVER + '/usuarios');
        }

        function listarCidadaosComBensApartirDe100Mil() {
            return $http.get(SERVER + '/usuarios/cem_mil');
        }

        function cadastrarCidadao(cidadao) {
            return $http.post(SERVER + '/usuarios/adicionar',{
                nome: cidadao.nome,
                sexo: cidadao.sexo,
                endereco: cidadao.endereco,
                cidade: cidadao.cidade,
                idade: cidadao.idade,
                papel: cidadao.papel,
                email: cidadao.email,
                password: cidadao.senha,
                password_confirmation: cidadao.confirma_senha
            });
        }

        function atualizarCidadao(cidadao) {
            return $http.put(SERVER + '/usuarios/' + UID,{
                nome: cidadao.nome,
                sexo: cidadao.sexo,
                endereco: cidadao.endereco,
                cidade: cidadao.cidade,
                idade: cidadao.idade,
                papel: cidadao.papel,
                email: cidadao.email,
                password: cidadao.senha,
                password_confirmation: cidadao.confirma_senha
            });
        }

        function removerCidadao(cidadao) {
            return $http.delete(SERVER + '/usuarios/'+ cidadao.id );
        }

        function Login(email,senha) {
            return $http.post(SERVER + '/auth/login',{email:email,password:senha}).then(handleRequest);
        }

        function Logout() {
            //return $http.get(SERVER + '/auth/log/logout').then(handleRequest);
        }

        // private functions
        function handleRequest(res) {
           if(res.status == 401)
            return { success: false, message: 'Credenciais inválidas: verifique se email e/ou senha estão corretos.' };
          else if(res.status == 200)
            return { success: true, data: res.data };
        }
    }

})();
