'use strict';

angular.module('JulkaisunsyottoController', [])
    .controller('JulkaisunsyottoController', [
        '$scope', '$rootScope', '$stateParams', '$log', '$anchorScroll', '$location', 'Upload', 'JustusService', 'APIService', 'ExternalServicesService', 'API_BASE_URL',
        function($scope, $rootScope, $stateParams, $log, $anchorScroll, $location,  Upload, JustusService, APIService, ExternalServicesService, API_BASE_URL) {


            $scope.file = JustusService.file;
            $scope.fileAlreadyExists = false;
            $scope.hideRemove = false;

            if ($rootScope.user.jukuriUser && ($scope.justus.julkaisu.julkaisuntila === "1" || $scope.justus.julkaisu.julkaisuntila === "2" || $scope.justus.julkaisu.julkaisuntila === "3")) {
                $scope.hideRemove = true;
            }

            if (JustusService.file) {
                $scope.file = JustusService.file;
                $scope.selectedValue = "syotaJulkaisu";
            } else if ($rootScope.filedata.filename) {
                $scope.fileAlreadyExists = true;
                $scope.selectedValue = "syotaJulkaisu";
            }

            if (!$rootScope.filedata.filename && $scope.justus.julkaisu.julkaisurinnakkaistallennettu === "1"
                && $scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite
                && $scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite !== "") {
                $scope.selectedValue = "rinnakkaistallennettumuualle";
            }

            if (!$scope.justus.julkaisu.julkaisurinnakkaistallennettu || $scope.justus.julkaisu.julkaisurinnakkaistallennettu === "") {
                $scope.justus.julkaisu.julkaisurinnakkaistallennettu =  "1";
            }

            if ($scope.justus.julkaisu.julkaisurinnakkaistallennettu === "0" && !$rootScope.filedata.filename) {
                $scope.selectedValue = "eirinnakkaistellennettava";
            }

            $scope.updateRinnakkaistallennusData = function(file) {

                if (file || $rootScope.filedata.filename) {

                    $scope.file = file;
                    JustusService.file = $scope.file;
                    if (!$rootScope.filedata.filename) {
                        $rootScope.filedata.filename = file.name;
                    }
                }
                else if ($scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite &&
                    $scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite !== "" &&
                    $scope.justus.julkaisu.julkaisurinnakkaistallennettu !== "") {
                    $rootScope.filedata = {};
                    $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "1";
                    JustusService.file = null;
                    delete $rootScope.filedata;
                    $rootScope.filedata = {};
                } else {
                    $rootScope.filedata = {};
                    $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "0";
                    $scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite = "";
                    JustusService.file = null;
                    delete $rootScope.filedata;
                    $rootScope.filedata = {};
                }

            };

            // format date
            if ($rootScope.filedata.embargo) {
                $rootScope.filedata.embargo =  new Date($rootScope.filedata.embargo);
            }

            $scope.setMonth = function() {
                let d = new Date();
                d.setMonth(d.getMonth() + 6);
                $rootScope.filedata.embargo = d;

            };

            $scope.setYear = function() {
                let d = new Date();
                d.setFullYear(d.getFullYear(), d.getMonth() +12);
                $rootScope.filedata.embargo = d;
            };

            $scope.dateOptions = {
                formatYear: 'yyyy',
                minDate: new Date(),
                startingDay: 1
            };

            $scope.openDatepicker = function() {
                $scope.popup.opened = true;
            };

            $scope.format = 'yyyy/MM/dd';

            $scope.popup = {
                opened: false
            };

            $scope.getUrnForTheseusPublications = function() {
                if ($rootScope.user.jukuriUser)  {
                    return;
                } else {
                    $scope.getUrn();
                }
            };


            $scope.getUrn = function() {
                ExternalServicesService.haeUrn().then(response => {
                    $rootScope.filedata.urn = response.data.data;
                }).catch((error) => {
                    console.log(error);
                })
            };

            $scope.removeFile = function() {
                $scope.file = null;
                $scope.fileAlreadyExists = false;
                delete $rootScope.filedata;
                $rootScope.filedata = {};
                JustusService.file = null;
            };

            $scope.removeFileFromServer = function() {
                APIService.delete("julkaisu/poista", $stateParams.id)
                    .then((response) => {
                        console.log(response);
                        if (response.status === 200 || response.status === 404) {
                            JustusService.file = null;
                            $scope.fileAlreadyExists = false;
                            delete $rootScope.filedata.urn;
                            delete $rootScope.filedata.filename;
                            delete $rootScope.filedata.handle;

                            // TODO: check in case of Jukuri publication
                            $scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite = "";
                        } else {
                            $log.error('delete ERROR ' + response.data);
                        }
                    })
            };

            $scope.getLink = function() {
                return API_BASE_URL + "julkaisu/download/" + $stateParams.id ;
            };

            $scope.bytesToSize = function(a,b) {
                {if(0==a)return"0 Bytes";
                    let c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));
                    return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

            };

            $scope.goToTop = function () {
                $location.hash('topOfPage');
                $anchorScroll();
            };


            $scope.version = [
            "0", "1", "2"
            ];

            $scope.rights = [
                "All rights reserved",
                "CC BY 4.0",
                "CC BY-SA 4.0",
                "CC BY-NC 4.0",
                "CC BY-ND 4.0",
                "CC BY-NC-SA 4.0",
                "CC BY-NC-ND 4.0"

            ];

        }


        ]);