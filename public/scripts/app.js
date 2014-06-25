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
    .service('spreadSheetDataService', ['$http', 'q',
        function($http, Q) {
            var URL = 'https://spreadsheets.google.com/feeds/list/1wgGlXYbGUNIBu4TX3UAC334iI1KwwGbynZlF3-NNv4s/746094374/public/values?alt=json';

            var _service = {};
            _service.getAreaByDetails = function() {
                return Q($http.get(URL)).then(function(res) {
                    return res.data.feed.entry;
                });
            };
            return _service;

        }
    ])

.service('mapDataService', ['$http', 'q',
    function($http, Q) {
        console.log(Q);
        var _service = {};
        //ODO cache
        _service.getShapesGeoJSON = function() {
            return Q($http.get('/data/basic_areas_merged.geojson'));
        };
        return _service;


    }
])
// .controller('ChartCtrl', ['$scope',
//     function($scope) {

//     }
// ])
.controller('MapCtrl', ['$scope', 'mapDataService', 'spreadSheetDataService', 'leafletData',
    function($scope, mapDataService, spreadSheetDataService, leafletData) {
        $scope.defaultCenter = {
            lat: 22.52,
            lng: 114.111,
            zoom: 13
        };

        $scope.defaults = {
            // crs: 'Simple',
            maxZoom: 17
        }
        $scope.legend = {
            position: 'bottomleft',
            colors: ['#ff0000', '#28c9ff', '#0000ff', '#ecf386'],
            labels: ['National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway']
        }

        mapDataService.getShapesGeoJSON().then(function(res) {
            $scope.displayedGeoJSON = {};
            //     style:{},
            //     data:{}
            // };

            $scope.areaSelected = {};
            $scope.areaSelectedId = "";

            var areaInfos = {
                "fln_golf": {
                    name: "粉嶺哥爾夫球場",
                    color: "#16B900"
                },
                "s_ktn_1": {
                    name: "古洞北",
                    color: "#f86767"
                },
                "s_fln_1": {
                    name: "粉嶺北",
                    color: "#f86767"
                },
                "s_ne_tkl_14": {
                    name: "坪輋（重新規劃）",
                    color: "#f86767"
                }
            };


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

            function areaClickCallback(featureSelected) {
                console.log(featureSelected.properties.id);
                $scope.areaSelectedId = featureSelected.properties.id;


            }
            $scope.areaChartTooltipFunction = function() {
                return function(key, x, obj, e, graph) {
                    return   '<h4>' + key + '</h4>' +
                        '<p>' +  x +' 公頃 '+obj.point.percent+'%</p>'
                }
                
            };

            function _getDisplayedAreaChart(){
                var area = [];
                _.each($scope.areaSelected.sizeByType,function(v,k) {
                    if(k==="total"){
                        return;
                    }
                    console.log(k);
                    var percent = v.size / $scope.areaSelected.sizeByType.total.size * 100;
                    area.push({
                        key:v.key,
                        y:v.size,
                        percent: percent.toFixed(2)
                    })
                });
                return area;
            }
            $scope.$watch('areaSelectedId',function(newVal) {
                if(!newVal){
                    return;
                }
                $scope.areaSelected = areaInfos[$scope.areaSelectedId];
                $scope.chartByAreaData=_getDisplayedAreaChart();


            })

            $scope.chartByAreaData = [];

                _.each(areaInfos,function(v,k){
                    areaInfos[k].news={};
                    areaInfos[k].sizeByType={};
                });

            spreadSheetDataService.getAreaByDetails().then(function(data) {
                // areaInfos
                $scope.areaSelectedId = "total";

                // var dataByArea
                console.log(data);
                _.each(data,function(aRow) {
                    console.log(aRow);
                    var areaId  = aRow.gsx$areaid.$t;
                    if(!areaId){
                        return;
                    }
                    if(!_.contains(_.keys(areaInfos),areaId)){
                        return;
                    }
                    console.log(areaId);
                    console.log(areaInfos[areaId].sizeByType);

                    areaInfos[areaId].sizeByType[aRow.gsx$typelabeleng.$t]={
                        key : aRow.gsx$typelabeltc.$t,
                        size : aRow.gsx$areasize.$t
                    };
                });

                    areaInfos["total"]={};
                    areaInfos["total"].news={};
                    areaInfos["total"].sizeByType={};
                _.each(areaInfos,function(aAreaInfo) {
                    _.each(aAreaInfo.sizeByType,function(v,k) {
                        var totalSizeByType =areaInfos["total"].sizeByType[k]
                        if(totalSizeByType){
                            totalSizeByType += parseFloat(v.size); 
                        }
                        else{
                            totalSizeByType = 0;
                        }
                    })
                })

                console.log(areaInfos);



            }).fail(function(err) {
                console.log(err);
            });
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
                    bounds: [
                        [22.4945, 114.085],
                        [22.525, 114.103]
                    ],
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
                    bounds: [
                        [22.491, 114.103],
                        [22.530, 114.160]
                    ],
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