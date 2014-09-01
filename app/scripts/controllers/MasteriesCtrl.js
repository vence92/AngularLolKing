'use strict';

/**
 * @ngdoc function
 * @name lolAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lolAppApp
 */
angular.module('lolApp')
    .controller('MasteriesCtrl', function ($scope, $filter, StaticDataService, SummonerService) {
        $scope.summoner = SummonerService.summoner;
        $scope.block = 3;
        $scope.currentIndex = $scope.summoner.currentPage;
        $scope.getBlockNumber = function(block) {
            return new Array(block);
        };
        $scope.getMasteryPage = function(page) {
            $scope.currentIndex = page;
            StaticDataService.getMasteries().then(function(masteries){
                $scope.masteries = masteries.data.data;
                angular.forEach($scope.summoner.masteries[page].masteries, function(mastery){
                    if($scope.masteries[mastery.id]) {
                        $scope.masteries[mastery.id].currentRank = mastery.rank;
                    }
                });
            });    
        }; 
        $scope.getMasteriesPoints = function(index) {
            return $filter('formatTypeMastery')(index);
        };
        $scope.getMasteryPage($scope.summoner.currentPage);
    });
