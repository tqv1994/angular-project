angular.module('app.component.session.user',[]).factory('SessionService',['$window',function(){
	var session = [];

	session.currentUser = null;

	session.saveUserData = function(data){
		if(data){
			$window.localStorage.userData = angular.toJson(data);

			session.currentUser = data;
		}
	};

	session.getUserData = function(){
		try{
			if(!session.currentUser)
			{
				var data= angular.fromJson($window.localStorage.userData);
				session.currentUser = data;
			}

			return session.currentUser;
		}
		catch(e)
		{
			console.log("did not receive a valid Json:" +e);
		}
	};

	session.removeUserData = function(){
		delete $window.localStorage.userData;
		session.currentUser = null;
	};

	return session;
}]);