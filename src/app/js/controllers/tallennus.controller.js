'use strict';

angular.module('TallennusController', [])
.controller('TallennusController', [
  '$scope', '$rootScope', '$log', '$window', '$http', '$state', 'APIService', 'API_BASE_URL', 'JustusService', 'DataStoreService',
  function($scope, $rootScope, $log, $window, $http, $state, APIService, API_BASE_URL, JustusService, DataStoreService) {
    // index provides: lang, ...
    // justus provides: justus

    $scope.meta = APIService.meta;

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

      // Update existing publication or create new depending on possible existing id
      const julkaisuPromise = $scope.justus.julkaisu.id ? APIService.put('julkaisu', $scope.justus.julkaisu.id, publication) : APIService.post('julkaisu', publication);
      julkaisuPromise.then((data) => {
        console.log(data);
        $state.go('omat');
        JustusService.clearPublicationForm();
      })
      .catch((error) => {
          $log.error(error);

      });
     };

      $scope.cancelAndReturnToPublicationListing = function() {
        if (!DataStoreService.getStateName()) {
          $state.go('omat');
          JustusService.clearPublicationForm();
        } else {
          let state = DataStoreService.getStateName();
          $state.go(state);
          DataStoreService.storeStateData(null);
          JustusService.clearPublicationForm();
        }
      };

  }

]);
