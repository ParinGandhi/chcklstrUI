(function () {
    'use strict';

    angular
        .module('chcklstr')
        .controller('CreateListController', function ($modalInstance) {

            var vm = this;

            //vm.chcklst = items.chcklst;

            vm.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            vm.create = function () {
                $modalInstance.close(vm.chcklst);
            };

        });
})();
