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
    'angular-intro',
    'cgBusy'
]).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: 'templates/northeast.html',
            controller: 'MapCtrl',
            reloadOnSearch: false
        });
        $routeProvider.otherwise({
            redirectTo: '/map'
        });
    }
])
    .directive('navByKeys', ['$document',function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                //need global binding anyway
                $document.on("keydown", function(event) {
                    function forceApply() {
                        event.preventDefault();
                        scope.$apply();
                    }
                    if (event.which === 37) {
                        scope.prev();
                        forceApply();
                    } else if (event.which === 39 || event.which === 32) {
                        scope.next();
                        forceApply();
                    } else if (event.which === 27) {
                        scope.$dismiss();
                        forceApply();
                    }
                });
                element.on("$destroy", function() {
                    $document.off("keydown");
                })
                // element.on("keydown", function (event) {
                //         console.log('hotkeys');
                // });
            }
        };
    }])
    .controller('MapInfoAccordionCtrl', ['$scope',
        function($scope) {
            $scope.oneAtATime = true;

            $scope.isShowAreaChart = true;

            $scope.showAreaChart = function(isShow) {
                $scope.isShowAreaChart = isShow == 'true';
            };

            // $scope.status = {
            //     isFirstOpen: true,
            //     isFirstDisabled: false,
            //     isPPChartOpen: false,
            //     isNewsOpen: false
            // };

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
                if ($scope.activeIndex < $scope.slides.length - 1) {
                    $scope.activeIndex++;
                }
            };

                  

            var slidesSource = [{
                    image: '/images/slide_2030.jpg',
                    text: '<h4>新界東北發展計劃背景資料</h4><br />港英政府於1990年代已開始研究發展新界東北成爲新市鎮。1998年，項目被納入香港政府的全港發展策略檢討，惟後來經歷香港經濟衰退，計劃一度被擱置。2007年，香港政府發表《香港2030》，建議開拓古洞北、粉嶺北及坪輋／打鼓嶺新發展區和洪水橋新發展區。 香港行政長官曾蔭權於同年《施政報告》中表示，恢復對這些地區進行新市鎮的規劃及工程研究。',
                    sources: [{
                        ref: '維基百科新界東北發展計劃條目',
                        url: 'https://zh.wikipedia.org/wiki/新界東北發展計劃'
                    }]
                }, {
                    image: '/images/slide_plan.jpg',
                    text: '計劃中政府展開三階段公眾參與：<ul><li>2008年11月－2009年3月：第一階段公眾參與</li><li>2009年11月－2010年3月：第二階段公眾參與</li><li>2012年6月－2012年9月：第三階段公眾參與 <a href="http://www.nentnda.gov.hk/chi/public_3.html#PER" taget="_blank">報告</a></li></ul><br/>2013年7月發表<a href="http://www.nentnda.gov.hk/chi/revised_rodp.html" target="_blank">經修訂的發展方案</a><br />2013年12月20日刊憲<a target="_blank" href="http://www.ozp.tpb.gov.hk/pdf/s_ktn_1_c.pdf">古洞北</a>及<a target="_blank" href="http://www.ozp.tpb.gov.hk/pdf/s_fln_1_c.pdf">粉嶺北</a>法定圖則',
                    sources: [{
                        ref: '官方活動時間表',
                        url: 'http://www.nentnda.gov.hk/chi/timetable.html'
                    }]
                }, {
                    image: '/images/slide_3consult.jpg',
                    text: '2012年8月18日， 政府於粉嶺祥華社區會堂舉行居民大會，不過場地只能夠容納320人。場面混亂，整個諮詢會舉行了不足30分鐘就告吹。延至2012年9月22日，香港政府於上水寶運路草地舉行最後一次公眾論壇，有約6,000人登記入場。發展局局長陳茂波於會上多次被質疑為何香港「無地建屋」，回應時首次披露，香港政府現時持有的4,000多公頃土地（約9個天水圍面積）之說實屬誤解，事實上只有2,100多公頃為住宅用地，當中6成，即1,200公頃需要預留予原居民興建丁屋；撥歸一般市民的公私營住宅地只有480公頃。陳茂波說，會確保新市鎮是香港人的新市鎮，包括興建公共屋邨和居屋，私營房屋都是中小型單位，以及引入港人港地條款等。諮詢會結束後，陳茂波等官員在數十名警務人員的護送下，擾攘了10多分鐘才能夠乘車離開現場；其間有人向他掟水樽，更幾乎擊中陳，有人更向官員掟示威物品及撒陰司紙。',
                    sources: [{
                        ref: '維基百科新界東北發展計劃條目',
                        url: 'https://zh.wikipedia.org/wiki/新界東北發展計劃'
                    }, {
                        ref: '圖片：蘋果'
                    }]
                },

                {
                    image: '/images/slide_lam.jpg',
                    text: '2012年，林鄭月娥（時任發展局局長）在立法會回答議員時提及，會採取這傳統新市鎮發展模式，用公帑收回所需土地以免除公眾對官商勾結利益輸送的憂慮。2013年陳茂波推出「傳統新市鎮發展模式加強版」容許業主補地價後自行興建樓宇出售，毋須先交回土地予政府再公開競投。',
                    sources: [{
                        ref: '發展局局長與傳媒談話內容',
                        url: 'http://www.devb.gov.hk/tc/sdev/press/index_id_7364.html'
                    }, {
                        ref: 'on.cc圖片',
                        url: 'http://orientaldaily.on.cc/cnt/news/20120924/00176_025.html'
                    }],
                }, {
                    image: '/images/slide_cmp.jpg',
                    text: '2013年7月《蘋果》揭發，陳茂波太太許步明及家人在古洞北發展區擁有最少三幅農地，由陳於94年以35萬元親自買入，政府收地時估計可坐收1,245萬元賠償，大賺35倍。陳茂波家族持有的三幅相連地皮位於古洞北河上鄉路附近，佔地近1.5萬平方呎，與新發展區擬建的古洞鐵路站僅數十米之隔。陳茂波回應指自己在持有古洞地皮的Orient Express沒有實際權益，稱「該公司是我太太及其家人的」，而《蘋果》取得 該海外公司文件顯示，公司大股東許步明持有九成股份，餘下一成由陳茂波兒子陳天行（Chan Tian Hsing）持有，',
                    sources: [{
                        ref: '硬銷東北　陳茂波囤地自肥',
                        url: 'http://hk.apple.nextmedia.com/news/art/20130722/18343730'
                    }]
                }, {
                    image: '/images/slide_conflict_of_interest.gif',
                    text: '2013年8月蘋果日報對新界東北住宅發展區域逾1,500個地段查冊，審視區內土地業權分佈，發現四大發展商已瓜分逾552萬呎地，其中恒基地產、長實和新世界有逾四成土地座落私人發展區，可換地自行發展，單是恒地估計就坐收300億元。「4000平方米直接發展」的政策被指是向囤積農地的四大地產商度身訂造。2014年6月6日立法會規劃署助理署長胡潔貞否認在規劃時政府有作業權調查，陳茂波於6月15日卻指政府在08至09年發展有關項目前，曾聘請顧問做研究，當中包括業權資料。',
                    sources: [{
                        ref: '蘋果日報報導及圖片－恒地長實新世界東北發展大贏家 逾四成土地座落私人發展區',
                        url: 'http://hk.apple.nextmedia.com/news/art/20130826/18394803'
                    }, {
                        ref: '影片－2014年6月6日張超雄立法會質問政府有否作業權調查',
                        url: 'https://www.youtube.com/watch?v=3i5ShVvjOrw'
                    }, {
                        ref: 'RTHK報導- 發展東北　陳茂波稱業權誰屬非考慮因素',
                        url: 'https://hk.news.yahoo.com/%E7%99%BC%E5%B1%95%E6%9D%B1%E5%8C%97-%E9%99%B3%E8%8C%82%E6%B3%A2%E7%A8%B1%E6%A5%AD%E6%AC%8A%E8%AA%B0%E5%B1%AC%E9%9D%9E%E8%80%83%E6%85%AE%E5%9B%A0%E7%B4%A0-014800334.html'
                    }, {
                        ref: '獨立媒體－政府公然欺騙立法會 隱瞞曾進行新界東北業權調查',
                        url: 'http://www.inmediahk.net/node/1023554'
                    }],
                },

                {
                    image: '/images/slide_jun6.jpg',
                    text: '2014年6月6日，立法會審議新界東北發展區的前期撥款申請期間，上百名反對新界東北發展計劃的示威者衝入立法會，並且發生佔領立法會事件。6月13日，逾千名反東北發展群眾在立法會外外集會，觀看會議直播，要求政府撤回新界東北發展計劃。由於會內議員提出大量臨時動議「拉布」，撥款一直未能表決。凌晨2時，警方加強警力，展開清場行動。',
                    sources: [{
                        ref: '維基百科新界東北發展計劃條目',
                        url: 'https://zh.wikipedia.org/wiki/新界東北發展計劃'
                    }, {
                        ref: '獨立媒體圖片',
                        url: 'http://www.ntdtv.com/xtr/b5/2014/06/06/a1114680.html'
                    }]
                }, {
                    image: '/images/slide_jun27.png',
                    text: '2014年6月27日，立法會財委會上，新界東北發展計劃前期撥款，主席吳亮星趁泛民議員群起離座與其議論，宣佈開始表決。撥款以29票贊成對2票反對，獲得通過。在會議10點結束前數分鐘，泛民議員指表決結果非法，表明會進行司法覆核。會議甫結束，吳亮星即在多名保安護送下離開會議廳。會議期間泛民議員反覆提出規程問題，吳亮星均僅簡短回應，數度無視會議法律顧問的意見，連針對主席的不信任動議也沒有處理，更曾三度驅逐議員離開會議廳（但兩度自行撤銷裁決）。根據財委會會議程序，主席須在表決前詢問議員是否有進一步提問，但吳亮星限制每名議員，僅可提出一條問題並限時一分鐘；議員批評此決定不符會議程序，吳亮星沒有處理。',
                    sources: [{
                        ref: '主場新聞圖片及報導：東北前期撥款通過 泛民圍主席台吳亮星強行表決',
                        url: 'http://thehousenews.com/NT-northeast/%E6%9D%B1%E5%8C%97%E5%89%8D%E6%9C%9F%E6%92%A5%E6%AC%BE%E9%80%9A%E9%81%8E-%E6%B3%9B%E6%B0%91%E5%9C%8D%E4%B8%BB%E5%B8%AD%E5%8F%B0%E5%90%B3%E4%BA%AE%E6%98%9F%E5%BC%B7%E8%A1%8C%E8%A1%A8%E6%B1%BA/'
                    }, {
                        ref: '財務委員會通過新界東北前期撥款前後影片',
                        url: 'https://www.youtube.com/watch?v=BKOmjirCPls'

                    }]
                }
            ];

            _.each(slidesSource, function(slide) {
                $scope.slides.push({
                    text: $sce.trustAsHtml(slide.text),
                    image: slide.image,
                    sources: slide.sources
                });
            })

        }

    ])
    .factory('q', function() {
        return Q;
    })
    .service('spreadSheetDataService', ['$http', 'q',
        function($http, Q) {
            var URL = 'https://spreadsheets.google.com/feeds/list/1wgGlXYbGUNIBu4TX3UAC334iI1KwwGbynZlF3-NNv4s/746094374/public/values?alt=json';
            var POI_URL = 'https://spreadsheets.google.com/feeds/list/1wgGlXYbGUNIBu4TX3UAC334iI1KwwGbynZlF3-NNv4s/1670720169/public/values?alt=json';

            var _service = {};

            _service.getSpreadSheet = function(url) {
                return Q($http.get(url)).then(function(res) {
                    return res.data.feed.entry;
                });
            };
            _service.getAreaByDetails = function() {
                return _service.getSpreadSheet(URL);
            };

            _service.getPointOfInterest = function() {
                return _service.getSpreadSheet(POI_URL);
            };
            return _service;

        }
    ])

