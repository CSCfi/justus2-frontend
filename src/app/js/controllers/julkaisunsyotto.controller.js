'use strict';

angular.module('JulkaisunsyottoController', [])
    .controller('JulkaisunsyottoController', [
        '$scope', '$rootScope', '$stateParams', '$log', 'Upload', 'JustusService', 'APIService', 'ExternalServicesService',
        function($scope, $rootScope, $stateParams, $log, Upload, JustusService, APIService, ExternalServicesService) {

        $scope.file = JustusService.file;
        $scope.filedata = JustusService.getFileData();

        $scope.syotaJulkaisu = false;
        $scope.rinnakkaistallennettumuualle = false;

        if ( $scope.filedata.filename) {
            $scope.syotaJulkaisu = true;
        }

        if (!$scope.filedata.filename && $scope.justus.julkaisu.julkaisurinnakkaistallennettu === "1") {
            $scope.rinnakkaistallennettumuualle = true;
        }

        if ($scope.justus.julkaisu.julkaisurinnakkaistallennettu === "0") {
            $scope.eirinnakkaistellennettava = true;
        }

        $scope.updateRinnakkaistallennusData = function(file) {
            if ($scope.file || $scope.filedata.filename) {
                $scope.file = file;
                JustusService.file = $scope.file;
                if (!$scope.filedata.filename) {
                    $scope.filedata.filename = file.name;
                }
                JustusService.filedata = $scope.filedata;
                JustusService.updateFileData($scope.filedata);

                $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "1";
                $scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite = "";
            }
            else if ($scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite &&
                $scope.justus.julkaisu.julkaisurinnakkaistallennettu !== "") {
                $scope.filedata = {};
                $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "1";
                JustusService.file = null;
                JustusService.clearFileData();
            } else {
                $scope.filedata = {};
                $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "0";
                $scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite = "";
                JustusService.file = null;
                JustusService.clearFileData();
            }

        };

            // format date
            if ($scope.filedata.embargo) {
                $scope.filedata.embargo =  new Date($scope.filedata.embargo);
            }

            $scope.setMonth = function() {
                let d = new Date();
                d.setMonth(d.getMonth() + 6);
                $scope.filedata.embargo = d;

            };

            $scope.setYear = function() {
                let d = new Date();
                d.setFullYear(d.getFullYear(), d.getMonth() +12);
                $scope.filedata.embargo = d;
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
                    $scope.filedata.urn = response.data.data;
                })
            };

            $scope.removeFile = function() {
              $scope.file = null;
              $scope.filedata = {};
              $scope.fileAlreadyExists = false;
              JustusService.clearFileData();
              JustusService.file = null;
            };

            $scope.removeFileFromServer = function() {
                APIService.delete($stateParams.id)
                    .then((response) => {
                        if (response.status !== 500) {
                            JustusService.file = null;
                            JustusService.clearFileData();
                            $scope.fileAlreadyExists = false;
                            $scope.filedata = {};
                            console.log(response.data);
                        } else {
                            $log.error('delete ERROR ' + response.data);
                        }
                    })
            };

            // for developing purposes
            $scope.upload = function (file) {

                $scope.filedata.filename = file.name;

                Upload.upload({
                    url: 'http://10.10.10.10:8080/api/upload',
                    data: { file: file, data: $scope.filedata },
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