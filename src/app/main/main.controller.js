(function () {
    'use strict';

    angular
        .module('chcklstr')
        .controller('MainController', function MainController(toastr, $modal) {
            var vm = this;
            vm.chcklst = [];

            /*vm.testMagic = function () {
    var vanishOut = angular.element(document.querySelector('#testing'));
    vanishOut.addClass('vanishOut');
};*/

            vm.openCreateModal = function () {
                var createNewChklstModalInstance = $modal.open({
                    templateUrl: 'app/create_chklst/create_chklst.html',
                    controller: 'CreateListController',
                    controllerAs: 'vm',
                    animation: false,
                    size: 'lg'
                });

                createNewChklstModalInstance.result.then(function (chcklstName) {
                    vm.chcklst.push(chcklstName);
                    /*var vanishOut = angular.element(document.querySelector('.testing'));
vanishOut.removeClass('vanishIn').addClass('vanishIn');*/
                }, function () {

                });
            };

        });
})();