.service('mapDataService', ['$http', 'q',
    function($http, Q) {
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
.controller('MapCtrl', ['$scope', 'mapDataService', 'spreadSheetDataService', 'leafletData', '$location', '$modal', '$interpolate',
    function($scope, mapDataService, spreadSheetDataService, leafletData, $location, $modal, $interpolate) {
                    $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false,
                isPPChartOpen: false,
                isNewsOpen: false,
                isLegendOpen:false
            };
  $scope.IntroOptions = {
            steps: [{
                    element: '#map',
                    intro: "地圖放大可見分區規劃圖層、右上角可選擇顯示圖層；點擊標記可見相關資料、點擊地區可看該區數據。",
                    position: 'top'
                },
                {
                    element: '#landuse',
                    intro: "可見分區／總合土地分佈圖",
                    position: 'bottom'
                },
                {
                    element: '#housing',
                    intro: "可見總合公私營房屋分佈",
                    position: 'bottom'
                }
            ],
            showStepNumbers: false,
            exitOnOverlayClick: true,
            showBullets: false,
            exitOnEsc: true,
            nextLabel: '<strong>NEXT</strong>',
            prevLabel: '<span style="color:green">Previous</span>',
            skipLabel: 'OK',
            doneLabel: 'OK',
            overlayOpacity: 0.1
        };

$scope.onAfterChange = function(targetElement) {
    console.log("Change Event called");
    console.log(targetElement);
    if(targetElement.id==="housing"){
            $scope.status.isPPChartOpen=true;
            $scope.$apply();
    }else{

    }
};

        $scope.openModal = function() {

            var modalInstance = $modal.open({
                templateUrl: 'templates/modal-content.html',
                controller: 'ModalInstanceCtrl',
                windowClass: 'background-modal',
                resolve: {
                    items: function() {
                        return $scope.items;
                        $location.search('background')
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                // $location.search('background',false)
            }, function() {});

            modalInstance.result.finally(function() {
                // $scope.startIntro();
                $location.search('background', null);
            })
        };

        $scope.openVideoModal = function() {

            var modalInstance = $modal.open({
                templateUrl: 'templates/modal-video.html',
                resolve: {
                    items: function() {
                        return $scope.items;
                        $location.search('background')
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                // $location.search('background',false)
            }, function() {});

            modalInstance.result.finally(function() {
                $location.search('video', null);
            })
        };



        $scope.loadingInfoPromise = {};
        $scope.$on('$locationChangeSuccess', function() {
            var isBasic = $location.search().background ? true : false;
            var isVideo = $location.search().video ? true : false;

            if (isBasic) {
                $scope.openModal();
            } else if (isVideo) {
                $scope.openVideoModal();
            }


        })
        $scope.openModal();
        $scope.selectArea = function(areaId) {
            $scope.areaSelectedId = areaId;
        };
        $scope.defaultCenter = {
            lat: 22.52349854314378,
            lng: 114.12760734558105,
            zoom: 13
        };
        $scope.displayedMarkers = {};


        $scope.defaults = {
            // crs: 'Simple',
            reuseTiles:true,
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
                    color: "#16B900",
                    center: {
                        lat: 22.491741758372008,
                        lng: 114.11580562591551
                    },

                },
                "s_ktn_1": {
                    name: "古洞北",
                    color: "blue",
                    center: {
                        lat: 22.508195934393456,
                        lng: 114.10469055175781
                    },
                    opacity: 0
                },
                "s_fln_1": {
                    name: "粉嶺北",
                    color: "#f86767",
                    center: {
                        lat: 22.509147441324007,
                        lng: 114.13310050964355
                    },
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
                        '<p>' + x + ' 公頃 ' + obj.point.percent + '%</p>';
                }

            };
            $scope.ppChartTooltipFunction = function() {
                return function(key, x, obj, e, graph) {
                    return '<h4>' + key + '</h4>' +
                        '<p>' + x + ' 公頃 ' + obj.point.percent + '%</p>';
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
                    var description = "";
                    if (parseFloat(v.size)) {
                        size = parseFloat(v.size).toFixed(2);
                    }
                    if (size > 0) {
                        percent = (size / $scope.areaSelected.sizeByType["area_total"].size * 100).toFixed(2);
                    }
                    if (v.description) {
                        description = v.description;
                    }
                    area.push({
                        key: v.key,
                        y: size,
                        percent: percent,
                        description: description
                    })
                });
                return area;
            }
            $scope.$watch('areaSelectedId', function(newVal) {
                if (!newVal) {
                    return;
                }
                $scope.areaSelected = areaInfos[$scope.areaSelectedId];
                if ($scope.areaSelected.center) {
                    $scope.defaultCenter = angular.copy($scope.areaSelected.center);
                    if (newVal === "total") {
                        $scope.defaultCenter.zoom = 13;
                    } else {
                        $scope.defaultCenter.zoom = 15;
                    }
                }

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
            areaInfos["total"].center = angular.copy($scope.defaultCenter);
            // 

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
            // https://spreadsheets.google.com/feeds/list/1wgGlXYbGUNIBu4TX3UAC334iI1KwwGbynZlF3-NNv4s/1670720169/public/values?alt=json


            var loadPoiPromise = spreadSheetDataService.getPointOfInterest().then(function(data) {

                var markerMessageTemplate = '<h6><b>{{label}}</b><span class="pull-right">{{date}}</span></h6><div>{{details}}</div>相關資料：';


                //ng-repeat won't work in $interpolate, DIY

                function _getMakerMessage(label, details, sources) {

                    var sourceTags = '<ul>';
                    _.each(sources, function(source) {
                        sourceTags += '<li>' + '<a target="_blank" href="' + source.sourceLink + '">' + source.sourceName + "</a>"
                    })
                    sourceTags += '<ul>';
                    return $interpolate(markerMessageTemplate)({
                        label: label,
                        details: details,
                    }) + sourceTags;
                }

                var uniqueMakers = {};
                _.each(data, function(aRow) {
                    var lat = aRow.gsx$lat.$t;
                    var lng = aRow.gsx$lng.$t;
                    var label = aRow.gsx$event.$t;
                    var key = aRow.gsx$sourceid.$t;
                    if (lat === "" || lng === "") {
                        return;
                    }
                    var sourceName = aRow.gsx$source.$t;
                    var sourceLink = aRow.gsx$sourcelink.$t;
                    var details = aRow.gsx$eventfulldetails.$t;
                    var locationKey = lat + "_" + lng;
                    var displaySource = {
                        sourceName: sourceName,
                        sourceLink: sourceLink
                    };
                    if (uniqueMakers[locationKey]) {
                        uniqueMakers[locationKey].sources.push(displaySource);
                    } else {
                        var marker = {
                            lat: parseFloat(lat),
                            lng: parseFloat(lng),
                            label: label,
                            details: details,
                            key: key,
                            zoom:15,
                            sources: [displaySource]
                        }
                        uniqueMakers[locationKey] = marker;
                    }
                    console.log(marker);

                });


                var additionalMarkers = {};
                _.each(uniqueMakers, function(v, k) {
                    v.message = _getMakerMessage(v.label, v.details, v.sources);
                    additionalMarkers[v.key] = v;
                })

                //can't use float as JSON key
                angular.extend($scope.displayedMarkers, additionalMarkers);


            })

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
                    var description = aRow.gsx$description.$t;
                    if (sizeKey.match(/^area_.+/)) {
                        areaInfos[areaId].sizeByType[sizeKey] = {
                            key: aRow.gsx$typelabeltc.$t,
                            size: aRow.gsx$areasize.$t, //TODO rename as value
                            description: description
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
                    name: "古洞北規劃圖",
                    type: 'imageOverlay',
                    url: '/data/nent_nda_left_onepiece_A_left.png',
                    bounds: [
                        [22.497, 114.083],
                        [22.5257, 114.126]
                    ],
                    visible: true,
                    layerOptions: {
                        noWrap: true,
                        opacity: 0.8
                    }
                },
                s_ktn_1_right: {
                    name: '粉嶺北規劃圖',
                    type: 'imageOverlay',
                    url: '/data/nent_nda_left_onepiece_A_right_rotated.png',
                    bounds: [
                        [22.4948, 114.1145],
                        [22.5241, 114.153]
                    ],
                    visible: true,
                    layerOptions: {
                        noWrap: true,
                        opacity: 0.8
                    }
                },
                toxic_layer: {
                    name: '古洞砒霜分佈地層',
                    type: 'imageOverlay',
                    url: '/data/toxicarea_layer.png',
                    bounds: [
                        [22.497, 114.083],
                        [22.5257, 114.126]
                    ],
                    visible: true,
                    layerOptions: {
                        noWrap: true,
                        opacity: 0.8
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