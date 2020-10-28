app.directive('isbnDirective', ['JustusService', function(JustusService) {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(isbn) {
        if (!isbn) return false; // undefined?
        if (!isbn.match(JustusService.pattern.isbn)) return false;
        let ret = JustusService.checkISBN(isbn);
        mCtrl.$setValidity('isbnValid', ret);
        return isbn;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
}])

.directive('issnDirective', ['JustusService', function(JustusService) {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(issn) {


        if (!issn) return false; // undefined?
        if (!issn.match(JustusService.pattern.issn)) return false;
        let ret = JustusService.checkISSN(issn);
        mCtrl.$setValidity('issnValid', ret);
        return issn;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
}])

.directive('orcidDirective', ['JustusService', function(JustusService) {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(orcid) {
        // NB! tyhjä käy, eli ei pakollinen (vielä)
        if (orcid === null || orcid === '') {
          mCtrl.$setValidity('orcidValid', true);
          return orcid;
        }
        if (!orcid) return false; // undefined?
        if (!orcid.match(JustusService.pattern.orcid)) return false;
        let ret = JustusService.checkORCID(orcid);
        mCtrl.$setValidity('orcidValid', ret);
        return orcid;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
}])

.directive('validateOrganisaatiotekijatDirective',
    ['JustusService', 'ValidationService', function(JustusService, ValidationService) {
    return {
        // require: 'ngModel',
        scope: {
          validate: '=',
          field: '@',
          value: '=',
          index: '=?'
        },
        link: function(scope, element, attr, mCtrl) {
            if (!scope.validate) return;

            if (scope.field === 'orcid') {
                if (scope.field !== null || scope.field !== '') {
                    let pattern = JustusService.pattern["orcid"];
                    if (!scope.value.match(pattern)) {
                        element.addClass('has-error has-feedback');
                        element.find('.invalid-pattern').show();
                    }
                }
            }

            else if (scope.field === 'alayksikko') {
             if (JustusService.isFieldRequired(scope.field)) {
                    if (JustusService.fieldIsEmpty(scope.value)) {
                        let elements =  document.getElementsByClassName('alayksikko-error');
                        angular.element(elements[scope.index]).addClass('has-error has-feedback');
                    }
                }

            }

            else {
                if (JustusService.isFieldRequired(scope.field)) {
                    if (JustusService.fieldIsEmpty(scope.value)) {
                        element.addClass('has-error has-feedback');
                    }
                }
            }

        }

    };
}]);
