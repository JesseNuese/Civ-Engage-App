// Conroller & API
angular.module('civApp')
    .controller('civCtrl', civController)
    // .factory('dataFact', ['$http', function('$http')]);

civController.$inject = ['$http'];

function civController($http) {
    var civ = this;
    civ.getInfo = function() {
        $http.get('https://www.googleapis.com/civicinfo/v2/representatives?address=4631StarboardDr&key=IKH')
            .then(function(res, status) {
                    civ.myData = res.data;
                },
                function(res, status) {
                    console.log('Failure', status);
                });
    }
    civ.getInfo();
}

// // API Data factory
// var urlBase = 'https://www.googleapis.com/civicinfo/v2/representatives?address=4631StarboardDr&key=AIzaSyC9LRRpJaqbHq1_wqecCOeSX0wFIKf14T4';
// var dataFactory = {};
//
// dataFactory.getPollData = function () {
//   return $http.get(urlBase);
// }
