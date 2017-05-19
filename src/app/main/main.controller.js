(function () {
    'use strict';

    angular
        .module('chcklstr')
        .controller('MainController', function MainController(toastr, $modal, $http, $log) {
            var vm = this;
            vm.chcklst = [];
            vm.newList = {};

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
                    vm.newList.name = chcklstName;
                    //vm.newList.id = 0;
                    $log.debug(vm.newList);
                    $http({
                        method: 'POST',
                        url: 'http://localhost:8080/checklists/new/',
                        data: vm.newList
                    }).then(function (response) {
                        $log.debug(response);
                        getAllChecklists();
                    }, function errorCallback(response) {
                        $log.debug(response);
                    });
                    vm.chcklst.push(chcklstName);
                    /*var vanishOut = angular.element(document.querySelector('.testing'));
vanishOut.removeClass('vanishIn').addClass('vanishIn');*/
                }, function () {

                });
            };

            function getAllChecklists() {
                $http.get('http://localhost:8080/checklists/')
                    .then(function (response) {
                        vm.chcklst = response.data;
                    }, function (response) {
                        $log.debug(response);
                    });
            }

            getAllChecklists();


            vm.showItems = function (index) {
                var activeList;
                if (angular.isDefined(vm.currentIndex)) {
                    activeList = angular.element(document.getElementById(vm.currentIndex.id));
                    activeList.removeClass('activeList');
                }
                activeList = angular.element(document.getElementById(index.id));
                activeList.addClass('activeList');
                vm.currentIndex = index;

                vm.chcklst[index.id].items = [];
                vm.chcklst[index.id].items.push('Milk');
                vm.chcklst[index.id].items.push('Butter');
                vm.chcklst[index.id].items.push('Sugar');
                vm.chcklst[index.id].items.push('Bread');
                vm.chcklst[index.id].items.push('Eggs');


            };

        });
})();
