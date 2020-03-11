'use strict';

angular.module('AdminController', [])
    .controller('AdminController', [
        '$rootScope', '$scope', '$http', '$log', 'API_BASE_URL', 'APIService',
        function ($rootScope, $scope, $http, $log, API_BASE_URL, APIService) {

            $scope.hakuState = true;

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
                let url = API_BASE_URL + 'updateperson/' + id;

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
                $scope.csvFile = null;
                $scope.downloadCSV = function () {
                    console.log("Downloading CSV file...");
                    APIService.getPersonData(true).then(function (res) {
                            console.log(res);
                        }
                    )
                }

        }
    ]);