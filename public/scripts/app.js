'use strict';
// Declare app level module which depends on filters, and services
angular.module('nt4hk', [
    'ngRoute',
    'ngAnimate',
    // 'jm.i18next',
    'ui.bootstrap',
    'leaflet-directive',
    // 'vr.directives.slider',
    'nvd3ChartDirectives',
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
    .controller('MapInfoAccordionCtrl', ['$scope',
        function($scope) {
            $scope.oneAtATime = true;

            $scope.groups = [{
                title: 'Dynamic Group Header - 1',
                content: 'Dynamic Group Body - 1'
            }, {
                title: 'Dynamic Group Header - 2',
                content: 'Dynamic Group Body - 2'
            }];

            $scope.items = ['Item 1', 'Item 2', 'Item 3'];

            $scope.addItem = function() {
                var newItemNo = $scope.items.length + 1;
                $scope.items.push('Item ' + newItemNo);
            };

            $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };

        }
    ])
    .factory('q', function() {
        return Q;
    })
    .service('MapDataService', ['$http', 'q',
        function($http, Q) {
            console.log(Q);
            var _service = {};
            //ODO cache
            _service.getShapesGeoJSON = function() {
                return $http.get('/data/basic_areas_merged.geojson')
            };
            return _service;


        }
    ])
// .controller('ChartCtrl', ['$scope',
//     function($scope) {

//     }
// ])
.controller('MapCtrl', ['$scope', 'MapDataService','leafletData',
    function($scope, MapDataService,leafletData) {
        $scope.defaultCenter = {
            lat: 22.52,
            lng: 114.111,
            zoom: 13
        };

$scope.defaults={
    // crs: 'Simple',
    maxZoom: 17
}
        $scope.legend={
            position: 'bottomleft',
            colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
            labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
        }

        MapDataService.getShapesGeoJSON().then(function(res) {
            $scope.displayedGeoJSON = {};
            //     style:{},
            //     data:{}
            // };

            $scope.areaSelected={};
            $scope.areaSelectedId = "";

            var areaInfos ={
                "fln_golf":{
                    name:"粉嶺哥爾夫球場",
                    color:  "#16B900"
                },
                "s_ktn_1":{
                    name:"古洞北",
                    color:  "#f86767"
                },
                "s_fln_1":{
                    name:"粉嶺北",
                    color:  "#f86767"
                },
                "s_ne_tkl_14":{
                    name:"坪輋（重新規劃）",
                    color:  "#f86767"
                }
            }
            var colors = {
                "fln_golf": "rgb(0, 153, 0);"
            }

            function getColor(areaId) {
                if (!areaId || !areaInfos[areaId]) {
                    return "#f86767";
                }
                return areaInfos[areaId].color;
            }

            $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {
                areaClickCallback(featureSelected, leafletEvent);
            });

            function areaClickCallback(featureSelected){
                console.log(featureSelected.properties.id);
                $scope.areaSelectedId  = featureSelected.properties.id;
                $scope.areaSelected = areaInfos[$scope.areaSelectedId];

            }
            $scope.displayedGeoJSON.style = function(feature) {
                return {
                    fillColor: getColor(feature.properties.id),
                    weight: 1,
                    opacity: 1,
                    color: '#f86767',
                    // dashArray: '3',
                    fillOpacity: 0.5
                }
            };


            $scope.displayedGeoJSON.data = res.data;
        });

    $scope.maxBounds = {};
        $scope.layers = {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'http://b.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png',
                    layerOptions: {
                        subdomains: ['a', 'b', 'c'],
                        attribution: '© OpenStreetMap contributors',
                        continuousWorld: true
                    }
                }
                
            },
            overlays: {
                s_ktn_1_left: {
                    name: "古洞北",
                    type: 'imageOverlay',
                    url: '/data/nent_nda_left.png',
                    bounds: [[22.4945, 114.085], [22.525, 114.103]],
                     visible: true,
                    layerOptions: {
                      noWrap: true,
                       opacity: 0.8,
                      attribution: 'Creative Commons image found <a href="http://www.flickr.com/photos/c32/8025422440/">here</a>'
                    }
                },
                s_ktn_1_right: {
                    name: '古洞北及粉嶺北',
                    type: 'imageOverlay',
                    url: '/data/nent_nda_right.png',
                    bounds: [[22.491, 114.103], [22.530, 114.160]],
                     visible: true,
                    layerOptions: {
                      noWrap: true,
                       opacity: 0.8,
                      attribution: 'Creative Commons image found <a href="http://www.flickr.com/photos/c32/8025422440/">here</a>'
                    }
                }
            }
        };

        $scope.exampleData = [{
            key: "One",
            y: 5
        }, {
            key: "Two",
            y: 2
        }, {
            key: "Three",
            y: 9
        }, {
            key: "Four",
            y: 7
        }, {
            key: "Five",
            y: 4
        }, {
            key: "Six",
            y: 3
        }, {
            key: "Seven",
            y: 9
        }];

        $scope.xFunction = function() {
            return function(d) {
                return d.key;
            };
        }
        $scope.yFunction = function() {
            return function(d) {
                return d.y;
            };
        }
    }


])
// .controller('NorthEastCtrl', ['$scope',
//     function($scope) {

//     }
// ])