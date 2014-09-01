'use strict';


angular.module('lolApp')
    .service('StaticDataService', function ($http) {

        var ApiKey = 'api_key=eb5cff4a-9a8a-4932-a8f8-429e6d9c7183';
        var ApiUrl = 'https://global.api.pvp.net/api/lol/static-data/euw';

        function getMasteries() {
            return $http.get(ApiUrl + '/v1.2/mastery?masteryListData=all&' + ApiKey).success(function(masteries){
                angular.forEach(masteries.data, function(mastery) {
                    mastery.currentRank = 0;
                    mastery.config = api.getMasteryConf(mastery.id);
                });
                api.masteries = masteries;
            });
        }
        function getMasteryConf(item) {
            item = item.toString();
            var config = {
                block : item.charAt(1),
                top : item.charAt(2),  
                left : item.charAt(3)
            };
            return config;
        }
        var api = {
            masteries: [],
            getMasteries: getMasteries,
            getMasteryConf : getMasteryConf
        };

    return api;
});