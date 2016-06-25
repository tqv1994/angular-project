angular.module('app.controller.main',[]).controller('MainCtrl',[
	'$scope',
	'templateService',
	'SessionService',
	function($scope,templateService,SessionService){
		$scope.global  ={
			app: {
				name: 'Project',
			},
			currentUser  : (SessionService.getUserData()) ? SessionService.getUserData : null,

		};

		$scope.getPageTemplate = function(){
			return templateService.mainTemplate();
			//console.log(templateService.mainTemplate());
		}
		console.log($scope.getPageTemplate());
		//alert(templateService.mainTemplate().name)
}]);