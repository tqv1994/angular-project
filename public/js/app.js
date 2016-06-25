// Declare app level module which depends on filters, and services
angular.module('project', [
	'ngResource', 
	'ngRoute', 
	'ui.bootstrap', 
	'ui.date',
	'app.controller',
	'app.component',
	'app.model',

])
  .config( function ($routeProvider) {
    //$httpProvider.defaults.headers.delete = {};
  	var authenticationType ={
          none:null,
          user:'user',
          admin:'admin',
     };
     var appDefaultTemplate = "default";
      var appLoginTemplate = "login";
    $routeProvider
      .when('/', {
        templateUrl: 'views/site/index.html', 
        controller: 'SiteCtrl',
        templateMain: appDefaultTemplate,
        authentication : authenticationType.user,
    	})
      .when('/login', {
        templateUrl: 'views/auth/login.html', 
        controller: 'LoginCtrl',
        templateMain: appLoginTemplate,
        authentication : authenticationType.none,
    	})
      .when('/admin/users',{
      	templateUrl: 'views/admin/user/users.html',
      	controller: 'UserCtrl',
      	templateMain: appDefaultTemplate,
      	authentication: authenticationType.admin,
      	resolve:{
          resolvedUser: ['UserService', function (UserService) {
            return UserService.query();
          }]
        }
      })
      .otherwise({redirectTo: '/'});
  });
