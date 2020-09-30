

'use strict';

angular.module('AuthService', [])
    .service('AuthService', ['$rootScope', '$http', 'AUTH_URL',
        function($rootScope, $http, AUTH_URL) {

            let getUserInfo = function () {
                return $http.get(AUTH_URL).then(function (response) {
                    console.log(response.data);
                   return setUser(response.data);
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

                user.hrDataExists = response.perustiedot.showHrData;

                user.lang = response.perustiedot.kieli;
                user.owner = response.perustiedot.owner;

                console.log(user);

                return user;
            };

            let isLoggedIn = function () {
                if (user.name === "") {
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
