'use strict';

angular.module('TallennusController', [])
.controller('TallennusController', [
  '$scope', '$rootScope', '$log', '$window', '$http', '$state', 'APIService', 'API_BASE_URL', 'JustusService', 'DataStoreService', 'AuthService',
  function($scope, $rootScope, $log, $window, $http, $state, APIService, API_BASE_URL, JustusService, DataStoreService, AuthService) {
    // index provides: lang, ...
    // justus provides: justus

    $scope.meta = APIService.meta;
    $scope.file = JustusService.file;
    $scope.filedata = JustusService.getFileData();

    $scope.savePublicationForm = function() {
      const publication = {};
      publication.julkaisu = {};
      publication.organisaatiotekija = [];
      publication.tieteenala = [];
      publication.taiteenala = [];
      publication.avainsanat = [];
      publication.taidealantyyppikategoria = [];
      publication.lisatieto = {};

      // Replace user entered values in schema and set default values for
      // not entered fields
      angular.forEach($scope.meta.tables.julkaisu.columns, (field) => {
        publication.julkaisu[field.name] = $scope.justus.julkaisu[field.name] || field.default;
      });

      delete publication.julkaisu.id;
      publication.julkaisu.username = $rootScope.user.name;
      publication.julkaisu.modified = new Date();

      publication.organisaatiotekija = $scope.justus.organisaatiotekija;

      angular.forEach(publication.organisaatiotekija, function (value, key) {
         if($scope.justus.organisaatiotekija[key].rooli) {
           publication.organisaatiotekija[key].rooli = parseInt(publication.organisaatiotekija[key].rooli);
         } else {
             publication.organisaatiotekija[key].rooli = null;
         }
      });

      publication.avainsanat = $scope.justus.avainsanat;
      publication.taidealantyyppikategoria = $scope.justus.taidealantyyppikategoria;
      publication.lisatieto = $scope.justus.lisatieto;

        // Loop through tieteenala array and add order number
        angular.forEach($scope.justus.tieteenala, function(value, key) {
            $scope.justus.tieteenala[key].jnro = key + 1;
        });

        publication.tieteenala = $scope.justus.tieteenala;

          // Loop through taiteenala array and add order number
      angular.forEach($scope.justus.taiteenala, function(value, key) {
        $scope.justus.taiteenala[key].jnro = key + 1;
      });

      publication.taiteenala = $scope.justus.taiteenala;

        if (!$scope.justus.julkaisu.id) {

            APIService.post('julkaisu', publication).then((data) => {
                if ($scope.filedata.filename && $scope.filedata.filename !== "") {
                    $scope.filedata.julkaisuid =  data.id;

                    APIService.postJulkaisu($scope.filedata, $scope.file).then((response) => {
                        console.log(response);
                        $state.go('omat');
                        JustusService.clearPublicationForm();
                        JustusService.clearFileData();
                    })
                        .catch((error) => {
                            $log.error(error);
                        });
                } else {
                    $state.go('omat');
                    JustusService.clearPublicationForm();
                    JustusService.clearFileData();
                }
            }).catch((error) => {
                    $log.error(error);

        });
        } else {

            let promise;

            if ($scope.file) {
                $scope.filedata.julkaisuid = $scope.justus.julkaisu.id;
                APIService.put('julkaisu', $scope.justus.julkaisu.id, publication)
                    .then((response) => {
                        console.log(response);
                        promise = APIService.postJulkaisu($scope.filedata, $scope.file);
                        clearDataAndNavigateToNextPage(promise);

                    });
            } else if (!$scope.file && $scope.filedata.filename) {
                $scope.filedata.julkaisuid = $scope.justus.julkaisu.id;
                promise =  APIService.put('julkaisu', $scope.justus.julkaisu.id, publication, $scope.filedata);
                clearDataAndNavigateToNextPage(promise);

            } else {
                promise = APIService.put('julkaisu', $scope.justus.julkaisu.id, publication);
                clearDataAndNavigateToNextPage(promise);
            }

        }

  };

      function clearDataAndNavigateToNextPage(promise) {
          promise
              .then((res) => {
                  console.log(res);
                  $state.go('omat');
                  JustusService.clearPublicationForm();
                  JustusService.clearFileData();
              })
              .catch((error) => {
                  $log.error(error);
              });
      }


      $scope.cancelAndReturnToPublicationListing = function() {
        if (!DataStoreService.getStateName()) {
          $state.go('omat');
          JustusService.clearPublicationForm();
          JustusService.clearFileData();
        } else {
          let state = DataStoreService.getStateName();
          $state.go(state);
          DataStoreService.storeStateData(null);
          JustusService.clearPublicationForm();
          JustusService.clearFileData();
        }
      };

  }

]);
