'use strict';

angular.module('JulkaisunsyottoController', [])
    .controller('JulkaisunsyottoController', [
        '$scope', '$rootScope', '$log', 'Upload', 'JustusService', 'FintoService',
        function($scope, $rootScope, $log, Upload, JustusService, FintoService) {


        $scope.file = JustusService.fileData;

        $scope.updateRinnakkaistallennusData = function(file) {

                if (file) {
                    $scope.file = file;
                    JustusService.fileData = $scope.file;
                    $scope.filedata.filename = file.name;
                    $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "1";
                    $scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite = "";
                }
                else if ($scope.justus.julkaisu.rinnakkaistallennetunversionverkkoosoite &&
                    $scope.justus.julkaisu.julkaisurinnakkaistallennettu !== "") {

                    $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "1";
                    JustusService.fileData = null;
                } else {
                    $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "0";
                    JustusService.fileData = null;
                }

            };

            $scope.removeFile = function() {
                $scope.file = null;
            };

            $scope.setMonth = function() {
                let d = new Date();
                console.log(d);
                d.setMonth(d.getMonth() + 6);
                $scope.filedata.embargo = d;
                console.log($scope.filedata.embargo);

            };

            $scope.setYear = function() {
                let d = new Date();
                d.setFullYear(d.getFullYear(), d.getMonth() +12);
                $scope.filedata.embargo = d;
                console.log($scope.filedata.embargo);
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
                FintoService.haeUrn().then(response => {
                    $scope.filedata.urn = response.data.data;
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