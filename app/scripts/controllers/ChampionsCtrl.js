'use strict';

/**
 * @ngdoc function
 * @name lolAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lolAppApp
 */
angular.module('lolApp')
  .controller('ChampionsCtrl', function ($scope, ChampionService) {
    
    ChampionService.getChampion().then(function(champions){
        $scope.champions = champions.data.data;
    });

  });
