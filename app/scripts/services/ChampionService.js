'use strict';


angular.module('lolApp')
    .service('ChampionService', function ($http) {

    function getChampion() {
        return $http.get('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?champData=all&api_key=eb5cff4a-9a8a-4932-a8f8-429e6d9c7183').success(function(data){
            api.champions = data.data;
        });
    }


    function getChampionName(id) {
        var name;
        angular.forEach(api.champions, function(champion) {
            if(champion.id === id) {
                name = champion.name;
            }
        });

        return name;
    }

    var api = {
        champions: [],
        getChampion: getChampion,
        getChampionName: getChampionName
    };

    return api;
});