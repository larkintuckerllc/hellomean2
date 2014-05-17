var winesControllers = angular.module('winesControllers', []);

winesControllers.controller('WinesListCtrl', ['$scope', 'Wines', function ($scope, Wines) {
	$scope.wines = Wines.query();
	$scope.addWine = function() {
		var newWine = new Wines({name: $scope.wineName});
		newWine.$save({},
			function() {
				// SUCCESS
				$scope.wines.push(newWine);
			},
			function() {
				// ERROR
				// TODO Generate some network error message;
			}
		);
		$scope.wineName = '';
	};
}]);

winesControllers.controller('WinesDetailCtrl', ['$scope', '$routeParams', 'Wines', function($scope, $routeParams, Wines) {
	$scope.wine = Wines.get({_id: $routeParams._id}, 
		function() {
			// SUCCESS
		},
		function() {
			// ERROR
			// TODO Generate some network error message;
		}
	);
	$scope.updateWine = function() {
		$scope.wine.$update({}, 
			function() {
				// SUCCESS
			},
			function() {
				// ERROR
				// TODO Generate some network error message;
			}
		);
	};
	$scope.deleteWine = function() {
		$scope.wine.$delete({}, 
			function() {
				// SUCCESS
				window.location.href = '#';	
			},
			function() {
				// ERROR
				// TODO Generate some network error message;
			}
		);
	};
}]);
