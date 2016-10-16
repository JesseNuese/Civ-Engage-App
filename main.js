angular.module('civapp',[])
  .controller('civCtrl', civController);

  civController.$inject['$http'];

  function civController() {

    var civ = this;
    civ.text = "Hello";
  }
