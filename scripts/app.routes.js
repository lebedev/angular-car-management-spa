(function() {
'use strict';

angular
    .module('carManagement')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/list',
                templateUrl: 'views/list.html',
                controller: 'listCtrl'
            });
        $urlRouterProvider.otherwise('/list');
    });

})();
