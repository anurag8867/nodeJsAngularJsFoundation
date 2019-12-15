var app = angular.module('app', ['app']);
app.controller('appController', function ($scope, $http, apiService) {

    $scope.tutorialName = "Angular JS";
    let URI = "http://localhost:3500/";

    $scope.post = function () {
        apiService.addTask().then(function (data) {
            $scope.tutorialName = data;
        }, function (data, status, headers, config) {
            alert("Task was not added");
            $scope.taskTitle = "";
        });
    };

    $scope.get = function () {
        apiService.getTask().then(function (data) {
            $scope.tutorialName = data;
        }, function (data, status, headers, config) {
            alert("Task was not added");
            $scope.taskTitle = "";
        });
    };

    $scope.put = function () {
        apiService.updateTask().then(function (data) {
            $scope.tutorialName = data;
        }, function (data, status, headers, config) {
            alert("Task was not added");
            $scope.taskTitle = "";
        });
    };

    $scope.delete = function () {
        apiService.deleteTask().then(function (data) {
            $scope.tutorialName = data;
        }, function (data, status, headers, config) {
            alert("Task was not added");
            $scope.taskTitle = "";
        });
    };
});
