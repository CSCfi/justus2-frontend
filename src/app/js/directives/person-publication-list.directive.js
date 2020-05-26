app.directive('personPublicationListDirective',
        function() {
        return {
            restrict: 'EA',
            scope: {
                person: '=',
                publicationList: '=',
                lang: '='
            },
            templateUrl: 'js/directives/person-publication-list.html',
            link: function (scope) {
                scope.i18n = (typeof (i18n) !== 'undefined') ? i18n : {};
            }
        };
    });