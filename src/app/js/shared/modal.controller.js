app.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'person',
    function ($scope, $uibModalInstance, person) {
    $scope.person = person;

    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);