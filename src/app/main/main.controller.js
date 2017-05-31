(function () {
    'use strict';

    angular
        .module('chcklstr')
        .controller('MainController', function MainController(toastr, $modal, $http, $log, URLFactory) {
            var vm = this;
            vm.chcklst = [];
            vm.newChcklst = {};
            vm.showItemsTable = false;
            vm.showEditTask = false;


            /**
             * This function will retrieve all the checklists from the database
             */
            function getAllChecklists() {
                URLFactory.getTaskLists()
                    .then(function (response) {
                        vm.chcklst = response;
                        $log.debug("Retrieved tasklists from the database:");
                        $log.debug(vm.chcklst);
                    }, function (response) {
                        $log.debug(response);
                    });
            }

            getAllChecklists();


            /**
             * This function will show the items associated to the selected task list.
             */
            vm.showItems = function (index) {
                var activeList;
                if (angular.isDefined(vm.currentIndex)) {
                    activeList = angular.element(document.getElementById(vm.currentIndex.id));
                    activeList.removeClass('activeList');
                }
                activeList = angular.element(document.getElementById(index.id));
                activeList.addClass('activeList');
                vm.currentIndex = vm.chcklst[vm.chcklst.indexOf(index)];
                if (angular.isUndefined(vm.currentIndex.items) || vm.currentIndex.items.length <= 0) {
                    toastr.warning(vm.currentIndex.name + " does not contain any items.");
                }
                vm.showItemsTable = true;
            };

            /**
             * This function will create a new checklist
             */
            vm.createNewChcklst = function (newChcklst) {
                toastr.clear();
                $log.debug("Creating tasklist:");
                $log.debug(newChcklst);
                URLFactory.createNewTaskList(newChcklst)
                    .then(function (response) {
                        $log.debug("Successfully created checklist");
                        $log.debug(response);
                        getAllChecklists();
                    }, function errorCallback(response) {
                        $log.debug(response);
                        if (response.data.status === 500) {
                            toastr.warning("Checklist already exists.");
                        }
                    });
                vm.newChcklst = {};
            }; // End createNewChcklst




            /**
             * This function will call the createNewChcklst function and will create a new checklist when
             * enter is pressed in the input box
             */
            vm.pressEnter = function (event) {
                if (event.keyCode === 13) {
                    vm.createNewChcklst(vm.newChcklst);
                }
            }; // End pressEnter

            /*
             * This function will update the provided task list name
             */
            vm.updateTaskListName = function (taskList) {
                URLFactory.updateTaskList(taskList)
                    .then(function (response) {
                        $log.debug(response);
                        toastr.success("Updated list");
                        getAllChecklists();
                        vm.showItems(taskList);
                    }, function (response) {
                        $log.debug(response);
                    });
            };

            vm.editTask = function () {
                vm.showEditTask = true;
                vm.tempTaskList = vm.currentIndex.name;
            };

            vm.deleteTaskList = function (taskList) {
                URLFactory.deleteTaskList(taskList)
                    .then(function (response) {
                        $log.debug(response);
                        vm.showItemsTable = false;
                        getAllChecklists();
                    }, function (response) {
                        $log.debug(response);
                    });
            };

        }); // End MainController
})();
