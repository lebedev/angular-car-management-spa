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
            var validVins = [
                '1N4AL2AP6CC000000',
                '1G1RD6E49BU100340',
                '5YJSA1DP7DFP04612',
                '3C3CFFBR2CT105421',
                '1ZVBP8CF5B5161451'
            ];
            var vin = prompt('Enter a car\'s VIN (17 characters [a-z0-9]):\nOr you can use one of the following for testing: ' + validVins.join(', ') + '.');

            if (vin === null) {
                return;
            }
            if (/^[a-z\d]{17}$/i.test(vin)) {
                $rootScope.setLockscreenStateTo(true);
                carService.getCarByVIN(vin)
                    .then(function(car) {
                        if (car) {
                            var openExisting = confirm('Car with that VIN is already in DB. Would you like to open it?');
                            if (openExisting) {
                                $state.go('show', {vin: vin});
                            } else {
                                $rootScope.setLockscreenStateTo(false);
                            }
                        } else {
                            carService.fetchCarFromEdmundsByVIN(vin)
                                .then(function(car) {
                                    carService.upsertCar(car)
                                        .then(function() {
                                            $state.go('show', {vin: vin});
                                        })
                                        .catch(function(error) {
                                            $rootScope.setLockscreenStateTo(false);
                                            alert(error);
                                        });
                                })
                                .catch(function(error) {
                                    $rootScope.setLockscreenStateTo(false);
                                    alert(error);
                                });
                        }
                    });
            } else {
                alert('"' + vin + '" is incorrent VIN.');
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
                        $rootScope.setLockscreenStateTo(true);
                        carService.upsertCar($scope.car)
                            .then(function() {
                                // Message about successful saving.
                                $state.go('list');
                            })
                            .catch(function(error) {
                                alert(error);
                                $rootScope.setLockscreenStateTo(true);
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
                $rootScope.setLockscreenStateTo(false);
                alert(error);
            });
    });

})();
