(function() {
'use strict';

angular
    .module('carManagement')
    .controller('listCtrl', function($rootScope, carService, $scope, $state) {
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

        $scope.addByVIN = function() {
            var vin = prompt('Enter a car\'s VIN (17 characters [a-z0-9]):');
            if (!vin) {
                return;
            }
            if (/^[a-z\d]{17}$/i.test(vin)) {
                $rootScope.setLockscreenStateTo(true);
                carService.getCarByVIN(vin)
                    .then(function(car) {
                        console.log(car);
                        if (car) {
                            var openExisting = confirm('Car with that VIN is already in DB. Would you like to open it?');
                            if (openExisting) {
                                $state.go('show', {vin: vin});
                            } else {
                                $rootScope.setLockscreenStateTo(false);
                            }
                        }
                    });
            } else {
                alert(vin + ' is incorrent VIN.');
            }
        };
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
