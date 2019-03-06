'use strict';

angular.module('AuthService', [])
    .service('AuthService', ['$rootScope', '$http', 'AUTH_URL',
        function($rootScope, $http, AUTH_URL) {

            let getUserInfo = function () {
                if (user.name === "") {
                    return $http.get(AUTH_URL).then(function (response) {
                        user.name = response.data.perustiedot.nimi;
                        user.mail = response.data.perustiedot.email;
                        user.role = response.data.perustiedot.rooli;
                        user.organization.code = response.data.perustiedot.organisaatio;
                        user.organization.name = response.data.perustiedot.organisaationimi;
                        user.visibleFields = response.data.visibleFields;
                        user.requiredFields = response.data.requiredFields;
                        user.alayksikot = response.data.alayksikot;

                        user.organization.showPublicationInput = response.data.perustiedot.showPublicationInput;

                        user.lang = response.data.perustiedot.kieli;
                        return user;
                    })
                } else {
                    return user;
                }

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


            return {getUserInfo: getUserInfo, isLoggedIn: isLoggedIn};

        }


    ]);
