angular.module('login', [])
    .controller('controller.login', ['http', function($http) {
        var login = this;

        login.submit = function() {
            console.log(login);

            $http({
                method: 'POST',
                url: '/login',
                data: {
                    email: login.email,
                    password: login.password
                }
            }).then(function(res) {
                console.info(res.data);
                location.href + '/';
            }, function(err) {
                console.error(err);
            });
        }
    }]);
