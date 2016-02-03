(function() {
'use strict';

angular
    .module('carManagement')
    .service('carService', function($q) {
        this.getCarsList = function() {
            return $q(function(resolve, reject) {
                try {
                    resolve(JSON.parse(localStorage.getItem('cars')));
                } catch(e) {
                    reject(e);
                }
            });
        };
        this.getCarByVIN = function(vin) {
            return $q(function(resolve, reject) {
                try {
                    var cars = JSON.parse(localStorage.getItem('cars'));
                    for (var i = 0, len = cars.length; i < len; i++) {
                        if (RegExp(vin, 'i').test(cars[i].vin)) {
                            resolve(cars[i]);
                            return;
                        }
                    }
                    resolve(null);
                } catch(e) {
                    reject(e);
                }
            });
        };
        this.upsertCar = function(car) {
            return $q(function(resolve, reject) {
                try {
                    var cars = JSON.parse(localStorage.getItem('cars'));
                    for (var i = 0, len = cars.length; i < len; i++) {
                        if (RegExp(car.vin, 'i').test(cars[i].vin)) {
                            cars[i] = car;
                            localStorage.setItem('cars', JSON.stringify(cars));
                            resolve();
                            return;
                        }
                    }
                    cars.push(car);
                    localStorage.setItem('cars', JSON.stringify(cars));
                    resolve();
                } catch(e) {
                    reject(e);
                }
            });
        };
    });

})();
