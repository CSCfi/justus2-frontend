app.controller('InitializeJustusModalInstanceCtrl', ['$scope', '$uibModalInstance', 'lang',
    function ($scope, $uibModalInstance, lang) {
        $scope.i18n = (typeof (i18n) !== 'undefined') ? i18n : {};
        $scope.lang = lang;


        $scope.ok = function () {
            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);