(function() {
'use strict';

angular
    .module('carManagement')
    .controller('listCtrl', function($rootScope, carService, $scope) {
        $rootScope.changeTitleTo('List');
        carService.getCarsList()
            .then(function(cars) {
                $scope.cars = cars;
            })
            .catch(function(error) {
                console.log(error);
            });
    });

})();
