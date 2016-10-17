angular.module('civapp',[])
  .controller('civCtrl', civController);

  civController.$inject=['$http'];

  function civController($http) {

    var civ = this;
     civ.getInfo = function (){
       $http.get('https://www.googleapis.com/civicinfo/v2/voterinfo?address=4631StarboardDr&key=insertkeyhere')
       .then(function(res, status){
        civ.myCiv = res.data;
      });
    }
    civ.getInfo();
  }
