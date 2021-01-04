app.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'person', 'lang',
    function ($scope, $uibModalInstance, person, lang) {

        $scope.i18n = (typeof (i18n) !== 'undefined') ? i18n : {};
        $scope.lang = lang;
        $scope.person = person;

        $scope.ok = function () {
            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
}]);