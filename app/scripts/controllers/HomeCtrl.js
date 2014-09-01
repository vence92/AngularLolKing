'use strict';


angular.module('lolApp')
    .controller('HomeCtrl', function ($scope, $state, $location, ChampionService, SummonerService) {
        $scope.summonerService = SummonerService;
        $scope.name = 'jarjarv';
        $scope.selectedRegion = 'euw';
        $scope.getSummoner = function(name, selectedRegion) {
            SummonerService.getSummoner(name, selectedRegion).then(function(data){
                $scope.summoner = data;
                $state.go('summoners.profile', { 
                    region : $scope.selectedRegion, 
                    id : $scope.summoner.id
                });
            });
        }       
    });