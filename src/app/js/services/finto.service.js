'use strict';

angular.module('FintoService', [])
.service('FintoService', ['$http', '$log', 'API_BASE_URL',
    function($http, $log, API_BASE_URL) {

    this.etsiAvainsanat = function(input, lang) {
      return $http.get(API_BASE_URL +'haku/avainsanat?q=' + input + '&lang=' + lang);
    };

}]);
