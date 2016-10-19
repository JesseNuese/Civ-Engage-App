// Conroller & API
angular.module('civApp')
    .controller('civCtrl', civController)

civController.$inject = ['$http'];

function civController($http) {
    var civ = this;
    civ.getInfo = function() {
        $http({
          method: 'GET',
          url: 'https://www.googleapis.com/civicinfo/v2/voterinfo',
          params: {
            key:'IKH',
            address: civ.searchQuery
          }
        })
            .then(function(res, status) {
                    civ.myData = res.data;
                    console.log(civ.myData)
                },
                function(res, status) {
                    console.log('Failure', status);
                });
    }
}
