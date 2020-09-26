'use strict';

angular.module('IndexController', [])

    .controller('IndexController', [
        '$state', '$timeout', '$q', '$scope', '$rootScope', '$http', '$window', '$stateParams', '$transitions', '$location', 'JustusService', 'KoodistoService', 'AuthService', 'APIService', 'AUTH_URL', 'SITE_URL', 'API_BASE_URL', 'DEMO_ENABLED',
        function($state, $timeout, $q, $scope, $rootScope, $http, $window, $stateParams, $transitions, $location, JustusService, KoodistoService, AuthService, APIService, AUTH_URL, SITE_URL, API_BASE_URL, DEMO_ENABLED) {
            $scope.demoEnabled = DEMO_ENABLED;
            $scope.siteUrl = SITE_URL;



            let signIn = function () {
                if (typeof (AUTH_URL) !== 'undefined') {

                    console.log("In sign in function");

                    AuthService.getUserInfo().then(function (res) {

                        if (res.status === 200) {

                            // scope.user is reference to AuthService's user object
                            $scope.user = res.data;
                            $scope.lang = res.data.lang;

                            if ($scope.user.owner) {
                                $rootScope.initialRole = "owner";
                                getDemoOrganisationList();
                            }

                            $rootScope.user = $scope.user;

                            $scope.showPublicationInput = $rootScope.user.organization.showPublicationInput;
                            fetchKoodistoData();

                        } else if (res.status === 401) {
                            console.log(res.data);
                            console.log("User in unauthorized");
                            $state.go('index');
                        } else {
                            console.log(res.data);
                            console.log("No user data unvailable");
                            $state.go('index');
                        }

                    }).catch(function (err) {
                        console.log(err);
                        $state.go('index');
                    });

                }
            }



            let getDemoOrganisationList = function() {
                $scope.selectedDemoUserRole = "";
                $http.get(API_BASE_URL + 'organisaatiolistaus')
                    .then(function(response) {
                        $scope.organisationList = response.data;

                    });
            };

            let init = function() {

                console.log("Initializing in index controller");

                $scope.codes = {};
                $scope.i18n = (typeof (i18n) !== 'undefined') ? i18n : {};
                if (!$scope.lang) {
                    $scope.lang = "FI";
                }

                // no need to fetch user data if data is already stored on cookie
                if (AuthService.isLoggedIn()) {
                    console.log("User is already logged in");
                    fetchKoodistoData();
                } else {
                    $timeout(function () {
                        console.log($state.$current.name);
                        if($state.$current.name === 'index') {
                            console.log("in index state");
                            // log in page, this is all data needed
                            $scope.getOrganizationList();
                        } else {
                            console.log("Signing in...");
                            signIn();
                        }
                    },500)
                }

            };

            let fetchKoodistoData = function() {

                KoodistoService.getKoodistoData('kielet')
                    .then(function(o) {
                        $scope.codes.kieli = o.data;
                    }, function (error) {
                        console.log(error);
                    });

                KoodistoService.getKoodistoData('valtiot')
                    .then(function(o) {
                        $scope.codes.maatjavaltiot2 = o.data;
                    }, function (error) {
                        console.log(error);
                    });

                KoodistoService.getKoodistoData('julkaisuntilat')
                    .then(function(o) {
                        $scope.codes.julkaisuntila = o.data;
                    }, function (error) {
                        console.log(error);
                    });

                KoodistoService.getKoodistoData('tieteenalat')
                    .then(function(o) {
                        $scope.codes.tieteenalat = o.data;
                    }, function (error) {
                        console.log(error);
                    });

                KoodistoService.getKoodistoData('julkaisunluokat')
                    .then(function(o) {
                        $scope.codes.julkaisutyypit = o.data;
                    }, function (error) {
                        console.log(error);
                    });

                KoodistoService.getKoodistoData('tekijanrooli')
                    .then(function(o) {
                        $scope.codes.julkaisuntekijanrooli = o.data;
                    }, function (error) {
                        console.log(error);
                    });

                KoodistoService.getKoodistoData('taiteenalat')
                    .then(function(o) {
                        $scope.codes.taiteenalat = o.data;
                    }, function (error) {
                        console.log(error);
                    });

                KoodistoService.getKoodistoData('taidealantyyppikategoria')
                    .then(function(o) {
                        $scope.codes.taidealantyypit = o.data;
                    }, function (error) {
                        console.log(error);
                    });
            };

            $scope.changeLang = function(lang) {
                let languageObject = { "lang": lang };

                if (!AuthService.isLoggedIn()) {
                    $scope.lang =  lang;
                    init();
                    return;
                }

                APIService.post('language',  languageObject).then(function (res) {
                    $scope.lang =  lang;
                    // initialize data with new language
                    fetchKoodistoData();
                    init();
                }).catch(function (err) {
                    console.log(err);
                });

            };

            // for ui listing unique organizations ordered by language!
            $scope.getOrganizationList = function() {

                let orgNamesUrl;

                if ($scope.demoEnabled) {
                    orgNamesUrl = API_BASE_URL + 'organisaationimet?lang=';
                } else {
                    orgNamesUrl = API_BASE_URL + 'public/organisaationimet?lang='; 
                }

                $http.get(orgNamesUrl + $scope.lang)
                    .then(function(response) {
                        $scope.organisationNameList = response.data;

                        let indexFI = response.data.indexOf("Tuntematon");
                        let indexSV = response.data.indexOf("Okänd");
                        let indexEN = response.data.indexOf("Unknown");

                        if (indexFI > -1) {
                            $scope.organisationNameList .splice(indexFI, 1);
                        }
                        if (indexSV > -1) {
                            $scope.organisationNameList .splice(indexSV, 1);
                        }
                        if (indexEN > -1) {
                            $scope.organisationNameList .splice(indexEN, 1);
                        }

                    });
            };

            // ugly hack to get ALL alatieteenalas in one list
            $scope.getAlltieteenalat = function() {
                let ret = [];
                angular.forEach($scope.codes.tieteenalat, function(tobj, tkey) {
                    tobj.nogo = true;
                    ret.push(tobj);
                    angular.forEach(tobj.alatyypit, function(aobj, akey) {
                        ret.push(aobj);
                    });
                });
                return ret;
            };

            // for knowing (save to scope) which "state" is selected (criteria+$transitions)
            let criteria = {
                to: function(state) {
                    return state.name != null;
                }
            };
            $transitions.onBefore(criteria, function(trans) {
                var name = trans.to().name;
                $scope.state = { name: name };
            });

            // check that user has access to whatever the input
            $scope.hasAccessToApprove = function() {
                if ($scope.user && $scope.user.name &&
                    $scope.user.organization && $scope.user.organization.code &&
                    ($scope.user.role === 'owner' || $scope.user.role === 'admin')) {
                    return true;
                }
                else {
                    return false;
                }
            };


            $scope.login = function() {
                let target = encodeURIComponent(SITE_URL + '#!/valitse');
                $window.location.href = SITE_URL + 'Shibboleth.sso/Login?target=' + target;
            };


            $scope.logout = function() {
                APIService.post("logout")
                    .then(function(response) {
                        console.log(response);
                        $window.location.href = SITE_URL + 'Shibboleth.sso/Logout?return=' + SITE_URL;
                    }).catch(function (Error) {
                    console.log(Error);
                });


            };

            $scope.getMenuClass = function(menuPath) {
                return ($location.path().indexOf(menuPath) !== -1) ? 'active' : '';
            };

            let resetUserData = function(userData) {
                APIService.post("impersonate", userData)
                    .then(function(response) {
                        console.log(response);
                        $scope.user = AuthService.setUser(response.data);
                        $rootScope.user = $scope.user;
                        $scope.selectedDemoUserRole = "";
                        $scope.selectedDemoUserOrganizationCode = "";
                        $scope.showPublicationInput = $rootScope.user.organization.showPublicationInput;
                        JustusService.clearPublicationForm();
                        $state.reload();
                    }).catch(function (Error) {
                    console.log(Error);
                });
            };

            $scope.resetDemoUser = function() {
                let ownerData = {
                    "organizationId": "00000",
                    "role": "owner"
                };
                resetUserData(ownerData);
             };

            $scope.setDemoUserOrganization = function(organizationCode, userRole) {

                if (!organizationCode || !userRole) return;

                if (userRole === "") {
                    userRole = "admin";
                }
                let demoUserData = {
                  "organizationId": organizationCode,
                  "role": userRole
                };
                resetUserData(demoUserData);
            };

            init();

        }
    ]);
