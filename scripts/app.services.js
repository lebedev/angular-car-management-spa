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
        this.fetchCarFromEdmundsByVIN = function(vin) {
            return $q(function(resolve, reject) {
                var xhr = new XMLHttpRequest(),
                    edmundsApiUrl = 'http://api.edmunds.com/v1/api/toolsrepository/vindecoder?fmt=json&api_key=9ez3tx9ms6tunncyvyah9pbr&vin=';
                xhr.open('GET', edmundsApiUrl + vin, true);
                xhr.onreadystatechange = function() {
                    if (this.readyState < 4) {
                        return;
                    } else if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response).styleHolder[0],
                                car = {
                                    vin:        vin,
                                    make:       response.makeName,
                                    model:      response.modelName,
                                    year:       response.year,
                                    trim:       response.trim.name,
                                    bodyType:   response.categories.PRIMARY_BODY_TYPE[0],
                                    curbWeight: +response.attributeGroups.SPECIFICATIONS.attributes.CURB_WEIGHT.value || undefined
                                };
                            resolve(car);
                        } catch(e) {
                            reject(e);
                        }
                    } else {
                        reject('There\'s no entries in Edmunds DB with that VIN.');
                    }
                };
                xhr.send();
            });
        };
    });

})();
