var angularF1 = angular.module('angularF1', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/usuarios/').success(function(data){
		$scope.users = data;
		console.log(data)
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

	$scope.dameUno = function(id){
		$http.get('/usuarios/'+id).success(function(data){
			$scope.users = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.createUser = function(){
		$http.post('/usuarios/', $scope.formData)
		.success(function(data) {
			$scope.formData = {};
			$scope.users = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error:' + data);
		});
	};

	$scope.deleteUser = function(id) {
		$http.delete('/usuarios/' + id)
		.success(function(data) {
			$scope.users = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error:' + data);
		});
	};
}