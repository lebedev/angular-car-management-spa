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
    })
    .controller('showCtrl', function($stateParams, $rootScope, carService, $scope, $state) {
        $rootScope.setLockscreenStateTo(true);
        carService.getCarByVIN($stateParams.vin)
            .then(function(car) {
                if (car) {
                    $rootScope.changeTitleTo('Details of ' + $stateParams.vin.toUpperCase());
                    $scope.carPristine = car;

                    $scope.save = function() {
                        carService.upsertCar($scope.car)
                            .then(function() {
                                // Message about successful saving.
                                $state.go('list');
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    };

                    $scope.reset = function() {
                        $scope.car = angular.copy($scope.carPristine);
                    };
                    // Initial dirty model setting.
                    $scope.reset();

                    $rootScope.setLockscreenStateTo(false);
                }
            })
            .catch(function(error) {
                console.log(error);
                $rootScope.setLockscreenStateTo(false);
            });
    });

})();
