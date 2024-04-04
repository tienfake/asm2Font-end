window.listCTController = function ($scope, $http,$location) {
    var apiUrl = 'http://localhost:3000/category';
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
        let confirm = window.confirm('Bạn chắc chắn muốn xóa?');
        if (confirm) {
            $http.delete(`${apiUrl}/${id}`).then(function (response) {
                if (response.status == 200) {
                    $scope.getCategory();
                }
            })
        }
    }
    $scope.getID=function(id){
       $location.path(`/category/${id}/updateCT`)
    }

}