'use strict';

angular.module('ModalService', [])
.service('ModalService', ['$rootScope', '$state', '$uibModal', 'JustusService', function ($rootScope, $state, $uibModal, JustusService) {

    this.openWarningModal = function(state, lang) {
        let modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'js/shared/initialize-justus-modal.html',
            controller: 'InitializeJustusModalInstanceCtrl',
            size: 'md',
            backdrop: 'static',
            resolve: {
                lang: function () {
                    return lang
                }
            }
        });
        modalInstance.result.then(function (event) {
    
            $state.go(state);
            JustusService.clearPublicationForm();
            JustusService.clearFileData();

            if (state === "justus?vaihe=1") {
                $state.reload('justus');
            }

        }, function () {
            console.log('Edit modal dismissed at: ' + new Date());
        });
    }


}])