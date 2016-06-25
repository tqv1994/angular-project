angular.module('app.component.template',[]).factory('templateService',[function(){
	var template = {};
	var templates ={
		default: {
			name:'default',
			class:'',
			bodyClass: '',
			style : '',
		},
		login : {
			name:'login',
			class:'',
			bodyClass:'login-body',
			style: '',
		}
	};
	var currentTemplate = templates.default;
	template.mainTemplate = function(value){
		return currentTemplate;
	};

	template.setMainTemplate = function(value){
		if(value ==templates.default.name){
			currentTemplate = templates.default; 
		}
		else if (value == templates.login.name){
			currentTemplate = templates.login;
		}
		else
		{
			currentTemplate = null;
		}
	};
	return template;
}]);