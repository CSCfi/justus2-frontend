app.controller('PersonModalInstanceCtrl', ['$scope', '$uibModalInstance', 'person', 'lang', 'ValidationService', '$uibModal',
    function ($scope, $uibModalInstance, person, lang, ValidationService, $uibModal) {
        $scope.i18n = (typeof (i18n) !== 'undefined') ? i18n : {};
        $scope.lang = lang;
        $scope.selectedPerson = person;

        $scope.editPerson = function (form) {
            $scope.invalidFields = ValidationService.validatePersonForm(form.person);

            if ($scope.invalidFields.missingValue.length === 0 && $scope.invalidFields.invalidValue.length === 0) {
                $uibModalInstance.close("update");
            }
        };

        $scope.removePerson = function (id) {
            console.log(id);
            let modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'js/shared/modal.html',
                controller: 'ModalInstanceCtrl',
                size: 'md',
                resolve: {
                    person: function () {
                        return $scope.selectedPerson
                    }
                }
            });

            modalInstance.result.then(function () {
                $uibModalInstance.close("delete");
            }, function () {
                console.log('Remove person modal dismissed at: ' + new Date());
            });
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);