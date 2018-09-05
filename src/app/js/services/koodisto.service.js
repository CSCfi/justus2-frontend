'use strict';

angular.module('KoodistoService', [])
.service('KoodistoService', [
  '$log', '$http', 'DEMO_ENABLED', 'API_BASE_URL',
    function($log, $http, DEMO_ENABLED, API_BASE_URL) {

        this.getKoodistoData = function(koodi) {
          return $http.get(API_BASE_URL + 'haku/' + koodi);
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
