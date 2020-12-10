

'use strict';

angular.module('AuthService', [])
    .service('AuthService', ['$rootScope', '$http', '$cookies', 'AUTH_URL',
        function($rootScope, $http, $cookies, AUTH_URL) {

            let getUserInfo = function () {
                return $http.get(AUTH_URL).then(function (response) {
                    console.log(response);
                    if (!response || response.status !== 200) {
                        return false;
                    } else {
                        return setUser(response.data);
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            };

            let setUser = function(response) {
                user.name = response.perustiedot.nimi;
                user.mail = response.perustiedot.email;
                user.seloste = response.perustiedot.seloste;
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

                let sessionCookie = $cookies.get("connect.sid");
                let shibSession = $cookies.get("_shibsession_session.cookie");
                console.log(sessionCookie);
                console.log(shibSession);
                console.log($rootScope.user);

                if (!sessionCookie || !shibSession || !$rootScope.user) {
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
