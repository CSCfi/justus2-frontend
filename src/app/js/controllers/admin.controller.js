'use strict';

angular.module('AdminController', [])
    .controller('AdminController', [
        '$rootScope', '$scope', '$state', '$http', 'API_BASE_URL', 'APIService', 'AlayksikkoService', 'AuthService',
        function ($rootScope, $scope, $state, $http, API_BASE_URL, APIService, AlayksikkoService, AuthService) {


            // at very first test that user object is accessible
            let verifyAccess = function () {
                if (AuthService.isLoggedIn()) {
                    init();
                } else {
                    AuthService.getUserInfo().then(function (res) {
                        $rootScope.user = res;
                        init();

                    }).catch(function (err) {
                        console.log(err);
                        $state.go('index');

                    });
                }
            };


        let init = function() {

                $scope.hakuState = true;
                $scope.personsToBeDeleted = [];
                $scope.alayksikkovuodet = AlayksikkoService.getAlayksikkovuodet();

                $scope.alayksikkovuosi = {};

                if ($scope.alayksikkovuodet.length === 5) {
                    $scope.alayksikkovuosi.selected = {
                        id: 2020,
                        label: '2020'
                    };
                } else {
                    $scope.alayksikkovuosi.selected = {
                        id: 2019,
                        label: '2019'
                    };
                }

            };

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


            $scope.addAlayksikko = function(input) {
                if ($scope.selectedPerson.alayksikko.indexOf(input) > -1
                    || $scope.selectedPerson.alayksikko.length > 2) return;

                $scope.selectedPerson.alayksikko.push(input);
            };

            $scope.removeAlayksikko = function(index) {
                console.log(index);
                console.log($scope.selectedPerson);
                $scope.selectedPerson.alayksikko.splice(index, 1);
            };

            // get alayksikkodata based on selected year
            $scope.getAlayksikkoData = function(alayksikkovuosi) {
                return AlayksikkoService.getAlayksikkoData(alayksikkovuosi);
            };

            $scope.savePerson = function() {

                delete($scope.selectedPerson.modified);
                let id = $scope.selectedPerson.id;

                APIService.put("persons/update", id, $scope.selectedPerson)
                    .then(function (response) {
                        $scope.closeForm();
                        $scope.search = "";
                        console.log (response);
                        APIService.getPersonData()
                            .then(function (res) {
                                $scope.persons = res.persons;
                            })
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
            };

            verifyAccess();

        }
    ]);