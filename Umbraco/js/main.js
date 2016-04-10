var flickrApp = angular.module('flickrApp', []);
flickrApp.controller('flickrCtrl', function ($scope, $http) {
    $scope.tag = "dogs";
    $scope.newest = true;
    $scope.quantity = 10;
    $scope.page = 1;

    $scope.search = function () {
        $http.get('/Umbraco/Api/Images/GetJson?tag=' + $scope.tag).success(function (response) {
            $scope.page = 1;
            // cleanup Flickr Json response
            response = response.replace('jsonFlickrFeed(', '');
            response = response.replace('})', '}');
            response = response.replace(/\\'/g, "'");

            response = JSON.parse(response);
            $scope.images = response.items;
        });
    };
    $scope.search();

    $scope.nextPage = function () {
        $scope.page++;
        var from = $scope.quantity * ($scope.page - 1);
        var to = $scope.quantity * $scope.page;
        $scope.images = $scope.images.splice(from, to);
    }
    $scope.toggle = function (property) {
        $scope.newest = (property === 'date') ? !$scope.newest : $scope.newest;
    }
});