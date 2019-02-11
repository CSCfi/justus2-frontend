'use strict';

angular.module('ExternalServicesService', [])
    .service('ExternalServicesService', ['$http', "API_BASE_URL", function ($http, API_BASE_URL) {


        this.worksquery = function (input, tekija) {
            return $http.get(API_BASE_URL + 'haku/julkaisut' + '/?julkaisu=' + input + '&tekija=' + tekija);
        };

        this.works = function (source, input) {
            return $http.get(API_BASE_URL + 'haku/julkaisu' + '/?lahde=' + source + "&id=" + input);
        };

        this.etsiAvainsanat = function (input, lang) {
            return $http.get(API_BASE_URL + 'haku/avainsanat?q=' + input + '&lang=' + lang);
        };

        this.etsiJulkaisuSarjanNimi = function (input) {
            return $http.get(API_BASE_URL + 'haku/julkaisusarjat/?q=' + input);
        };

        this.etsiKustantaja = function (input) {
            return $http.get(API_BASE_URL + 'haku/kustantajat/?q=' + input);
        };

        this.etsiKonferenssinVakiintunutNimi = function (input) {
            return $http.get(API_BASE_URL + 'haku/konferenssinnimet/?q=' + input);
        };

        this.etsiissn = function (input) {
            let uri = API_BASE_URL + 'haku/jufot/?issn=';
            return $http.get(uri + input);
        };

        this.kanava = function (input) {
            let uri = API_BASE_URL +  'haku/jufo/';
            return $http.get(uri + input)
                .then(function (response) {
                    return response.data[0];
                });
        };

        this.haeUrn = function() {
            return $http.get(API_BASE_URL +'haku/urntunnus');
        };

    }]);
