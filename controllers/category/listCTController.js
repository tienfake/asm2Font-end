// window.listCTController = function ($scope, $http,$location) {
//     var apiUrl = 'http://localhost:3000/category';
//     $scope.getCategory = function () {
//         $http.get(apiUrl)
//             .then(function (response) {
//                 console.log(response);
//                 if (response.status == 200) {
//                     $scope.category = response.data;
//                 }
//             })
//     }
//     $scope.getCategory();

//     $scope.deleteCategory = function (id) {
//         let confirm = window.confirm('Bạn chắc chắn muốn xóa?');
//         if (confirm) {
//             $http.delete(`${apiUrl}/${id}`).then(function (response) {
//                 if (response.status == 200) {
//                     $scope.getCategory();
//                 }
//             })
//         }
//     }
//     $scope.getID=function(id){
//        $location.path(`/category/${id}/updateCT`)
//     }

// }
window.listCTController = function ($scope, $http,$location) {
    var apiUrl = 'http://localhost:3000/category';
    var apiUrlpr = 'http://localhost:3000/products';

    $scope.getCategory = function () {
        $http.get(apiUrl)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    $scope.category = response.data;
                }
            })
    }
    $scope.getCategory();

    $scope.deleteCategory = function (id) {
        let confirmDelete = window.confirm('Bạn chắc chắn muốn xóa?');
        if (confirmDelete) {
            // Lấy danh sách sản phẩm thuộc danh mục cần xóa
            $http.get(`${apiUrlpr}?categoryID=${id}`)
                .then(function(response) {
                    var products = response.data;
                    // Xóa từng sản phẩm trong danh sách
                    products.forEach(function(product) {
                        $http.delete(`${apiUrlpr}/${product.id}`)
                            .then(function(response) {
                                if (response.status == 200) {
                                    console.log('Đã xóa sản phẩm:', product.id);
                                }
                            })
                            .catch(function(error) {
                                console.error('Lỗi khi xóa sản phẩm:', error);
                            });
                    });
                    // Sau khi xóa tất cả sản phẩm, xóa danh mục
                    $http.delete(`${apiUrl}/${id}`)
                        .then(function(response) {
                            if (response.status == 200) {
                                console.log('Đã xóa danh mục:', id);
                                $scope.getCategory(); // Cập nhật danh sách danh mục sau khi xóa
                            }
                        })
                        .catch(function(error) {
                            console.error('Lỗi khi xóa danh mục:', error);
                        });
                })
                .catch(function(error) {
                    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
                });
        }
    }

    $scope.getID = function(id) {
       $location.path(`/category/${id}/updateCT`)
    }
}
