// Conroller & API
angular.module('civApp')
    .controller('civCtrl', civController)

civController.$inject = ['$http'];

function civController($http) {
    var civ = this;
    civ.show = false;
    civ.officeOfficals = [];
    civ.getInfo = function() {
        $http({
                method: 'GET',
                url: 'https://www.googleapis.com/civicinfo/v2/voterinfo',
                params: {
                    key: 'IKH',
                    address: civ.searchQuery
                }
            })
            .then(function(res, status) {
                    civ.myData = res.data;
                    console.log(civ.myData)
                    civ.pollArray = civ.myData.pollingLocations;
                },
                function(res, status) {
                    console.log('Failure', status);
                });
    }
    civ.getReps = function() {
        $http({
                method: 'GET',
                url: 'https://www.googleapis.com/civicinfo/v2/representatives',
                params: {
                    key: 'IKH',
                    address: civ.repQuery,
                    levels: 'country'
                }
            })
            .then(function(res, status) {
                    civ.myReps = res.data;
                    console.log(civ.myReps)
                    civ.repArray = civ.myReps;

                    civ.myReps.offices.forEach(function(office, index){
                      civ.officeOfficals.push({
                        officeName: office.name,
                        officialName: civ.myReps.officials[index].name,
                        officialParty: civ.myReps.officials[index].party,
                        officialPhoto: civ.myReps.officials[index].photoUrl
                      });
                    })
                },
                function(res, status) {
                    console.log('Failure', status);
                })
    };
}
