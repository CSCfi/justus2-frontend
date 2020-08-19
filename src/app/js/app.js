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
      },
      data:  { pageTitle: 'kirjaudu' }
    };

    const valitseState = {
      name: 'valitse',
      url: '/valitse',
      views: {
        '': {
          templateUrl: 'html/valitse.html'
        }
      },
      data:  { pageTitle: 'etusivu' }
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
      },
      data:  { pageTitle: 'justus' }
    };

    const omatState = {
      name: 'omat',
      url: '/omat',
      views: {
        '': {
          templateUrl: 'html/tarkasta.html',
          controller: 'TarkastaController'
        }
      },
      data:  { pageTitle: 'omat' }
    };

    const hyvaksyState = {
      name: 'hyvaksy',
      url: '/hyvaksy',
      views: {
        '': {
          templateUrl: 'html/tarkasta.html',
          controller: 'TarkastaController'
        }
      },
      data:  { pageTitle: 'hyvaksy' }
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
.run(['$rootScope', '$window', '$log', '$state', '$transitions',
  function ($rootScope, $window, $log, $state, $transitions) {

  const Promise = $window.Promise;

  Promise.setScheduler(function (cb) {
    $rootScope.$evalAsync(cb);
  });

  window.addEventListener('unhandledrejection', function(e) {
    e.preventDefault();
    $log.error(e.detail.reason);
  });

    $transitions.onSuccess({}, (transition) => {
      $rootScope.pageTitle = $state.current.data.pageTitle;
    });

}]);




