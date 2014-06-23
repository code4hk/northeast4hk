'use strict';
// Declare app level module which depends on filters, and services
angular.module('nt4hk', [
    'ngRoute',
    // 'ngAnimate',
    // 'jm.i18next',
    // 'ui.bootstrap',
    // 'ui.bootstrap.tooltip',
    // 'leaflet-directive',
    // 'vr.directives.slider',
    // 'nvd3ChartDirectives',
    // 'angular-intro',
    // 'cgBusy'
]).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: 'templates/northeast.html',
            controller: 'MapCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/map'
        });
    }
])
// .controller('ChartCtrl', ['$scope',
//     function($scope) {

//     }
// ])
.controller('MapCtrl', ['$scope',
    function($scope) {
    $scope.exampleData = [
     { key: "One", y: 5 },
        { key: "Two", y: 2 },
        { key: "Three", y: 9 },
        { key: "Four", y: 7 },
        { key: "Five", y: 4 },
        { key: "Six", y: 3 },
        { key: "Seven", y: 9 }
    ];
    }


])
// .controller('NorthEastCtrl', ['$scope',
//     function($scope) {

//     }
// ])


