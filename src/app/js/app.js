let app = angular.module('JustusApp', [

  // Vendor modules
  'ui.router',
  'ui.select',
  'ngAnimate',
  'ngTouch',
  'ngSanitize',
  'ui.bootstrap',
  'ngTagsInput',
  'ngCsv',
  'ngFileUpload',
  'infinite-scroll',

  // App modules
  'appConfig',
  'templates',
  'FiltersModule',
  'ControllersModule',
  'ServicesModule'
])

.config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    const indexState = {
      name: 'index',
      url: '/',
      views: {
        '': {
          templateUrl: 'html/index_part.html'
        }
      }
    };

    const valitseState = {
      name: 'valitse',
      url: '/valitse',
      views: {
        '': {
          templateUrl: 'html/valitse.html'
        }
      }
    };

    const justusState = {
      name: 'justus',
      url: '/justus?vaihe&id',
      views: {
        '': {
          templateUrl: 'html/justus.html'
        }
      },
      params: {
        vaihe: null,
        id: null
      }
    };

    const omatState = {
      name: 'omat',
      url: '/omat',
      views: {
        '': {
          templateUrl: 'html/tarkasta.html',
          controller: 'TarkastaController'
        }
      }
    };

    const hyvaksyState = {
      name: 'hyvaksy',
      url: '/hyvaksy',
      views: {
        '': {
          templateUrl: 'html/tarkasta.html',
          controller: 'TarkastaController'
        }
      }
    };

      const adminState = {
          name: 'admin',
          url: '/admin',
          views: {
            '': {
                templateUrl: 'html/admin/main.html'
            }
          }
      };

    $stateProvider.state(indexState);
    $stateProvider.state(valitseState);
    $stateProvider.state(justusState);
    $stateProvider.state(omatState);
    $stateProvider.state(hyvaksyState);
    $stateProvider.state(adminState);
  }
])

// Configure bluebird
.run(['$rootScope', '$window', '$log', function ($rootScope, $window, $log) {
  const Promise = $window.Promise;

  Promise.setScheduler(function (cb) {
    $rootScope.$evalAsync(cb);
  });

  window.addEventListener('unhandledrejection', function(e) {
    e.preventDefault();
    $log.error(e.detail.reason);
  });
}]);


