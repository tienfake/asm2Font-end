window.addController = function ($scope, $http, $location) {
    var apiUrl = 'http://localhost:3000/products';
    var apiUrlCT = 'http://localhost:3000/category';

    $http.get(apiUrlCT)
        .then(function (response) {
            $scope.categories = response.data; 
        })
        .catch(function (error) {
            console.error('Lỗi khi lấy danh mục:', error);
        });

    $scope.check = {
        name: false,
        price: false,
        quantity: false,
        categoryID: false,
    };

    $scope.addProduct = function () {
        let error = false;

        if (!$scope.inputValue || !$scope.inputValue.categoryID) {
            $scope.check.categoryID = true;
            error = true;
        }
        if (!$scope.inputValue || !$scope.inputValue.name) {
            $scope.check.name = true;
            error = true;
        }
        if (!$scope.inputValue || !$scope.inputValue.price || isNaN($scope.inputValue.price)) {
            $scope.check.price = true;
            error = true;
        }
        if (!$scope.inputValue || !$scope.inputValue.quantity || isNaN($scope.inputValue.quantity)) {
            $scope.check.quantity = true;
            error = true;
        }

        if (!error) {
            var newItem = {
                ...$scope.inputValue,
            };

            var selectedCategory = $scope.categories.find(function (category) {
                return category.id === $scope.inputValue.categoryID;
            });

            newItem.category = selectedCategory; 

            $http.post(apiUrl, newItem)
                .then(function (response) {
                    if (response.status == 201) {
                        $location.path('/list');
                    }
                })
                .catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                });
        }
    };
};
