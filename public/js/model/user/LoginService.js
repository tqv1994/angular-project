'use strict';

angular.module('app.model.loginservice',[])
  .factory('LoginService', ['$resource', function ($resource) {
    return $resource('http://127.0.0.1:8080/auth/login', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
