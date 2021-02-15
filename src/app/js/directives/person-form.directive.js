app.directive('personFormDirective', ['$rootScope', 'JustusService', 'AlayksikkoService', 'ValidationService', 'KoodistoService',
    function($rootScope, JustusService, AlayksikkoService, ValidationService, KoodistoService) {
        return {
            restrict: 'EA',
            scope: {
                selectedPerson: '=',
                lang: '='
            },
            templateUrl: 'js/directives/person-form.html',
            link: function (scope, element, attrs, ctrls) {
                scope.i18n = (typeof (i18n) !== 'undefined') ? i18n : {};

                scope.isFieldVisible = function(field) {
                    return JustusService.isFieldVisible(field);
                };
                scope.isFieldRequired = function(field) {
                    return JustusService.isFieldRequired(field);
                };

                scope.alayksikkovuodet = AlayksikkoService.getAlayksikkovuodet();
                scope.alayksikkovuosi = {};
                let userUnits = $rootScope.user.alayksikot;

                for (let i = 0; i < userUnits.length; i++) {
                    if (userUnits[i].yksikot.length) {
                        scope.alayksikkovuosi.selected = {
                            id: parseInt(userUnits[i].vuosi),
                            label: userUnits[i].vuosi
                        };
                    }
                }

            // get alayksikkodata based on selected year
            scope.getAlayksikkoData = function(alayksikkovuosi) {
                return AlayksikkoService.getAlayksikkoData(alayksikkovuosi);
            };

            scope.getAlayksikkoSelite = function(value) {
                return KoodistoService.getSelite($rootScope.user.alayksikot, value)
            };

            scope.addAlayksikko = function(input) {
                if (scope.selectedPerson.alayksikko.indexOf(input) > -1
                    || scope.selectedPerson.alayksikko.length > 2) return;

                if (!scope.selectedPerson.alayksikko[0]) {
                    scope.selectedPerson.alayksikko[0] = input;
                } else {
                    scope.selectedPerson.alayksikko.push(input);
                }
            };

            scope.removeAlayksikko = function(index) {
                scope.selectedPerson.alayksikko.splice(index, 1);
            };

            scope.resetValidationError = function(field) {
                ValidationService.clearError(field);
            }

            }
        };
    }]);