// Conroller & API
angular.module('civApp')
    .controller('civController', civController);

civController.$inject = ['$http', 'userFactory'];

function civController($http, userFactory) {
    var civ = this;
    civ.greeting = "Welcome";
    civ.show = false;
    civ.officeOfficals = [];
    // Google Poll Locations
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
    };

    // Open Secrets
    civ.getReps = function() {
        $http({
            method: 'GET',
            url: 'http://www.opensecrets.org/api/?',
            params: {
                method: 'getLegislators',
                apikey: 'c71586955acdfdc1ddedbbaf0711fb60',
                id: civ.repQuery,
                output: 'json'
            }
        })

        .then(function(res, status) {
                civ.myReps = res.data.response;
                console.log(civ.myReps.legislator);
                civ.repArray = civ.myReps;
                civ.myReps.legislator.forEach(function(legislator, index) {
                    civ.officeOfficals.push({
                        officialParty: civ.myReps.legislator[index]['@attributes'].party,
                        officialName: civ.myReps.legislator[index]['@attributes'].firstlast,
                        officialEmail: civ.myReps.legislator[index]['@attributes'].webform,
                        officalYear: civ.myReps.legislator[index]['@attributes'].first_elected,
                        officialTwitter: civ.myReps.legislator[index]['@attributes'].twitter_id,
                        officialPhone: civ.myReps.legislator[index]['@attributes'].phone
                    });

                })
            },
            function(res, status) {
                console.log('Failure', status);
            });
    };

    civ.createUser = function() {
        userFactory.createUser(civ.userData)
            .then(function(returnData) {
                console.log('Return Data', returnData);
                civ.userData = {};
                location.href = "/views/login.html";
            })
    };
};

// civ.getReps = function() {
//     $http({
//             method: 'GET',
//             url: 'https://www.googleapis.com/civicinfo/v2/representatives',
//             params: {
//                 key: 'IKH',
//                 address: civ.repQuery,
//                 levels: 'country'
//             }
//         })
//         .then(function(res, status) {
//                 civ.myReps = res.data;
//                 console.log(civ.myReps)
//                 civ.repArray = civ.myReps;
//
//                 civ.myReps.offices.forEach(function(office, index) {
//                     civ.officeOfficals.push({
//                         officeName: office.name,
//                         officialName: civ.myReps.officials[index].name,
//                         officialParty: civ.myReps.officials[index].party,
//                         officialPhoto: civ.myReps.officials[index].photoUrl
//                     });
//                 })
