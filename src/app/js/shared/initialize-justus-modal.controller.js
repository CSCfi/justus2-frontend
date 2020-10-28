app.controller('InitializeJustusModalInstanceCtrl', ['$scope', '$uibModalInstance',
    function ($scope, $uibModalInstance) {
        // $scope.person = person;

        $scope.ok = function () {
            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);