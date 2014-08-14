'use strict';

/**
 * @ngdoc function
 * @name lolAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lolAppApp
 */
angular.module('lolApp')
.controller('SummonersCtrl', function ($scope, $state, $location,  SummonerService, ChampionService) {
    $scope.summonerService = SummonerService;
    $scope.loading = false;
    $scope.name = 'jarjarv';
    $scope.selectedRegion = 'euw';
    $scope.getSummoner = function(name, selectedRegion) {
        $scope.loading = true;
        SummonerService.getSummoner(name, selectedRegion).then(function(summoner){
            $scope.summoner = summoner.data[name];
            $state.go('summoners.details', { region : $scope.selectedRegion, id : $scope.summoner.id});
        });       
        ChampionService.getChampion().then(function(){
            angular.forEach($scope.summoner.rankedStats, function(rankedstats){
                rankedstats.name = ChampionService.getChampionName(rankedstats.id);
                rankedstats.statsByGame = SummonerService.getStatsByGame(rankedstats.stats);
            });
            angular.forEach($scope.summoner.recentGames, function(recentgames){
                recentgames.name = ChampionService.getChampionName(recentgames.championId);
            })
            $scope.loading = false;
        });
    };
});
