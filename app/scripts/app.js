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
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/index.html");
        //
        // Now set up the states
    $stateProvider
        .state('champions', {
            url: "/champions",
            templateUrl: "views/champions.html",
            controller: "ChampionsCtrl"
        })
        .state('summoners', {
            url: "/summoners",
            templateUrl: "views/summoners.html",
            controller: "SummonersCtrl"
        })
  })
  .run(function(ChampionService){
    ChampionService.getChampion();
  });

