(function() {
'use strict';

angular
    .module('carManagement')
    .controller('listCtrl', function($scope) {
        $scope.cars = JSON.parse(localStorage.cars);
    });

})();
