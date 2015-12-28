angular.module('mainApp',[
	'ngRoute',
	'ngResource',
	'module.home',
	'module.directive',
	'ng.e2eTest',
	'module.production'
	])
.config(function($routeProvider){
	$routeProvider
	.when('/home',{
		controller:"homeController",
		templateUrl:'public/template/home.html'
	})
	.when('/blog',{
		controller:'blogController',
		templateUrl:'public/template/blog.html'
	})
	.when('/production',{
		controller:'productionController',
		templateUrl:'public/template/production.html'
	})
	.otherwise("/home")
})
.run(['$location',function($location){
}])