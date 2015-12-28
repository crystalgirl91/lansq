/**
* module.home Module
*
* Description
*/
angular.module('module.production', [])
.factory('productionResource', ['$resource', function($resource){
	return $resource("/production", null,{
		getList:{ method:"GET" }
	});
}])
.controller('productionController', ['$scope','productionResource' ,function($scope,productionResource){
	console.log(productionResource)
	productionResource.getList(function(res){
		$scope.rows = res.results;
	})
}])