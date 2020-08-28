'use strict';

angular.module('AdminController', [])
    .controller('AdminController', [
        '$rootScope', '$scope', '$state', '$stateParams', '$window', '$http', '$uibModal', 'API_BASE_URL', 'JustusService',
        'APIService', 'AlayksikkoService', 'AuthService', 'ValidationService',
        function ($rootScope, $scope, $state, $stateParams, $window, $http, $uibModal, API_BASE_URL, JustusService,
                  APIService, AlayksikkoService, AuthService, ValidationService) {


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

            if ($stateParams.tila === "haku") {
                $scope.hakuState = true;
            }

            if ($stateParams.tila === "vienti") {
                $scope.hakuState = false;
            }

            if (!$stateParams.tila) {
                $scope.hakuState = true;
            }

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

            $scope.isFieldVisible = function(field) {
                return JustusService.isFieldVisible(field);
            };

            $scope.isFieldRequired = function(field) {
                return JustusService.isFieldRequired(field);
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
              $scope.selectedPerson = {
                  "hrnumero": "",
                  "etunimi": "",
                  "sukunimi": "",
                  "orcid": null,
                  "alayksikko": [null]
              };
              $scope.showEditDialog = true;
            };

            $scope.savePerson = function(form) {
                 $scope.invalidFields = [];
                 let error = form.$error;
                 angular.forEach(error.required, function(field) {
                    if(field.$invalid){
                        var fieldName = field.$name;
                        $scope.invalidFields.push(fieldName);
                    }
                });

                if (error.orcidValid) {
                    $scope.invalidFields.push("orcid");
                }

                if ($scope.isFieldRequired('alayksikko')) {
                    if (!$scope.selectedPerson.alayksikko[0] || $scope.selectedPerson.alayksikko[0].length < 1) {
                        $scope.invalidFields.push("alayksikko");
                    }
                }
                ValidationService.setValidationErrors($scope.invalidFields);

                if ($scope.invalidFields.length === 0) {
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
                    }).catch(function (err) {
                        console.log(err);
                    })
                }

            };

            $scope.removePerson = function (size) {

                let modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'js/shared/modal.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        person: function () {
                            return $scope.selectedPerson
                        }
                    }
                });

                modalInstance.result.then(function () {

                    let id = $scope.selectedPerson.id;
                    console.log(id);
                    APIService.delete("persons/remove", id)
                        .then(function (response) {
                            console.log(response);
                            $scope.selectedPerson = {};
                            $scope.showEditDialog = false;
                            fetchPersonData();
                        }).catch(function (err) {
                            console.log(err);
                    })

                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
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

            $scope.csvData = {
                data: {}
            };

            $scope.uploadCsv = function (file) {
                APIService.postCsvFile(file)
                    .then(function (res) {
                        $scope.personsToBeDeleted = res.data;
                    }).catch(function (err) {
                        console.log(err);
                    })
            };

            $scope.saveCsvData = function() {

                APIService.post("persons/save", $scope.personsToBeDeleted)
                    .then(function (res) {
                        if (res.status === 500) {
                            $scope.csvUploadError = true;
                            $scope.csvUploadResponseText = "Csv upload error with message: " +
                                res.data + " and status: " + res.status
                        } else {
                            $scope.csvUploadError = false;
                            $scope.csvUploadResponseText = "HR data päivitetty onnistuneesti!";
                        }
                        $scope.showAlertDialog = true;
                        $scope.personsToBeDeleted = [];
                        $scope.csvFile = {
                            file: null
                        };
                        $scope.csvData.data = {};
                        console.log(res);
                    })
            };

            $scope.resetDialog = function() {
                $scope.showAlertDialog = false;
                $scope.csvUploadError = false;
            }


            $scope.discardChanges = function () {
                APIService.delete("persons/csv-remove", null)
                    .then(function (res) {
                        console.log(res);
                        $scope.personsToBeDeleted = [];
                        $scope.csvFile = {
                            file: null
                        };
                        $scope.csvData.data = {};
                    }).catch(function (err) {
                        console.log(err);
                    })
            };

            verifyAccess();

        }
    ]);