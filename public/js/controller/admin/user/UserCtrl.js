'use strict';

angular.module('app.controller.admin.user',[])
  .controller('UserCtrl', ['$scope', '$modal', 'resolvedUser', 'UserService',
    function ($scope, $modal, resolvedUser, UserService) {

      $scope.users = resolvedUser;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.user = UserService.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        UserService.delete({id: id},
          function () {
            $scope.users = User.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          UserService.update({id: id}, $scope.user,
            function () {
              $scope.users = UserService.query();
              $scope.clear();
            });
        } else {
          UserService.save($scope.user,
            function () {
              $scope.users = UserService.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.user = {
          
          "id": "",
          
          "name": "",
          
          "username": "",
          
          "email": "",
          
          "password": "",
          
          "session_token": "",
          
          "time": "",
          
          "status": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var userSave = $modal.open({
          templateUrl: 'user-save.html',
          controller: 'UserSaveController',
          resolve: {
            user: function () {
              return $scope.user;
            }
          }
        });

        userSave.result.then(function (entity) {
          $scope.user = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('UserSaveController', ['$scope', '$modalInstance', 'user',
    function ($scope, $modalInstance, user) {
      $scope.user = user;

      

      $scope.ok = function () {
        $modalInstance.close($scope.user);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
