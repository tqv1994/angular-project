angular.module('app.controller.site',[]).controller('SiteCtrl',[
	'$scope',
	function($scope){

	}
])
.controller('LoginCtrl',[
	'$scope',
	'LoginService',
	'SessionService',
	'$location',
	function($scope,LoginService,SessionService,$location){
		$scope.user;
		$scope.submit = function(){
			LoginService.save($scope.user,function(){
				$scope.global.currentUser = LoginService.query();
                    //console.log(user);
                    $location.path('/');
			})
		}
	}
]);