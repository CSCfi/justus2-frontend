

'use strict';

angular.module('AuthService', [])
    .service('AuthService', ['$rootScope', '$http', '$cookies', 'AUTH_URL',
        function($rootScope, $http, $cookies, AUTH_URL) {

            let getUserInfo = function () {
                return $http.get(AUTH_URL).then(function (response) {
                    console.log(response);
                    if (response.data.perustiedot) {
                        return { "status": 200, "data": setUser(response.data)}
                    } else
                        return { "status": 401, "data": "User is not signed in"}
                }).catch(function (err) {
                    console.log(err);
                    return { "status": 'error', "data": err };
                })
            };

            let setUser = function(response) {
                user.name = response.perustiedot.nimi;
                user.mail = response.perustiedot.email;
                user.role = response.perustiedot.rooli;
                user.organization.code = response.perustiedot.organisaatio;
                user.organization.name = response.perustiedot.organisaationimi;
                user.organization.showPublicationInput = response.perustiedot.showPublicationInput;
                user.visibleFields = response.visibleFields;
                user.requiredFields = response.requiredFields;
                user.alayksikot = response.alayksikot;
                user.jukuriUser = response.perustiedot.jukuriUser;

                user.lang = response.perustiedot.kieli;
                user.owner = response.perustiedot.owner;

                return user;
            };

            let isLoggedIn = function () {

                let cookies = $cookies.getAll();
                console.log(cookies);
                console.log(Object.keys(cookies).length);

                if (Object.keys(cookies).length < 2 || user.name === "") {
                    return false;
                } else {
                    return true;
                }
            };


            let user = {
                "name": "",
                "mail": "",
                "role": "",
                "organization": {
                    "code": "",
                    "name": ""
                },
                "lang": "",
                "visibleFields": [],
                "requiredFields": [],
                "alayksikot": []
            };

            return { getUserInfo: getUserInfo, isLoggedIn: isLoggedIn, setUser: setUser };

        }

    ]);
