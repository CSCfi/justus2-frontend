'use strict';

angular.module('ValidationService', [])
.service('ValidationService', [
  '$http', '$rootScope', '$timeout',
  function ($http, $rootScope, $timeout) {
    this.clearValidationErrors = function() {
      angular.element('.has-error').removeClass('has-error');
      angular.element('.has-feedback').removeClass('has-feedback');
      angular.element('.invalid-pattern').hide();
    };

    this.setValidationErrors = function(fieldsWithErrors) {
      this.clearValidationErrors();
      fieldsWithErrors.map(function(field) {
        $timeout(function(){
          var element = angular.element('#' + field + 'Group');
          element.addClass('has-error has-feedback');
      }, 50);
      });
    };

    this.setInvalidFieldErrors = function(fieldsWithErrors) {
      fieldsWithErrors.map(function(field) {
        $timeout(function(){
          var element = angular.element('#' + field + 'Group');
          element.addClass('has-error has-feedback');
          element.find('.invalid-pattern').show();
        }, 50);
      });
    };

    this.clearError = function(field, index) {
        let element =  angular.element(document.querySelector('#' + field + 'Group'));
        element.removeClass('has-error')
        element.find('.invalid-pattern').hide();
        if (index >= 0) {
          let element1 =  document.getElementsByClassName(field + 'Group' + index);
          angular.element(element1[0]).removeClass('has-error');
          angular.element(element1[0]).find('.invalid-pattern').hide();

        }
    };

  }
]);
