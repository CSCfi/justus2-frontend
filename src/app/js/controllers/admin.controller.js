'use strict';

angular.module('AdminController', [])
    .controller('AdminController', [
        '$rootScope', '$scope', '$state', '$window', '$http', 'API_BASE_URL', 'APIService', 'AlayksikkoService', 'AuthService',
        function ($rootScope, $scope, $state, $window, $http, API_BASE_URL, APIService, AlayksikkoService, AuthService) {


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

            $scope.csvData = '';

            };

            $scope.editPerson = function (person) {
                $window.scrollTo(0, 0);
                $scope.selectedPerson = angular.copy(person);
                $scope.showEditDialog = true;
            };

            $scope.showPublications = function(person) {
                $window.scrollTo(0, 0);
                APIService.get("persons/publications", person.orcid)
                    .then(function (response) {
                        console.log(response);
                        $scope.publicationList = response.publications;
                        $scope.personToShow =  person;
                        $scope.showList = true;
                    }).catch(function (err) {
                    console.log(err);
                });

            };

            $scope.closeList = function() {
                $scope.showList = false;
            };

            $scope.closeForm = function () {
                $scope.selectedPerson = {};
                $scope.showEditDialog = false;
            };


            $scope.addAlayksikko = function(input) {
                if ($scope.selectedPerson.alayksikko.indexOf(input) > -1
                    || $scope.selectedPerson.alayksikko.length > 2) return;

                if (!$scope.selectedPerson.alayksikko[0]) {
                    $scope.selectedPerson.alayksikko[0] = input;
                } else {
                    $scope.selectedPerson.alayksikko.push(input);
                }
            };

            $scope.removeAlayksikko = function(index) {
                $scope.selectedPerson.alayksikko.splice(index, 1);
            };

            // get alayksikkodata based on selected year
            $scope.getAlayksikkoData = function(alayksikkovuosi) {
                return AlayksikkoService.getAlayksikkoData(alayksikkovuosi);
            };


            $scope.addPerson = function() {
              $window.scrollTo(0, 0);
              $scope.selectedPerson = {
                  "hrnumero": "",
                  "etunimi": "",
                  "sukunimi": "",
                  "orcid": null,
                  "alayksikko": [null]
              };
              $scope.showEditDialog = true;
            };

            $scope.savePerson = function() {
                let promise;
                if ($scope.selectedPerson.id) {
                    //  update
                    let id = $scope.selectedPerson.id;
                    delete($scope.selectedPerson.modified);
                    promise = APIService.put("person/update", id, $scope.selectedPerson);
                } else {
                    // post
                    promise = APIService.post("person/save", $scope.selectedPerson);
                }

                promise.then(function (response) {
                    console.log(response);
                    $scope.closeForm();
                    $scope.search = "";
                    fetchPersonData();
                    // $window.scrollTo(0, 0);
                }).catch(function (err) {
                    console.log(err);
                })

            };

            $scope.removePerson = function() {
                let id = $scope.selectedPerson.id;
                console.log(id);
                APIService.delete("persons/remove", id)
                    .then(function (response) {
                        console.log(response);
                        $scope.selectedPerson = {};
                        $scope.showEditDialog = false;
                        // state reload?
                        fetchPersonData();
                    }).catch(function (err) {
                        console.log(err);
                })

            };


            let fetchPersonData = function() {
                APIService.getPersonData()
                    .then(function (res) {
                        $scope.persons = res.persons;
                    })
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
                APIService.delete("persons/csv-remove", null)
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