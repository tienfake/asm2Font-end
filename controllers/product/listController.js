// window.listController = function ($scope, $http, $location) {
//     var apiUrlpr = 'http://localhost:3000/products';

//     $scope.getProduct = function () {
//         $http.get(apiUrlpr).then(function (response) {
//             if (response.status == 200) {
//                 $scope.product = response.data;
//             }
//         })
//     }
//     $scope.getProduct();

//     $scope.deleteProduct = function (deleteID) {
//         let confirm = window.confirm('bạn chắc chắn muốn xóa?');
//         if (confirm) {
//             $http.delete(`${apiUrlpr}/${deleteID}`)
//                 .then(function (response) {
//                     if (response.status == 200) {
//                         $scope.getProduct();
//                     }
//                 })
//         }
//     }

//     $scope.getID = function (id) {
//         $location.path(`/product/${id}/update`)
//     }
// }
window.listController = function ($scope, $http, $location) {
    var apiUrlpr = 'http://localhost:3000/products';

    $scope.getProduct = function () {
        $http.get(apiUrlpr).then(function (response) {
            if (response.status == 200) {

                response.data.forEach(function (product) {

                    if (product.category && product.category.name_category) {
                        product.name_category = product.category.name_category;
                    } else {
                        product.name_category = 'N/A';
                    }
                });

                $scope.product = response.data;
            }
        })
    }
    $scope.getProduct();

    $scope.deleteProduct = function (deleteID) {
        let confirm = window.confirm('Bạn chắc chắn muốn xóa?');
        if (confirm) {
            $http.delete(`${apiUrlpr}/${deleteID}`)
                .then(function (response) {
                    if (response.status == 200) {
                        $scope.getProduct();
                    }
                })
        }
    }

    $scope.getID = function (id) {
        $location.path(`/product/${id}/update`)
    }
}
