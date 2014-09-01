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
        $scope.summoner = SummonerService.summoner;
        $scope.loading = true;
        $scope.$state = $state;
        $scope.MostPlayedChamps = Highcharts;
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


           /* $scope.MostPlayedChamps.setOptions({
                colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4','#058DC7'],
                chart: {
                    type: 'column'
                },
                'plotOptions': {
                  'series': {
                    'stacking': 'normal'
                  }
                }
            });*/
            $scope.MostPlayedChamps =  {
                xAxis: {
                    categories: [
                    // TO DO BETTER :D
                        ChampionService.getChampionName($scope.summoner.mostPlayedChamps[0][0]),
                        ChampionService.getChampionName($scope.summoner.mostPlayedChamps[1][0]),
                        ChampionService.getChampionName($scope.summoner.mostPlayedChamps[2][0]),
                        ChampionService.getChampionName($scope.summoner.mostPlayedChamps[3][0]),
                        ChampionService.getChampionName($scope.summoner.mostPlayedChamps[4][0])
                    ]
                },
                series: [
                    {
                        name : 'Total Wins',
                        data: [$scope.summoner.mostPlayedChamps[0][2], $scope.summoner.mostPlayedChamps[1][2], $scope.summoner.mostPlayedChamps[2][2], $scope.summoner.mostPlayedChamps[3][2], $scope.summoner.mostPlayedChamps[4][2]]
                    },
                    {
                        name : 'Total Losses',
                        data: [$scope.summoner.mostPlayedChamps[0][3], $scope.summoner.mostPlayedChamps[1][3], $scope.summoner.mostPlayedChamps[2][3], $scope.summoner.mostPlayedChamps[3][3], $scope.summoner.mostPlayedChamps[4][3]]
                    }
                ],
                title: {
                    text: 'Most Played Champions'
                },

                options : {
                    colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4','#058DC7'],
                    chart: {
                        type: 'column'
                    },
                    'plotOptions': {
                      'series': {
                        'stacking': 'normal'
                      }
                    }
                },
                
                loading: false
            };
            
            $scope.loading = false;
        });
    });
