// Conroller & API
angular.module('civApp')
    .controller('civController', civController);

civController.$inject = ['$http', 'userFactory'];

function civController($http, userFactory) {
    var civ = this;
    civ.loading = false;
    civ.greeting = "Welcome";
    civ.show = false;
    civ.officeOfficals = [];
    // Google Poll Locations
    civ.getInfo = function() {
        $http({
                method: 'GET',
                url: 'https://www.googleapis.com/civicinfo/v2/voterinfo',
                params: {
                    key: 'AIzaSyC9LRRpJaqbHq1_wqecCOeSX0wFIKf14T4',
                    address: civ.searchQuery
                }
            })
            .then(function(res, status) {
                    civ.myData = res.data;
                    console.log(civ.myData)
                    civ.pollArray = civ.myData.pollingLocations;
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
                        officialPhone: civ.myReps.legislator[index]['@attributes'].phone,
                        officialCid: civ.myReps.legislator[index]['@attributes'].cid
                    })
                })
            },
            function(res, status) {
                console.log('Failure', status);
            });
    };
    civ.callCont = function(specCid) {
        $http.get(`http://www.opensecrets.org/api/?method=candIndustry&cid=${specCid}&apikey=c71586955acdfdc1ddedbbaf0711fb60&output=json`)
            .then(function(res, status) {
                    civ.myMoney = res.data.response.industries.industry;
                    civ.moneyArray = [];
                    civ.loading = true;


                    for (var i = 0; i < 3; i++) {
                        civ.moneyArray.push({
                            donorName: civ.myMoney[i]['@attributes'].industry_name,
                            donorTotal: civ.myMoney[i]['@attributes'].total
                        })
                    }
                    console.log(civ.moneyArray);

                },
                function(res, status) {
                    console.log('Failure', status);
                })
        console.log(specCid);

    };
    civ.createUser = function() {
        userFactory.createUser(civ.userData)
            .then(function(returnData) {
                console.log('Return Data', returnData);
                civ.userData = {};
                location.href = "#login";
            })
    };
    civ.fixIt = function() {
        civ.loading = false;
    };
};
