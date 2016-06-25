angular.module('app.component.events.router', []).run([
	'$rootScope',
	'templateService',
	function($rootScope, templateService){
		$rootScope.$on('$routeChangeStart',function(event, currRoute,prevRoute){
			templateService.setMainTemplate(currRoute.templateMain);
			console.log(currRoute.templateMain);
			console.log(templateService.mainTemplate());
		});

	}
]);