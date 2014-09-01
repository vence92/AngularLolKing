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
    $scope.MostChampionsPlayed = Highcharts;
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


        $scope.MostChampionsPlayed
            .setOptions({
                colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                chart: {
                    type: 'column'
                },
                'plotOptions': {
                  'series': {
                    'stacking': 'normal'
                  }
                }
            });


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

            loading: false
        }
        $scope.loading = false;
    });

/*    $scope.addPoints = function () {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    $scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    }

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    }

    $scope.swapChartType = function () {
        if (this.chartConfig.options.chart.type === 'line') {
            this.chartConfig.options.chart.type = 'bar'
        } else {
            this.chartConfig.options.chart.type = 'line'
            this.chartConfig.options.chart.zoomType = 'x'
        }
    }

    $scope.toggleLoading = function () {
        this.chartConfig.loading = !this.chartConfig.loading
    }*/
});
