// Conroller & API
angular.module('civApp')
    .controller('civController', civController);

civController.$inject = ['$http', 'userFactory'];

function civController($http, userFactory) {
    var civ = this;
    civ.greeting = "Welcome";
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
                        // civ.pollArray.address.state
                    },
                    function(res, status) {
                        console.log('Error', error);
                    });
        },
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

                        civ.myReps.offices.forEach(function(office, index) {
                            civ.officeOfficals.push({
                                officeName: office.name,
                                officialName: civ.myReps.officials[index].name,
                                officialParty: civ.myReps.officials[index].party,
                                officialPhoto: civ.myReps.officials[index].photoUrl
                            });
                        })
                        $http({
                                method: 'GET',
                                url: 'http://www.opensecrets.org/api/?',
                                params: {
                                    method: 'getLegislators',
                                    apikey: 'IKH',
                                    value: civ.userState,
                                    output: 'json'
                                }
                            })
                            .then(function(res, status) {
                                    civ.legislator = res.data;
                                    console.log(civ.legislator);
                                },
                                function(res, status) {
                                    console.log('Failure', status);
                                })


                    },
                    function(res, status) {
                        console.log('Failure', status);
                    })

            civ.createUser = function() {
                userFactory.createUser(civ.userData)
                    .then(function(returnData) {
                        console.log('Return Data', returnData);
                        civ.userData = {};
                        location.href = "/views/login.html";
                    })
            };
        };
};
