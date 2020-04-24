app.directive('personPublicationListDirective',
        function() {
        return {
            restrict: 'EA',
            scope: {
                person: '=',
                publicationList: '=',
                showList: '='
            },
            templateUrl: 'js/directives/person-publication-list.html'
        };
    });