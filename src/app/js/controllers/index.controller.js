'use strict';

angular.module('IndexController', [])
.controller('IndexController', [
  '$scope', '$rootScope', '$http', '$window', '$stateParams', '$transitions', '$location', 'KoodistoService', 'AuthService', 'APIService', 'AUTH_URL', 'SITE_URL', 'API_BASE_URL', 'DEMO_ENABLED',
  function($scope, $rootScope, $http, $window, $stateParams, $transitions, $location, KoodistoService, AuthService, APIService, AUTH_URL, SITE_URL, API_BASE_URL, DEMO_ENABLED) {
    $scope.demoEnabled = DEMO_ENABLED;
    $scope.siteUrl = SITE_URL;

    if (typeof (AUTH_URL) !== 'undefined') {

      $http.get(AUTH_URL)
      .then(function(response) {

          $scope.user = {
              "name": "",
              "mail": "",
              "role": "",
              "organization": {
                  "code": "",
                  "name": ""
              },
              "visibleFields": [],
              "requiredFields": [],
              "alayksikot": []
          };

          $scope.user.name = response.data.perustiedot.nimi;
          $scope.user.mail = response.data.perustiedot.email;
          $scope.user.role = response.data.perustiedot.rooli;
          $scope.user.organization.code = response.data.perustiedot.organisaatio;
          $scope.user.organization.name = response.data.perustiedot.organisaationimi;
          $scope.user.visibleFields = response.data.visibleFields;
          $scope.user.requiredFields = response.data.requiredFields;
          $scope.user.alayksikot = response.data.alayksikot;

            if (response.data.perustiedot.organisaatio === "00000") {

                // Initialize role/organization selectors for demo user
                $scope.selectedDemoUserRole = $scope.user.role;
                $scope.selectedDemoUserOrganizationCode = $scope.user.organization.code;

                //  if user's organization code is 00000 fetch data from all organizations
                $http.get(API_BASE_URL + 'organisaatiolistaus')
                    .then(function(response) {
                        $scope.codes.organization = response.data;

                });
            }

        $rootScope.user = $scope.user;
        $rootScope.initialUser = $scope.user;
        $scope.initialRole = $scope.user.role;
        AuthService.storeUserInfo($scope.user);
      })

      .catch(function() {
        if (DEMO_ENABLED) {
            $http.get(API_BASE_URL + 'organisaatiolistaus')
                .then(function(response) {
                    let allOrganizations = response.data;
                    $scope.codes.organization = response.data;

                    for (var i = 0; i < allOrganizations.length; i++) {
                        if (allOrganizations[i].arvo === '00000') {
                            $rootScope.user = angular.copy(allOrganizations[i]);
                            $scope.user = angular.copy(allOrganizations[i]);
                        }
                    }

                    $scope.user.name = demoUser.name;
                    $scope.user.organization = demoUser.organization;
                    $rootScope.user.organization = demoUser.organization;
                    $scope.user.role = demoUser.role;

                    $scope.initialRole = 'admin';
                    $rootScope.initialUser = $scope.user;
                    AuthService.storeUserInfo($scope.user);

                    // Initialize role/organization selectors for demo user
                    $scope.selectedDemoUserRole = 'admin';
                    $scope.selectedDemoUserOrganizationCode = '00000';

                });
        }
      });
    }

  let init = function() {

    $scope.lang = AuthService.getLanguage();

    $scope.i18n = (typeof (i18n) !== 'undefined') ? i18n : {};
    $scope.codes = {};

    !$scope.codes.kieli && KoodistoService.getKoodistoData('kielet')
        .then(function(o) {
            $scope.codes.kieli = o.data;
        }, function (error) {
            console.log(error);
    });

    !$scope.codes.maatjavaltiot2 && KoodistoService.getKoodistoData('valtiot')
        .then(function(o) {
            $scope.codes.maatjavaltiot2 = o.data;
        }, function (error) {
            console.log(error);
    });

    !$scope.codes.julkaisuntila && KoodistoService.getKoodistoData('julkaisuntilat')
        .then(function(o) {
            $scope.codes.julkaisuntila = o.data;
        }, function (error) {
            console.log(error);
    });

    !$scope.codes.tieteenalat && KoodistoService.getKoodistoData('tieteenalat')
        .then(function(o) {
            $scope.codes.tieteenalat = o.data;
        }, function (error) {
            console.log(error);
        });

    !$scope.codes.julkaisutyypit && KoodistoService.getKoodistoData('julkaisunluokat')
        .then(function(o) {
            $scope.codes.julkaisutyypit = o.data;
        }, function (error) {
            console.log(error);
    });

    !$scope.codes.julkaisuntekijanrooli && KoodistoService.getKoodistoData('tekijanrooli')
        .then(function(o) {
            $scope.codes.julkaisuntekijanrooli = o.data;
        }, function (error) {
            console.log(error);
    });

    !$scope.codes.taiteenalat && KoodistoService.getKoodistoData('taiteenalat')
        .then(function(o) {
            $scope.codes.taiteenalat = o.data;
        }, function (error) {
            console.log(error);
    });

    !$scope.codes.taidealantyypit && KoodistoService.getKoodistoData('taidealantyyppikategoria')
        .then(function(o) {
            $scope.codes.taidealantyypit = o.data;
        }, function (error) {
            console.log(error);
    });

      !$scope.codes.taidealantyypit && KoodistoService.getKoodistoData('taidealantyyppikategoria')
          .then(function(o) {
              $scope.codes.taidealantyypit = o.data;
          }, function (error) {
              console.log(error);
          });


  };

    $scope.changeLang = function(lang) {
        $scope.lang = lang;
        $stateParams.lang = lang;
        AuthService.storeLanguage(lang);
    //    post language parameter to backend
    //     APIService.post('kieli', lang);
    };

 // for ui listing unique organizations ordered by language!
  $scope.getOrganizationList = function() {

        let retFI = [];
        let retSV = [];
        let retEN = [];

      angular.forEach($scope.codes.organization, function(oobj, okey) {
        if (oobj.arvo !== '00000' && retFI.indexOf(oobj.selite['FI']) < 0) {
          retFI.push(oobj.selite['FI']);
        }
        if (oobj.arvo !== '00000' && retSV.indexOf(oobj.selite['SV']) < 0) {
          retSV.push(oobj.selite['SV']);
        }
        if (oobj.arvo !== '00000' && retEN.indexOf(oobj.selite['EN']) < 0) {
          retEN.push(oobj.selite['EN']);
        }
      });
      $scope.organizationListFI = retFI.sort();
      $scope.organizationListSV = retSV.sort();
      $scope.organizationListEN = retEN.sort();
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

    // figure out selected language (part of login process)
    $transitions.onSuccess(null, function(trans) {
      $scope.lang = $scope.lang || $stateParams.lang || 'FI';
    });

    // ACCESSORIES (scope functions)

    // check that user has access to whatever the input
    $scope.hasAccess = function(input) {

      // hyvaksy - admin role is required
      if (input === 'hyvaksy') {
        if ($scope.user && $scope.user.name &&
          $scope.user.organization && $scope.user.organization.code &&
          ($scope.user.role === 'owner' || $scope.user.role === 'admin')) {
          return true;
        }
        else {
          return false;
        }
      }
      // basically all states - name, organization (with code) and a role are required
      if ($scope.user && $scope.user.name &&
        $scope.user.organization && $scope.user.organization.code &&
        ($scope.user.role === 'owner' || $scope.user.role === 'admin' || $scope.user.role === 'member')) {

        return true;
      }
      return false;
    };

    $scope.login = function() {
      let target = encodeURIComponent(SITE_URL + '#!/valitse?lang=' + $scope.lang);
      $window.location.href = SITE_URL + 'Shibboleth.sso/Login?target=' + target;
    };

    // helper for localStorage
    $scope.resetKoodisto = function() {
      KoodistoService.reset();
    };

    $scope.getMenuClass = function(menuPath) {
      return ($location.path().indexOf(menuPath) !== -1) ? 'active' : '';
    };

    $scope.setDemoUserRole = function(userRole) {
      $scope.user.role = userRole;
      $rootScope.user = $scope.user;
      AuthService.storeUserInfo($scope.user);
    };

    $scope.setDemoUserOrganization = function(organizationCode) {

        for (let i = 0; i < $scope.codes.organization.length; i++) {
            if ($scope.codes.organization[i].arvo === organizationCode) {

                $scope.user.organization.code = organizationCode;
                $scope.user.organization.name = $scope.codes.organization[i].selite;

                $scope.user.visibleFields = $scope.codes.organization[i].visibleFields;
                $rootScope.user.visibleFields = $scope.codes.organization[i].visibleFields;

                $scope.user.requiredFields = $scope.codes.organization[i].requiredFields;
                $rootScope.user.requiredFields = $scope.codes.organization[i].requiredFields;

                $scope.user.alayksikot = $scope.codes.organization[i].alayksikot;

            }
        }

    };

    init();

  }
]);
