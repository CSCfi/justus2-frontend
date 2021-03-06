'use strict';

angular.module('AdminController', [])
    .controller('AdminController', [
        '$rootScope', '$scope', '$state', '$stateParams', '$window', '$http', '$timeout', '$uibModal', 'API_BASE_URL', 'JustusService',
        'APIService', 'AlayksikkoService', 'AuthService', 'ValidationService',
        function ($rootScope, $scope, $state, $stateParams, $window, $http, $timeout, $uibModal, API_BASE_URL, JustusService,
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

            $scope.personData = {
                "tunniste": "",
                "etunimi": "",
                "sukunimi": "",
                "orcid": null,
                "alayksikko": [null]
            };

            $scope.csvPreviewError = false;
            $scope.csvPreviewSuccess = false;
            $scope.showAlertDialog = false;
        };

            $scope.isFieldVisible = function(field) {
                return JustusService.isFieldVisible(field);
            };

            $scope.isFieldRequired = function(field) {
                return JustusService.isFieldRequired(field);
            };

            $scope.editPerson = function (person) {
                $scope.selectedPerson = angular.copy(person);
                let modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'js/shared/person-edit-modal.html',
                    controller: 'PersonModalInstanceCtrl',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        person: function () {
                            return $scope.selectedPerson
                        },
                        lang: function () {
                            return $scope.lang
                        }

                    }
                });

                modalInstance.result.then(function (event) {
                    let id = $scope.selectedPerson.id;

                    if (event === "update") {
                        delete($scope.selectedPerson.modified);
                        APIService.put("person/update", id, $scope.selectedPerson)
                            .then(function (response) {
                                console.log(response);
                                $scope.showUpdateResponse = true;
                                if (response.status === 200) {
                                    $scope.updatePersonAlertText = $scope.i18n.admin.content.form.alerts.update.success[$scope.lang];
                                    fetchPersonData();
                                    $timeout(function () {
                                        $scope.showUpdateResponse = false;
                                        $scope.updatePersonAlertText = null;
                                    }, 3000)
                                } else {
                                    $scope.updatePersonError = true;
                                    $scope.updatePersonAlertText = "Saving author failed with response code: " + response.status + " and message: " + response.data;
                                }

                            }).catch(function (err) {
                            console.log(err);
                        })
                    }
                    if (event === "delete") {
                        APIService.delete("persons/remove", id)
                            .then(function (response) {
                                console.log(response);
                                fetchPersonData();
                            }).catch(function (err) {
                            console.log(err);
                        })
                    }

                }, function () {
                    console.log('Edit modal dismissed at: ' + new Date());
                });
            };

            $scope.closeUpdateAlert = function() {
                $scope.showUpdateResponse = false;
                $scope.updatePersonError = false;
                $scope.updatePersonAlertText = null;
            }

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

            $scope.cancel = function() {
                $scope.addNew.open = false;
                $scope.personData = {
                    "tunniste": "",
                    "etunimi": "",
                    "sukunimi": "",
                    "orcid": null,
                    "alayksikko": [null]
                };

                $scope.savePersonError = false;
                $scope.savePersonSuccess = false;
                $scope.savePersonResponseText = null;
            }

            $scope.resetValidationError = function(field) {
                ValidationService.clearError(field);
            }

            $scope.savePerson = function(form) {

                $scope.savePersonError = false;
                $scope.savePersonSuccess = false;
                $scope.savePersonResponseText = null;

                $scope.invalidFields = ValidationService.validatePersonForm(form.person)

                if ($scope.invalidFields.missingValue.length === 0 && $scope.invalidFields.invalidValue.length === 0) {
                    APIService.post("person/save", $scope.personData)
                    .then(function (response) {
                        console.log(response);

                        if (response.status === 200) {

                            $scope.personData = {
                                "tunniste": "",
                                "etunimi": "",
                                "sukunimi": "",
                                "orcid": null,
                                "alayksikko": [null]
                            };
                            $scope.addNew.open = false;
                            // scroll to top
                            $window.scrollTo(0, 0);
                            $scope.savePersonSuccess = true;
                            $scope.savePersonResponseText = $scope.i18n.admin.content.form.alerts.add.success[$scope.lang];

                            $timeout(function () {
                                $scope.savePersonSuccess = false;
                                $scope.savePersonResponseText = null;
                            }, 3000)

                            fetchPersonData();
                        } else {
                            $scope.savePersonError = true;
                            $scope.savePersonResponseText = "Operation failed with response code: " + response.status + " and message: " + response.data;
                        }

                    }).catch(function (err) {
                        console.log(err);
                        $scope.savePersonError = true;
                        $scope.savePersonResponseText = $scope.i18n.admin.content.form.alerts.add.failure[$scope.lang];
                    })
                }

            };

            $scope.addNew = {
                isOpen: false
            };

            let fetchPersonData = function() {
                APIService.getPersonData()
                    .then(function (res) {
                        $scope.persons.data = res.persons;
                    })
            };

            $scope.csvurl = API_BASE_URL + 'persons/download';

            $scope.csvFile = {
                file: null
            };

            $scope.csvData = {
                data: {}
            };

            $scope.uploadCsv = function (file) {
                $scope.showAlertDialog = false;
                $scope.csvPreviewSuccess = false;
                $scope.csvPreviewError = false;
                APIService.postCsvFile(file)
                    .then(function (res) {
                        console.log(res);
                        if (res.status === 200) {
                            $scope.personsToBeDeleted = res.data;
                            $scope.csvPreviewSuccess = true;
                        } else {
                            console.log("Server responded with status " + res.status);
                            $scope.csvPreviewError = true;
                            $scope.csvErrorText = res.data;
                        }

                    }).catch(function (err) {
                        console.log(err);
                    })
            };

            $scope.saveCsvData = function() {

                APIService.post("persons/save", $scope.personsToBeDeleted)
                    .then(function (res) {
                        if (res.status !== 200) {
                            $scope.csvUploadError = true;
                            $scope.csvUploadResponseText = "Csv upload error with message: " +
                                res.data + " and status: " + res.status
                        } else {
                            $scope.csvUploadError = false;
                            $scope.csvUploadResponseText = $scope.i18n.admin.content.lataus.tuo.success[$scope.lang];
                            fetchPersonData();
                        }
                        $scope.showAlertDialog = true;
                        $scope.personsToBeDeleted = [];
                        $scope.csvFile = {
                            file: null
                        };
                        $scope.csvData.data = {};
                        $scope.csvPreviewError = false;
                        $scope.csvPreviewSuccess = false;
                        console.log(res);
                    })
            };

            $scope.resetDialog = function() {
                $scope.showAlertDialog = false;
                $scope.csvUploadError = false;
                $scope.savePersonSuccess = false;
                $scope.savePersonError = false;
            }


            $scope.discardChanges = function () {
                APIService.delete("persons/csv-remove", null)
                    .then(function (res) {
                        console.log(res);
                        $scope.personsToBeDeleted = [];
                        $scope.csvFile = {
                            file: null
                        };
                        $scope.csvPreviewError = false;
                        $scope.csvPreviewSuccess = false;
                        $scope.csvData.data = {};
                    }).catch(function (err) {
                        console.log(err);
                    })
            };

            verifyAccess();

        }
    ]);