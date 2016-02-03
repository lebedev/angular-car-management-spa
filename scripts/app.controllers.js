(function() {
'use strict';

angular
    .module('carManagement')
    .controller('listCtrl', function(carService, $scope) {
        carService.getCarsList()
            .then(function(cars) {
                $scope.cars = cars;
            })
            .catch(function(error) {
                console.log(error);
            });
    });

})();
