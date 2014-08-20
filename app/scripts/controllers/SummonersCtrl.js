'use strict';

/**
 * @ngdoc function
 * @name lolAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lolAppApp
 */
angular.module('lolApp')
.controller('SummonersCtrl', function ($scope, $state, $location,  SummonerService, ChampionService, StaticDataService) {
    $scope.summoner = SummonerService.summoner;
    $scope.loading = true;
    $scope.$state = $state;
    ChampionService.getChampion().then(function(){
        $scope.loading = true;
        angular.forEach($scope.summoner.rankedStats, function(rankedstats){
            rankedstats.name = ChampionService.getChampionName(rankedstats.id);
            rankedstats.statsByGame = SummonerService.getStatsByGame(rankedstats.stats);
            rankedstats.winRate = SummonerService.getWinRate(rankedstats.stats);
        });
        angular.forEach($scope.summoner.recentGames, function(recentgames){
            recentgames.name = ChampionService.getChampionName(recentgames.championId);
        });
        $scope.loading = false;
    });
});
