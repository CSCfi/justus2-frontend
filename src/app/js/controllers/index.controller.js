'use strict';

angular.module('IndexController', [])
.controller('IndexController', [
  '$scope', '$rootScope', '$http', '$window', '$stateParams', '$transitions', '$location', 'KoodistoService', 'AuthService', 'AUTH_URL', 'SITE_URL', 'DEMO_ENABLED',
  function($scope, $rootScope, $http, $window, $stateParams, $transitions, $location, KoodistoService, AuthService, AUTH_URL, SITE_URL, DEMO_ENABLED) {
    $scope.demoEnabled = DEMO_ENABLED;
    $scope.siteUrl = SITE_URL;

    if (typeof (AUTH_URL) !== 'undefined') {

      $http.get(AUTH_URL)
      .then(function(response) {
        $scope.user = response.data;

        // backend/auth provides but config has more info (code+mail):

        // $scope.user.organization = domain_organization[$scope.user.domain];

        $rootScope.user = $scope.user;
        $rootScope.initialUser = $scope.user;
        $scope.initialRole = $scope.user.role;
        AuthService.storeUserInfo($scope.user);

        // Initialize role/organization selectors for demo user
        $scope.selectedDemoUserRole = $scope.user.role;
        $scope.selectedDemoUserOrganizationCode = $scope.user.organization.code;
      })

      .catch(function() {
        if (DEMO_ENABLED) {

    /*** Demouser ***/

            $http.get('files/organisaatiolistaus.json')
                .then(function(response) {
                    let allOrganizations = response.data;
                    $scope.codes.organization = response.data;

                    for (var i = 0; i < allOrganizations.length; i++) {
                        if (allOrganizations[i].arvo === '00000') {
                            $rootScope.user = allOrganizations[i];
                            $scope.user = allOrganizations[i];
                        }
                    }

                    $scope.user.name = demoUser.name;
                    $scope.user.organization = demoUser.organization;
                    $scope.user.role = demoUser.role;

                    $scope.initialRole = 'admin';
                    $rootScope.initialUser = $scope.user;
                    AuthService.storeUserInfo($scope.user);

                    // Initialize role/organization selectors for demo user
                    $scope.selectedDemoUserRole = 'admin';
                    $scope.selectedDemoUserOrganizationCode = '00000';
            //         console.log(allOrganizations);


          /*** Enf of demouser ***/


          /*** Organisation user ***/

      // $http.get('files/user.json')
      //     .then(function(response) {
      //
      //         $rootScope.user = response.data;
      //         $scope.user = response.data;
      //
      //         $scope.initialRole = $scope.user.role;
      //         console.log($scope.initialRole);
      //         $rootScope.initialUser = $scope.user;
      //
      //         // Initialize role/organization selectors for demo user
      //         $scope.selectedDemoUserRole = 'admin';
      //         $scope.selectedDemoUserOrganizationCode = '00000';
      //
      //         AuthService.storeUserInfo($scope.user);


          /*** Enf of organisation user ***/

        });
        }
      });
    }

  let init = function() {
    $scope.i18n = (typeof (i18n) !== 'undefined') ? i18n : {};
    $scope.codes = (typeof (codes) !== 'undefined') ? codes : {}; // config


    !$scope.codes.kieli && KoodistoService.getKielet().then(function(o) {
        $scope.codes.kieli = o.data;
    });
    !$scope.codes.maatjavaltiot2 && KoodistoService.getValtiot().then(function(o) {
        $scope.codes.maatjavaltiot2 = o.data;
    });
    !$scope.codes.julkaisuntila && KoodistoService.getJulkaisuntila().then(function(o) {
      $scope.codes.julkaisuntila = o.data;

    });

    // tieteenalat, julkaisutyypit, ...
    !$scope.codes.tieteenalat && KoodistoService.getTieteenalat().then(function(o) {
      $scope.codes.tieteenalat = o.data;
    });
    !$scope.codes.julkaisutyypit && KoodistoService.getJulkaisuluokat().then(function(o) {
      $scope.codes.julkaisutyypit = o.data;
    });
    !$scope.codes.julkaisuntekijanrooli && KoodistoService.getRooli().then(function(o) {
        $scope.codes.julkaisuntekijanrooli = o.data;
    });
    !$scope.codes.taiteenalat && KoodistoService.getTaiteenalat().then(function(o) {
      $scope.codes.taiteenalat = o.data;
    });
    !$scope.codes.taidealantyypit && KoodistoService.getTaidealantyypit().then(function(o) {
      $scope.codes.taidealantyypit = o.data;
    });



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
      $scope.lang = $stateParams.lang || $scope.lang || 'FI';
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
      let target = encodeURIComponent(SITE_URL + '/#!/valitse?lang=' + $scope.lang);
      $window.location.href = SITE_URL + '/Shibboleth.sso/Login?target=' + target;
    };

    // map from service (generic) to scope
    $scope.getCode = function(codeset, code) {
      return KoodistoService.getCode($scope.codes, codeset, code);
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

    $scope.setDemoUserOrganization = function(organization) {
        var organizationData = JSON.parse(organization);
        $scope.user.organization.code = organizationData.arvo;
        $scope.user.organization.name = organizationData.selite;
        $scope.user.visibleFields = organizationData.visibleFields;
        $rootScope.user.visibleFields = organizationData.visibleFields;
        $scope.user.alayksikot = organizationData.alayksikot;
    };

    init();

  }
]);
