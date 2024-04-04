window.updateCTController = function ($scope, $http, $location, $routeParams) {
    var apiUrl = 'http://localhost:3000/category';
    var id = $routeParams.id;
    $scope.updateCategory = function () {
        $http.get(`${apiUrl}/${id}`).then(function (response) {
            if (response.status == 200) {
                $scope.inputValue = {
                    name_category: response.data.name_category
                }
            }
        })
    }
    $scope.updateCategory();
    $scope.check = {
        name: false
    }

    $scope.update = function () {
        let error = false;
        if (!$scope.inputValue || !$scope.inputValue.name_category) {
            $scope.check.name_category = true;
            error = true;
        }
        if (!error) {
            var item = {
                ...$scope.inputValue
            }
            $http.put(`${apiUrl}/${id}`, item)
                .then(function (response) {
                    if (response.status == 200) {
                        $location.path(`/listCT`);
                    }
                })
        }

    }
}