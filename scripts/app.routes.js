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
            })
            .state('show', {
                url: '/show/:vin',
                templateUrl: 'views/showByVIN.html',
                controller: 'showCtrl'
            });
        $urlRouterProvider.otherwise('/list');
    });

})();
