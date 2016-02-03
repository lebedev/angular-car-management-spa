(function() {
'use strict';

angular
    .module('carManagement')
    .controller('listCtrl', function($rootScope, carService, $scope) {
        $rootScope.changeTitleTo('List');
        $rootScope.setLockscreenStateTo(true);
        carService.getCarsList()
            .then(function(cars) {
                $scope.cars = cars;
                $rootScope.setLockscreenStateTo(false);
            })
            .catch(function(error) {
                console.log(error);
                $rootScope.setLockscreenStateTo(false);
            });
    });

})();
