(function () {
    'use strict';

    angular
        .module('chcklstr')
        .factory('URLFactory', function ($http, $q) {

            var urlFactory = {
                getTaskLists: getTaskLists,
                createNewTaskList: createNewTaskList,
                deleteTaskList: deleteTaskList,
                updateTaskList: updateTaskList
            };

            function getTaskLists() {
                return $http({
                    //url: "http://173.73.174.83:8080/checklists/",
                    url: "http://localhost:8080/checklists/",
                    method: "GET"
                }).then(function (successResponse) {
                    return successResponse.data;
                }, function (failureResponse) {
                    return $q.reject(failureResponse);
                });
            }

            function createNewTaskList(taskList) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:8080/checklists/new/',
                    data: taskList,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(function (successResponse) {
                    return successResponse.data;
                }, function (failureResponse) {
                    return $q.reject(failureResponse);
                });
            }

            function deleteTaskList(taskList) {
                return $http({
                    method: 'DELETE',
                    url: 'http://localhost:8080/checklists/' + taskList,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(function (successResponse) {
                    return successResponse.data;
                }, function (failureResponse) {
                    return $q.reject(failureResponse);
                });
            }

            function updateTaskList(taskList) {
                return $http({
                    method: 'PUT',
                    url: 'http://localhost:8080/checklists/update/' + taskList.id,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(function (successResponse) {
                    return successResponse.data;
                }, function (failureResponse) {
                    return $q.reject(failureResponse);
                });
            }

            return urlFactory;
        });
})();
