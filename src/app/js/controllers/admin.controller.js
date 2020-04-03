'use strict';

angular.module('AdminController', [])
    .controller('AdminController', [
        '$rootScope', '$scope', '$http', '$log', '$state', 'API_BASE_URL', 'APIService',
        function ($rootScope, $scope, $http, $log, $state, API_BASE_URL, APIService) {

            $scope.hakuState = true;
            $scope.personsToBeDeleted = [];

            $scope.editPerson = function (person) {
                console.log(person);
                $scope.selectedPerson = angular.copy(person);
                $scope.showEditDialog = true;
            };

            $scope.closeForm = function () {
                $scope.selectedPerson = {};
                console.log($scope.selectedPerson);
                $scope.showEditDialog = false;
            };

            $scope.savePerson = function() {

                delete($scope.selectedPerson.modified);
                let id = $scope.selectedPerson.id;
                let url = API_BASE_URL + 'persons/update/' + id;

                $http({
                    method: 'PUT',
                    url: url,
                    data: $scope.selectedPerson,
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(function (response) {

                        $scope.closeForm();
                        $scope.search = "";

                        console.log (response.data);
                        APIService.getPersonData()
                            .then(function (res) {
                              $scope.persons = res.persons;
                            })

                    })
                    .catch(function (error) {
                        $log.error(error.data);
                    });

            };

            // lataussivu

            $scope.csvurl = API_BASE_URL + 'persons/download';

            $scope.csvFile = {
                file: null
            };

            $scope.uploadCsv = function (file) {
                APIService.postCsvFile(file)
                    .then(function (res) {
                        if (res.data.length < 1) {
                            $scope.saveCsvData();
                        } else {
                            $scope.personsToBeDeleted = res.data;
                        }
                    }).catch(function (err) {
                        console.log(err);
                    })
            };

            $scope.saveCsvData = function() {
                APIService.post("persons/save", $scope.personsToBeDeleted)
                    .then(function (res) {
                        if (res.status === 500) {
                            $scope.csvUploadError = true;
                            $scope.csvUploadErrorText = "Csv upload error with message: " +
                                res.data + " and status: " + res.status
                        }

                        $scope.personsToBeDeleted = [];
                        $scope.csvFile = {
                            file: null
                        };

                    })
            };

            $scope.discardChanges = function () {
                APIService.delete("persons/poista", null)
                    .then(function (res) {
                        console.log(res);
                        $scope.personsToBeDeleted = [];
                        $scope.csvFile = {
                            file: null
                        };
                    }).catch(function (err) {
                        console.log(err);
                    })
            }


        }
    ]);