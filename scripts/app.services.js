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
                        if (cars[i].vin === vin) {
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
    });

})();
