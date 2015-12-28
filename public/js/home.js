angular.module('module.home',[])
.factory('homeResource', ['$resource', function($resource){
	return $resource("/home_pic", null ,{
		get:{method:'GET'}
	})
}])
.controller('homeController',['$scope','homeResource',function($scope,homeResource){
	homeResource.get(function(res){
		$scope.pics = res.results;
	});
}])