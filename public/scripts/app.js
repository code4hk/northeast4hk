'use strict';
// Declare app level module which depends on filters, and services
angular.module('nt4hk', [
    'ngRoute',
    'ngAnimate',
    // 'jm.i18next',
    'ui.bootstrap',
    'ui.bootstrap.carousel',
    'leaflet-directive',
    // 'vr.directives.slider',
    'nvd3ChartDirectives',
    // 'angular-intro',
    'cgBusy'
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

            $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false,
                isPPChartOpen: false,
                isNewsOpen: false
            };

        }
    ])
    .controller('ModalInstanceCtrl', ['$scope', '$sce',
            function($scope, $sce) {

                $scope.slides = [];
                $scope.activeIndex = 0;

                $scope.myInterval = 5000;
                var newWidth = 600;

                $scope.prev = function() {
                    if ($scope.activeIndex > 0) {
                        $scope.activeIndex--;
                    }
                };
                $scope.next = function() {
                    if ($scope.activeIndex < $scope.slides.length) {
                        $scope.activeIndex++;
                    }
                };

                var slidesSource = [{
                        image: 'http://www.pland.gov.hk/pland_en/press/publication/ar_09/images/common/events_16_l.jpg',
                        text: '<h3>新界東北發展計劃背景資料</h3><br />港英政府於1990年代已開始研究發展新界東北成爲新市鎮。1998年，項目被納入香港政府的全港發展策略檢討，惟後來經歷香港經濟衰退，計劃一度被擱置。2007年，香港政府發表《香港2030》，建議開拓古洞北、粉嶺北及坪輋／打鼓嶺新發展區和洪水橋新發展區。 香港行政長官曾蔭權於同年《施政報告》中表示，恢復對這些地區進行新市鎮的規劃及工程研究。',
                        source: '維基百科新界東北發展計劃條目'
                    }, {
                        image: 'http://www.nentnda.gov.hk/img/home.jpg',
                        text: '計劃中政府展開三階段公眾參與：<ul><li>2008年11月－2009年3月：第一階段公眾參與</li><li>2009年11月－2010年3月為（第二階段公眾參與）</li><li>2012年6月－2012年9月為第三階段公眾參與 <a href="http://www.nentnda.gov.hk/chi/public_3.html#PER" taget="_blank">報告</a></li></ul>'
                    }, {
                        image: 'http://static.apple.nextmedia.com/images/apple-photos/apple/20120923/large/23la1p101.jpg',
                        text: '2012年8月18日， 政府於粉嶺祥華社區會堂舉行居民大會，不過場地只能夠容納320人。場面混亂，整個諮詢會舉行了不足30分鐘就告吹。延至2012年9月22日，香港政府於上水寶運路草地舉行最後一次公眾論壇，有約6,000人登記入場。發展局局長陳茂波於會上多次被質疑為何香港「無地建屋」，回應時首次披露，香港政府現時持有的4,000多公頃土地（約9個天水圍面積）之說實屬誤解，事實上只有2,100多公頃為住宅用地，當中6成，即1,200公頃需要預留予原居民興建丁屋；撥歸一般市民的公私營住宅地只有480公頃。陳茂波說，會確保新市鎮是香港人的新市鎮，包括興建公共屋邨和居屋，私營房屋都是中小型單位，以及引入港人港地條款等。諮詢會結束後，陳茂波等官員在數十名警務人員的護送下，擾攘了10多分鐘才能夠乘車離開現場；其間有人向他掟水樽，更幾乎擊中陳，有人更向官員掟示威物品及撒陰司紙。',
                        source: ['維基百科新界東北發展計劃條目', '圖片：蘋果']
                    }, {
                        image: 'http://orientaldaily.on.cc/cnt/news/20120924/photo/0924-00176-025b1.jpg?t=1403949195579',
                        text: '2012年，林鄭月娥（時任發展局局長）在立法會回答議員時提及，會採取這傳統新市鎮發展模式，用公帑收回所需土地以免除公眾對官商勾結利益輸送的憂慮。2013年陳茂波推出「傳統新市鎮發展模式加強版」容許業主補地價後自行興建樓宇出售，毋須先交回土地予政府，然後再公開競投。',
                        source: [{
                            ref: '發展局局長與傳媒談話內容',
                            url: 'http://www.devb.gov.hk/tc/sdev/press/index_id_7364.html'
                        }, {
                            ref: 'on.cc圖片',
                            url: 'http://orientaldaily.on.cc/cnt/news/20120924/00176_025.html'
                        }],
                    },
                    {
                            image: 'http://static.apple.nextmedia.com/images/apple-photos/apple/20130722/rphoto/1374432578_3407.jpg',
                            text: '2013年7月《蘋果》揭發，陳茂波太太許步明及家人在古洞北發展區擁有最少三幅農地，由陳於94年以35萬元親自買入，政府收地時估計可坐收1,245萬元賠償，大賺35倍。陳茂波家族持有的三幅相連地皮位於古洞北河上鄉路附近，佔地近1.5萬平方呎，與新發展區擬建的古洞鐵路站僅數十米之隔。陳茂波回應指自己在持有古洞地皮的Orient Express沒有實際權益，稱「該公司是我太太及其家人的」，而《蘋果》取得 該海外公司文件顯示，公司大股東許步明持有九成股份，餘下一成由陳茂波兒子陳天行（Chan Tian Hsing）持有，',
                            source: [{
                                ref: '硬銷東北　陳茂波囤地自肥',
                                url: 'http://hk.apple.nextmedia.com/news/art/20130722/18343730'
                            }, {
                                ref: 'on.cc圖片',
                                url: 'http://orientaldaily.on.cc/cnt/news/20120924/00176_025.html'
                            }]
                        },
                        {
                            image: 'http://imgs.ntdtv.com/pic/2014/6-6/p4877271a211387939.jpg',
                            text: '2014年6月6日，立法會審議新界東北發展區的前期撥款申請期間，上百名反對新界東北發展計劃的示威者衝入立法會，並且發生佔領立法會事件。6月13日，逾千名反東北發展群眾在立法會外外集會，觀看會議直播，要求政府撤回新界東北發展計劃。由於會內議員提出大量臨時動議「拉布」，撥款一直未能表決。凌晨2時，警方加強警力，展開清場行動。',
                             source: [{
                                ref: '硬銷東北　陳茂波囤地自肥',
                                url: 'http://hk.apple.nextmedia.com/news/art/20130722/18343730'
                            }, {
                                ref: '獨立媒體圖片',
                                url: 'http://www.ntdtv.com/xtr/b5/2014/06/06/a1114680.html'
                            }]
                        },
                        {
                            image: 'http://imgs.ntdtv.com/pic/2014/6-6/p4877271a211387939.jpg',
                            text: '2014年6月6日，立法會審議新界東北發展區的前期撥款申請期間，上百名反對新界東北發展計劃的示威者衝入立法會，並且發生佔領立法會事件。6月13日，逾千名反東北發展群眾在立法會外外集會，觀看會議直播，要求政府撤回新界東北發展計劃。由於會內議員提出大量臨時動議「拉布」，撥款一直未能表決。凌晨2時，警方加強警力，展開清場行動。',
                             source: [{
                                ref: '硬銷東北　陳茂波囤地自肥',
                                url: 'http://hk.apple.nextmedia.com/news/art/20130722/18343730'
                            }, {
                                ref: '獨立媒體圖片',
                                url: 'http://www.ntdtv.com/xtr/b5/2014/06/06/a1114680.html'
                            }]
                        },
                        {
                            image: 'http://cdn.thehousenews.net/media/photos/cache/NTvote1_g7tfH_600x0.png',
                            text: '2014年6月27日，立法會財委會上，新界東北發展計劃前期撥款，主席吳亮星趁泛民議員群起離座與其議論，宣佈開始表決。撥款以29票贊成對2票反對，獲得通過。在會議10點結束前數分鐘，泛民議員指表決結果非法，表明會進行司法覆核。會議甫結束，吳亮星即在多名保安護送下離開會議廳。會議期間泛民議員反覆提出規程問題，吳亮星均僅簡短回應，數度無視會議法律顧問的意見，連針對主席的不信任動議也沒有處理，更曾三度驅逐議員離開會議廳（但兩度自行撤銷裁決）。根據財委會會議程序，主席須在表決前詢問議員是否有進一步提問，但吳亮星限制每名議員，僅可提出一條問題並限時一分鐘；議員批評此決定不符會議程序，吳亮星沒有處理。',
                             source: [ {
                                ref: '主場新聞圖片及報導：東北前期撥款通過 泛民圍主席台吳亮星強行表決',
                                url: 'http://thehousenews.com/NT-northeast/%E6%9D%B1%E5%8C%97%E5%89%8D%E6%9C%9F%E6%92%A5%E6%AC%BE%E9%80%9A%E9%81%8E-%E6%B3%9B%E6%B0%91%E5%9C%8D%E4%B8%BB%E5%B8%AD%E5%8F%B0%E5%90%B3%E4%BA%AE%E6%98%9F%E5%BC%B7%E8%A1%8C%E8%A1%A8%E6%B1%BA/'
                            }]
                        }];

                    _.each(slidesSource, function(slide) {
                        $scope.slides.push({
                            text: $sce.trustAsHtml(slide.text),
                            image: slide.image
                        });
                    })
                    console.log($scope.slides);

                }
            ])
        .controller('ModalCtrl', ['$scope', '$modal',
            function($scope, $modal) {
                $scope.open = function(size) {

                    var modalInstance = $modal.open({
                        templateUrl: 'templates/modal-content.html',
                        controller: 'ModalInstanceCtrl',
                        size: size,
                        resolve: {
                            items: function() {
                                return $scope.items;
                            }
                        }
                    });

                    modalInstance.result.then(function(selectedItem) {
                        $scope.selected = selectedItem;
                    }, function() {});
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

                $scope.loadingInfoPromise = {};

                $scope.selectArea =function(areaId) {
                    $scope.areaSelectedId = areaId;
                };
                $scope.defaultCenter = {
                    lat: 22.52,
                    lng: 114.111,
                    zoom: 13
                };


                $scope.displayedMarkers = {};

                $scope.displayedMarkers["a"] = _getMarker();


                function _getMarker() {
                    // return {
                    //            lat: event.lat !== "" ? parseFloat(event.lat) : 0,
                    //            lng: event.lng !== "" ? parseFloat(event.lng) : 0,
                    //            // layer: event.contract,
                    //            group:event.contract,
                    //            message: _getMessage(event),
                    //            focus: false,
                    //            draggable: false,
                    //            // fa-road,legal,gear
                    //            icon: {
                    //                type: 'awesomeMarker',
                    //                icon: 'road',
                    //                prefix: 'fa',
                    //                markerColor: event.isDelay ? 'red' : 'darkblue'
                    //            }
                    //        };

                    return {
                        lat: 22.49,
                        lng: 114.101,
                        // message: 'hi',
                        focus: true
                    }
                }

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
                            color: "blue",
                            opacity: 0
                        },
                        "s_fln_1": {
                            name: "粉嶺北",
                            color: "#f86767",
                            opacity: 0
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

                    function getOpacity(areaId) {
                        if (typeof areaInfos[areaId].opacity !== 'undefined') {
                            return areaInfos[areaId].opacity
                        } else {
                            return 1;
                        }
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
                            return '<h4>' + key + '</h4>' +
                                '<p>' + x + ' 公頃 ' + obj.point.percent + '%</p>'
                        }

                    };
                    $scope.ppChartTooltipFunction = function() {
                        return function(key, x, obj, e, graph) {
                            return '<h4>' + key + '</h4>' +
                                '<p>' + x + ' 公頃 ' + obj.point.percent + '%</p>'
                        }

                    };

                    var HOUSING_TYPES = ["sub_public_mix", "sub", "private"];

                    function _getDisplayedPublicPrivateChart(calUnit) {
                        function getKey(type) {
                            return "housing_" + type + "_" + calUnit;
                        }
                        var area = [];

                        var dataMap = $scope.areaSelected.dataMap;

                        var housingTotal = 0;
                        _.each(HOUSING_TYPES, function(type) {
                            var key = getKey(type);
                            housingTotal += parseFloat(dataMap[key].size);
                        })

                        _.each(HOUSING_TYPES, function(type) {
                            var key = getKey(type);
                            if (dataMap[key]) {
                                area.push({
                                    key: dataMap[key].key,
                                    y: dataMap[key].size,
                                    percent: (dataMap[key].size / housingTotal * 100).toFixed(2)
                                })

                            }
                        });

                        return area;
                    }

                    function _getDisplayedAreaChart() {
                        var area = [];
                        _.each($scope.areaSelected.sizeByType, function(v, k) {
                            if (k === "area_total" || k === "population") {
                                return;
                            }
                            console.log(k);
                            var size = 0;
                            var percent = 0;
                            if (parseFloat(v.size)) {
                                size = parseFloat(v.size).toFixed(2);
                            }
                            if (size > 0) {
                                percent = (size / $scope.areaSelected.sizeByType["area_total"].size * 100).toFixed(2);
                            }
                            area.push({
                                key: v.key,
                                y: size,
                                percent: percent
                            })
                        });
                        return area;
                    }
                    $scope.$watch('areaSelectedId', function(newVal) {
                        if (!newVal) {
                            return;
                        }
                        $scope.areaSelected = areaInfos[$scope.areaSelectedId];
                        $scope.chartByAreaData = _getDisplayedAreaChart();


                        $scope.ppChartBySize = _getDisplayedPublicPrivateChart("size");
                        $scope.ppChartByUnit = _getDisplayedPublicPrivateChart("unit");
                    })
                    $scope.chartByAreaData = [];

                    _.each(areaInfos, function(v, k) {
                        areaInfos[k].news = {};
                        areaInfos[k].sizeByType = {};
                        areaInfos[k].dataMap = {};
                    });

                    areaInfos["total"] = {
                        name: "古洞北及粉嶺北"
                    };

                    areaInfos["total"].news = {};
                    areaInfos["total"].sizeByType = {};
                    areaInfos["total"].dataMap = {
                        population: {
                            key: "population",
                            size: 0
                        }
                    };


                    function _generateAreaTotal() {

                        _.each(areaInfos, function(aAreaInfo, areaInfosId) {
                            if (!_.contains(['s_fln_1', 's_ktn_1'], areaInfosId)) {
                                return;
                            }

                            _.each(aAreaInfo.sizeByType, function(v, k) {

                                if (!areaInfos["total"].sizeByType[k]) {
                                    areaInfos["total"].sizeByType[k] = {};
                                    areaInfos["total"].sizeByType[k].key = v.key;
                                    areaInfos["total"].sizeByType[k].size = 0;
                                }
                                if (parseFloat(v.size)) {

                                    areaInfos["total"].sizeByType[k].size += parseFloat(v.size);
                                }
                            })
                            areaInfos["total"].dataMap["population"].size += parseInt(aAreaInfo.dataMap["population"].size);

                        })
                    };

                    var loadSpreadSheetPromise = spreadSheetDataService.getAreaByDetails().then(function(data) {
                        // areaInfos

                        // var dataByArea
                        console.log(data);
                        _.each(data, function(aRow) {
                            var areaId = aRow.gsx$areaid.$t;
                            if (!areaId) {
                                return;
                            }
                            if (!_.contains(_.keys(areaInfos), areaId)) {
                                return;
                            }
                            var sizeKey = aRow.gsx$typelabeleng.$t;
                            if (sizeKey.match(/^area_.+/)) {
                                areaInfos[areaId].sizeByType[sizeKey] = {
                                    key: aRow.gsx$typelabeltc.$t,
                                    size: aRow.gsx$areasize.$t //TODO rename as value
                                };
                            } else if (sizeKey !== '') {
                                areaInfos[areaId].dataMap[sizeKey] = {};
                                areaInfos[areaId].dataMap[sizeKey].key = aRow.gsx$typelabeltc.$t;
                                areaInfos[areaId].dataMap[sizeKey].size = aRow.gsx$areasize.$t;
                            }
                            // if(sizeKey===''){

                            // }

                            console.log(areaId);
                            console.log(areaInfos[areaId].sizeByType);


                        });


                        //calculating total
                        _generateAreaTotal();



                        console.log(areaInfos);

                        $scope.areaSelectedId = "total";


                    }).fail(function(err) {
                        console.log(err);
                    });

                    $scope.loadingInfoPromise = loadSpreadSheetPromise;
                    $scope.displayedGeoJSON.style = function(feature) {
                        return {
                            fillColor: getColor(feature.properties.id),
                            weight: 1.5,
                            opacity: 1,
                            color: 'blue',
                            // rgb(174, 199, 232);
                            // dashArray: '3',
                            fillOpacity: getOpacity(feature.properties.id)
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
                            url: '/data/nent_nda_left_onepiece_A_left.png',
                            bounds: [
                                [22.497, 114.083],
                                [22.5257, 114.126]
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
                            url: '/data/nent_nda_left_onepiece_A_right_rotated.png',
                            bounds: [
                                [22.4948, 114.1145],
                                [22.5241, 114.153]
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