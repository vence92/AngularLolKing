'use strict';

/**
 * @ngdoc overview
 * @name lolAppApp
 * @description
 * # lolAppApp
 *
 * Main module of the application.
 */
angular
  .module('lolApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/champions', {
        templateUrl: 'views/champions.html',
        controller: 'ChampionsCtrl'
      })
      .when('/summoners', {
        templateUrl: 'views/summoners.html',
        controller: 'SummonersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function(ChampionService){
    ChampionService.getChampion();
  });

