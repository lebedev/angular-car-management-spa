(function() {
'use strict';

angular
    .module('carManagement', ['ui.router'])
    .run(function($rootScope) {
        // Initial cars data setting.
        if (!localStorage.cars) {
            localStorage.cars = JSON.stringify([
                {
                    vin: '5tdxk3dc8bs093588',
                    make: 'Toyota',
                    model: 'Sienna',
                    year: 2011,
                    trim: 'SE 8-Passenger',
                    bodyType: 'Minivan',
                    curbWeight: 4460
                },
                {
                    vin: 'jf1znaa15d1702844',
                    make: 'Scion',
                    model: 'FR-S',
                    year: 2013,
                    trim: undefined,
                    bodyType: 'Car',
                    curbWeight: undefined
                },
            ]);
        }

        // Document title binding setting.
        $rootScope.changeTitleTo = function(title) {
            $rootScope.title = (title ? title + ': ' : '') + 'Car Management SPA on AngularJS';
        };
        $rootScope.changeTitleTo('');
        document.title = '{{title}}';
    });

})();
