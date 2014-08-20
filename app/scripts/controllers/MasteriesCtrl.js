'use strict';

/**
 * @ngdoc function
 * @name lolAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lolAppApp
 */
angular.module('lolApp')
.controller('MasteriesCtrl', function ($scope, StaticDataService, SummonerService) {
    $scope.summoner = SummonerService.summoner;
    $scope.block = 3;
    $scope.currentIndex = 0;
    $scope.getBlockNumber = function(block) {
        return new Array(block); 
    }
    $scope.getMasteryPage = function(page) {
        $scope.currentIndex = page;
        StaticDataService.getMasteries().then(function(masteries){
            $scope.masteries = masteries.data.data;
            /*console.log($scope.masteries);*/
            angular.forEach($scope.summoner.masteries[page].masteries, function(mastery){
                if($scope.masteries[mastery.id]) {
                    console.log($scope.masteries[mastery.id]);
                    console.log(mastery.rank);
                    $scope.masteries[mastery.id].currentRank = mastery.rank;
                }
            });
        });    
    }; 
    $scope.getMasteryPage(0);
});
