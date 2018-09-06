'use strict';

angular.module('JUFOService', [])
.service('JUFOService', ['$http', 'API_BASE_URL', function($http, API_BASE_URL) {

  this.etsiJulkaisuSarjanNimi = function(input) {
      return $http.get(API_BASE_URL + 'haku/julkaisusarjat/?q=' + input);
  };

  this.etsiKustantaja = function(input) {
    return $http.get(API_BASE_URL + 'haku/kustantajat/?q=' + input);
  };

  this.etsiKonferenssinVakiintunutNimi = function(input) {
      return $http.get(API_BASE_URL + 'haku/konferenssinnimet/?q=' + input);
  };

  this.etsiissn = function(input) {
    let uri = API_BASE_URL + 'haku/jufot/?issn=';
    return $http.get(uri + input);
  };

  this.kanava = function(input) {
    let uri = API_BASE_URL + 'haku/jufo/';
    return $http.get(uri + input)
    .then(function (response) {
      return response.data[0];
    });
  };
}]);
