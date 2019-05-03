'use strict';

angular.module('JulkaisunsyottoController', [])
    .controller('JulkaisunsyottoController', [
        '$scope', '$rootScope', '$stateParams', '$log', 'Upload', 'JustusService', 'APIService', 'ExternalServicesService', 'API_BASE_URL',
        function($scope, $rootScope, $stateParams, $log, Upload, JustusService, APIService, ExternalServicesService, API_BASE_URL) {

        $scope.file = JustusService.file;
        $scope.syotaJulkaisu = false;
        $scope.rinnakkaistallennettumuualle = false;

        if ( $rootScope.filedata.filename) {
            $scope.syotaJulkaisu = true;
        }

        if (!$rootScope.filedata.filename && $scope.justus.julkaisu.julkaisurinnakkaistallennettu === "1") {
            $scope.rinnakkaistallennettumuualle = true;
        }

        if ($scope.justus.julkaisu.julkaisurinnakkaistallennettu === "0") {
            $scope.eirinnakkaistellennettava = true;
        }

        $scope.updateRinnakkaistallennusData = function(file) {

            if ($scope.file || $rootScope.filedata.filename) {
                $scope.file = file;
                JustusService.file = $scope.file;
                if (!$rootScope.filedata.filename) {
                    $rootScope.filedata.filename = file.name;
                }
                $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "1";
                $scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite = "";
            }
            else if ($scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite &&
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
                APIService.delete($stateParams.id)
                    .then((response) => {
                        if (response.status !== 500) {
                            JustusService.file = null;
                            $scope.fileAlreadyExists = false;
                            delete $rootScope.filedata;
                            $rootScope.filedata = {};
                            $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "0";
                            $scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite = "";
                        } else {
                            $log.error('delete ERROR ' + response.data);
                        }
                    })
            };

            $scope.getLink = function() {
                return API_BASE_URL + "download/" + $stateParams.id ;
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

            // for developing purposes
            $scope.upload = function (file) {

                $rootScope.filedata.filename = file.name;

                Upload.upload({
                    url: 'http://10.10.10.10:8080/api/upload',
                    data: { file: file, data: $rootScope.filedata },
                    method: 'POST'

                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log(resp);
                    $log.error('Error status: ' + resp.status);
                    $log.error('Error message: ' + resp.data);
                }, function (evt) {
                    // console.log(evt);
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };


        }


        ]);