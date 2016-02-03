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
    });

})();
