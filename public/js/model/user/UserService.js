'use strict';

angular.module('app.model.userservice',[])
  .factory('UserService', ['$resource', function ($resource) {
    return $resource('http://127.0.0.1:8080/users/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
