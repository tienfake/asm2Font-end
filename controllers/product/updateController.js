
window.updateController = function ($scope, $http, $routeParams, $location) {
    var apiUrl = 'http://localhost:3000/products';
    var apiUrlCT='http://localhost:3000/category';
    var id = $routeParams.id;

    $http.get(apiUrlCT)
        .then(function(response) {
            $scope.categories = response.data;
        })
        .catch(function(error) {
            console.error('Lỗi khi lấy danh mục:', error);
        });

    $scope.updateProduct = function () {
        $http.get(`${apiUrl}/${id}`)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.inputValue = {
                        categoryID: response.data.categoryID,
                        name: response.data.name,
                        quantity: response.data.quantity,
                        price: response.data.price,
                    };
                }
            });
    }
    $scope.updateProduct();

    $scope.check = {
        name: false,
        price: false,
        quantity: false,
        categoryID: false,
    }

    $scope.update = function () {
        let error = false;
    
        if (!$scope.inputValue || !$scope.inputValue.categoryID) {
            $scope.check.categoryID = true;
            error = true;
        }
        if (!$scope.inputValue || !$scope.inputValue.name ) {
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
    
            if (selectedCategory) {
                newItem.category = selectedCategory;
            } else {
                newItem.category = { name_category: 'N/A' }; // Gán giá trị 'N/A' khi không tìm thấy category
            }
            
            $http.put(`${apiUrl}/${id}`, newItem)
                .then(function (response) {
                    if (response.status == 200) {
                        $location.path('/list');
                    }
                })
                .catch(function(error) {
                    console.error('Lỗi khi cập nhật sản phẩm:', error);
                });
        }
    }
    
}
