'use strict';

angular.module('AlayksikkoService', [])
    .service('AlayksikkoService', [
        '$http', '$rootScope',
        function ($http, $rootScope) {

            this.getAlayksikkoData = function(alayksikkovuosi) {

                if (alayksikkovuosi.id === 2016) {
                    for (let i = 0; i < $rootScope.user.alayksikot.length; i++) {
                        if ($rootScope.user.alayksikot[i].vuosi === '2016') {
                            return $rootScope.user.alayksikot[i].yksikot;
                        }
                    }
                }

                if (alayksikkovuosi.id === 2017) {
                    for (let i = 0; i < $rootScope.user.alayksikot.length; i++) {
                        if ($rootScope.user.alayksikot[i].vuosi === '2017') {
                            return $rootScope.user.alayksikot[i].yksikot;
                        }
                    }
                }

                if (alayksikkovuosi.id === 2018) {
                    for (let i = 0; i < $rootScope.user.alayksikot.length; i++) {
                        if ($rootScope.user.alayksikot[i].vuosi === '2018') {
                            return $rootScope.user.alayksikot[i].yksikot;
                        }
                    }
                }

                if (alayksikkovuosi.id === 2019) {
                    for (let i = 0; i < $rootScope.user.alayksikot.length; i++) {
                        if ($rootScope.user.alayksikot[i].vuosi === '2019') {
                            return $rootScope.user.alayksikot[i].yksikot;
                        }
                    }
                }

                if (alayksikkovuosi.id === 2020) {
                    for (let i = 0; i < $rootScope.user.alayksikot.length; i++) {
                        if ($rootScope.user.alayksikot[i].vuosi === '2020') {
                            return $rootScope.user.alayksikot[i].yksikot;
                        }
                    }
                }
            };

            this.getAlayksikkovuodet = function () {

                let alayksikkovuodet = [];

                for (let i=0; i < $rootScope.user.alayksikot.length; i++) {
                    if($rootScope.user.alayksikot[i].vuosi === '2020') {
                        if($rootScope.user.alayksikot[i].yksikot.length < 1) {
                            alayksikkovuodet = [
                                {
                                    id: 2016,
                                    label: '2016'
                                },
                                {
                                    id: 2017,
                                    label: '2017'
                                },
                                {
                                    id: 2018,
                                    label: '2018'
                                },
                                {
                                    id: 2019,
                                    label: '2019'
                                }
                            ];
                        } else {
                            alayksikkovuodet = [
                                {
                                    id: 2016,
                                    label: '2016'
                                },
                                {
                                    id: 2017,
                                    label: '2017'
                                },
                                {
                                    id: 2018,
                                    label: '2018'
                                },
                                {
                                    id: 2019,
                                    label: '2019'
                                },
                                {
                                    id: 2020,
                                    label: '2020'
                                }
                            ];
                        }
                    }
                }

                return alayksikkovuodet;

            }


        }
    ]);