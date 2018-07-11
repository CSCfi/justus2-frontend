'use strict';

angular.module('KoodistoService', [])
.service('KoodistoService', [
  '$log', '$http', 'DEMO_ENABLED', function($log, $http, DEMO_ENABLED) {


        this.getJulkaisuluokat = function () {
            return $http.get('files/julkaisuluokat.json');
        };

        this.getTaiteenalat = function () {
            return $http.get('files/taiteenalat.json');
        };

        this.getTieteenalat = function () {
            return $http.get('files/tieteenalat.json');
        };

        this.getTaidealantyypit = function () {
            return $http.get('files/taidealantyypit.json');
        };

        this.getValtiot = function () {
            return $http.get('files/maatjavaltiot.json');
        };

        this.getRooli = function () {
            return $http.get('files/roolit.json');
        };

        this.getKielet = function () {
            return $http.get('files/kielet.json');
        };

        this.getJulkaisuntila = function () {
            return $http.get('files/julkaisuntila.json');
        };


    this.getSelite = function(codeset, value) {
        for (let i = 0; i < codeset.length; i++) {
            const c = codeset[i];
            if (c.arvo === value + '') {
                return c.selite;
            }
            if (c.alatyypit) {
                for (let j = 0; j < codeset[i].alatyypit.length; j++) {
                    const a = codeset[i].alatyypit[j];
                    if (a.arvo === value + '') {
                        return a.selite;
                    }
                }
            }
            if (c.yksikot) {
                for (let k = 0; k < codeset[i].yksikot.length; k++) {
                    const a = codeset[i].yksikot[k];
                    if (a.arvo === value + '') {
                        return a.selite;
                    }
                }
            }
        }
    }
  }
]);
