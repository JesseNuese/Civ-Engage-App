// Conroller & API
angular.module('civapp',[])
  .controller('civCtrl', civController);

  civController.$inject=['$http'];

  function civController($http) {

    var civ = this;
     civ.getInfo = function (){
       $http.get('https://www.googleapis.com/civicinfo/v2/representatives?address=4631StarboardDr&key=AIzaSyC9LRRpJaqbHq1_wqecCOeSX0wFIKf14T4')
       .then(function(res, status){
        civ.myData = res.data;
      },
      function(res, status){
        console.log('Failure', status);
      });
    }
    civ.getInfo();
  }

// Object with API data

var evs = function(){

}
