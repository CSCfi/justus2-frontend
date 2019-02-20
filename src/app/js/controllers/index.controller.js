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

          $scope.lang = response.data.perustiedot.kieli;


          //  if user's organization code is 00000 fetch data from all organizations
          if (response.data.perustiedot.organisaatio === "00000") {
                getDemoOrganisationList($scope.user);
        }

        $rootScope.user = $scope.user;
        $rootScope.initialUser = $scope.user;
        $scope.initialRole = $scope.user.role;
        AuthService.storeUserInfo($scope.user);

      })

      .catch(function(error) {
            console.log(error);
      });
    }


   let getDemoOrganisationList = function(user) {
         // Initialize role/organization selectors for demo user
         $scope.selectedDemoUserRole = user.role;
         $scope.selectedDemoUserOrganizationCode = user.organization.code;

         $http.get(API_BASE_URL + 'organisaatiolistaus')
             .then(function(response) {
                 $scope.organisationList = response.data;

      });

     };

  let init = function() {

    $scope.codes = {};
    $scope.i18n = (typeof (i18n) !== 'undefined') ? i18n : {};

    if (!$scope.lang) {
        $scope.lang = "FI";
    }

    $scope.getOrganizationList();

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

        let languageObject = { "lang": lang };
       // post language parameter to backend
        APIService.post('language',  languageObject).then(function (res) {
            console.log(res);
            $scope.lang =  lang;
            // initialize data with new language
            init();
        }).catch(function (err) {
            console.log(err);
        });

    };

 // for ui listing unique organizations ordered by language!
  $scope.getOrganizationList = function() {

      $http.get(API_BASE_URL + 'organisaationimet')
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
      let target = encodeURIComponent(SITE_URL + '#!/valitse');
      $window.location.href = SITE_URL + 'Shibboleth.sso/Login?target=' + target;
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

        for (let i = 0; i < $scope.organisationList.length; i++) {
            if ($scope.organisationList[i].arvo === organizationCode) {

                $scope.user.organization.code = organizationCode;
                $scope.user.organization.name = $scope.organisationList[i].selite;

                $scope.user.visibleFields = $scope.organisationList[i].visibleFields;
                $rootScope.user.visibleFields = $scope.organisationList[i].visibleFields;

                $scope.user.requiredFields = $scope.organisationList[i].requiredFields;
                $rootScope.user.requiredFields = $scope.organisationList[i].requiredFields;

                $scope.user.alayksikot = $scope.organisationList[i].alayksikot;

            }
        }

    };

    init();

  }
]);
