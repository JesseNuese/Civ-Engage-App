angular.module('civApp')
  .factory('userFactory', userFactory);

  userFactory.$inject = ['$http'];

  function userFactory ($http) {
    return {
      createUser: function(userData) {
        return $http.post('/register', userData);
      }
    }
  }
