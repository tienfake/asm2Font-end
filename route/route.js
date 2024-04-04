angular.module('app', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider
        .when('/list', {
            templateUrl: 'views/product/list.html',
            controller: listController,
        })
        .when('/add', {
            templateUrl: 'views/product/add.html',
            controller: addController,
        })
        .when('/product/:id/update', {
            templateUrl: 'views/product/update.html',
            controller: updateController,
        })
        .when('/listCT', {
            templateUrl: 'views/category/list.html',
            controller: listCTController,
        })
        .when('/addCT', {
            templateUrl: 'views/category/add.html',
            controller: addCTController,
        })
        .when('/category/:id/updateCT', {
            templateUrl: 'views/category/update.html',
            controller: updateCTController,
        })
      

})
