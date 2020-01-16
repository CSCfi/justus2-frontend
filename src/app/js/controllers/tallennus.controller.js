'use strict';

angular.module('TallennusController', [])
.controller('TallennusController', [
  '$scope', '$rootScope', '$log', '$window', '$http', '$state', 'APIService', 'API_BASE_URL', 'JustusService', 'DataStoreService', 'AuthService',
  function($scope, $rootScope, $log, $window, $http, $state, APIService, API_BASE_URL, JustusService, DataStoreService, AuthService) {
    // index provides: lang, ...
    // justus provides: justus

    $scope.meta = APIService.meta;
    $scope.file = JustusService.file;

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
      // not entered fields in julkaisu objecct
      angular.forEach($scope.meta.tables.julkaisu.columns, (field) => {
        if (!angular.isArray($scope.justus.julkaisu[field.name])) {
          publication.julkaisu[field.name] = $scope.justus.julkaisu[field.name] || field.default;
        } else {
            if ($scope.justus.julkaisu[field.name][0] || $scope.justus.julkaisu[field.name][1])  {
              publication.julkaisu[field.name] = $scope.justus.julkaisu[field.name];
            } else {
              publication.julkaisu[field.name] = field.default;
            }
        }
      });

      delete publication.julkaisu.id;
      publication.julkaisu.username = $rootScope.user.name;
      publication.julkaisu.organisaatiotunnus = $rootScope.user.organization.code;
      publication.julkaisu.modified = new Date();

      // Replace user entered values in schema and set default values for
      // not entered fields in organisaatiotekija array
      for (let i = 0; i < $scope.justus.organisaatiotekija.length; i++) {
        publication.organisaatiotekija.push({
          "etunimet": "", "sukunimi": "", "orcid": "", "hrnumero": "", "rooli": ""
        });
        angular.forEach($scope.meta.tables.organisaatiotekija.columns, (field) => {
          publication.organisaatiotekija[i][field.name] = $scope.justus.organisaatiotekija[i][field.name] || field.default;

        });
        publication.organisaatiotekija[i].alayksikko = $scope.justus.organisaatiotekija[i].alayksikko;
      }

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

      let fileData = {};

       if (Object.keys($rootScope.filedata).length !== 0 ) {
           angular.forEach($scope.meta.tables.julkaisuarkisto.columns, (field) => {
               publication.julkaisu[field.name] = $scope.justus.julkaisu[field.name] || field.default;
               fileData[field.name] = $rootScope.filedata[field.name] || field.default;
           });
       }

        if (!$scope.justus.julkaisu.id) {
            APIService.post('julkaisu', publication).then((response) => {
                if (fileData.filename && fileData.filename !== "") {
                    fileData.julkaisuid = response.id;
                    const uploadPromise = APIService.postJulkaisu(fileData, $scope.file);
                    console.log(uploadPromise);
                    handlePublicationUploadAndNavigateToNextPage(uploadPromise)
                }
                else {
                    if ($rootScope.user.role === "admin") {
                        $state.go('hyvaksy');
                    } else {
                        $state.go('omat');
                    }
                    JustusService.clearPublicationForm();
                    delete $rootScope.filedata;
                    $rootScope.filedata = {};
                }
            })
        }
        else {

            let uploadPromise;
            let julkaisuPromise;

            if ($scope.file) {
                fileData.julkaisuid = $scope.justus.julkaisu.id;
                APIService.put('julkaisu', $scope.justus.julkaisu.id, publication, fileData)
                    .then((response) => {
                        console.log(response);
                        // Todo: if first request fails do not send publication
                        uploadPromise = APIService.postJulkaisu(fileData, $scope.file);
                        handlePublicationUploadAndNavigateToNextPage(uploadPromise);

                    });
            } else if (!$scope.file && fileData.filename) {
                fileData.julkaisuid = $scope.justus.julkaisu.id;
                julkaisuPromise =  APIService.put('julkaisu', $scope.justus.julkaisu.id, publication, fileData);
                clearDataAndNavigateToNextPage(julkaisuPromise);

            } else {
                julkaisuPromise = APIService.put('julkaisu', $scope.justus.julkaisu.id, publication);
                clearDataAndNavigateToNextPage(julkaisuPromise);
            }

        }

  };

      function handlePublicationUploadAndNavigateToNextPage(upload) {
            upload
                .then((res) => {
                    console.log(res);
                    if (res.status === 500) {
                        alert("Metadata for publication was succesfully saved but publication upload responded with " +
                            "following error code: " + res.data);
                        $state.go('omat');
                    } else {
                        if ($rootScope.user.role === "admin") {
                            $state.go('hyvaksy');
                        } else {
                            $state.go('omat');
                        }
                    }

                    JustusService.clearPublicationForm();
                    delete $rootScope.filedata;
                    $rootScope.filedata = {};

                })
                .catch((error) => {
                    $log.error(error);
                });
        }

        function clearDataAndNavigateToNextPage(julkaisuPromise) {
            julkaisuPromise
                .then((res) => {
                    console.log(res);
                        if ($rootScope.user.role === "admin") {
                            $state.go('hyvaksy');
                        } else {
                            $state.go('omat');
                        }
                    JustusService.clearPublicationForm();
                    delete $rootScope.filedata;
                    $rootScope.filedata = {};

                })
                .catch((error) => {
                    $log.error(error);
                });
        }


      $scope.cancelAndReturnToPublicationListing = function() {
        if (!DataStoreService.getStateName()) {
          $state.go('omat');
          JustusService.clearPublicationForm();
          delete $rootScope.filedata;
          $rootScope.filedata = {};
        } else {
          let state = DataStoreService.getStateName();
          $state.go(state);
          DataStoreService.storeStateData(null);
          JustusService.clearPublicationForm();
          delete $rootScope.filedata;
          $rootScope.filedata = {};
        }
      };

  }

]);
