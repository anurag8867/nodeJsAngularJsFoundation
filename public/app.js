var app = angular.module('app', []);
app.controller('appController', function ($scope, $http) {

    $scope.tutorialName = "Angular JS";
    let URI = "http://localhost:3500/";

    $scope.post = function () {
        $http.post(URI + "task")
            .then(function (data, status, headers, config) {
                $scope.tutorialName = data;
            }, function (data, status, headers, config) {
                $scope.error = status;
            });
    };

    $scope.get = function () {
        $http.get(URI + "task")
            .then(function (data, status, headers, config) {
                $scope.tutorialName = data;
            }, function (data, status, headers, config) {
                $scope.error = status;
            });
    };

    $scope.put = function () {
        $http.put(URI + "task")
            .then(function (data, status, headers, config) {
                $scope.tutorialName = data;
            }, function (data, status, headers, config) {
                $scope.error = status;
            });
    };

    $scope.delete = function () {
        $http.delete(URI + "task")
            .then(function (data, status, headers, config) {
                $scope.tutorialName = data;
            }, function (data, status, headers, config) {
                $scope.error = status;
            });
    };
});
