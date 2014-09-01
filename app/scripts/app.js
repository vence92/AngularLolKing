'use strict';

/**
 * @ngdoc overview
 * @name lolAppApp
 * @description
 * # lolAppApp
 *
 * Main module of the application.
 */
var myapp = angular
    .module('lolApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'highcharts-ng'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('home');
        //
        // Now set up the states
    $stateProvider
        .state('home', {
            url: '/home',
            controller:'HomeCtrl'
        })
        .state('champions', {
            url: '/champions',
            templateUrl: 'views/Champions/index.html',
            controller: 'ChampionsCtrl'
        })
        .state('summoners', {
            url: '/summoners/:region/:id',
            templateUrl: 'views/Summoners/index.html',
              controller: 'SummonersCtrl'
        })
            .state('summoners.profile', {
                url: '/profile',
                templateUrl: 'views/Summoners/profile.html'
            })
            .state('summoners.leagues', {
                url: '/leagues',
                templateUrl: 'views/Summoners/leagues.html'
            })
            .state('summoners.rankedstats', {
                url: '/rankedstats',
                templateUrl: 'views/Summoners/rankedstats.html'
            })
            .state('summoners.matches', {
                url: '/matches',
                templateUrl: 'views/Summoners/matches.html'
            })
            .state('summoners.masteries', {
                url: '/masteries',
                templateUrl: 'views/Summoners/masteries.html',
                controller: 'MasteriesCtrl'
            })
            .state('summoners.runes', {
                url: '/runes',
                templateUrl: 'views/Summoners/runes.html'
            });

    });
