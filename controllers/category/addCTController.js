window.addCTController = function ($scope, $http, $location) {
    var apiUrl = 'http://localhost:3000/category';
    $scope.check = {
        name_category: false
    }
    $scope.addCategory = function () {
        let error = false;
        if (!$scope.inputValue || !$scope.inputValue.name_category) {
            $scope.check.name_category = true;
            error = true;
        }
        if (!error) {
            var newItem = {
                ...$scope.inputValue,
            }
            $http.post(
                apiUrl,
                newItem
            ).then(function (response) {
                if (response.status == 201) {
                    $location.path('/listCT')
                }
            })
        }



    }
}