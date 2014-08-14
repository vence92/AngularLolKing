'use strict';


angular.module('lolApp')
    .service('SummonerService', function ($http, $q) {

        var key = '?api_key=eb5cff4a-9a8a-4932-a8f8-429e6d9c7183';
        var ApiUrl = 'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/';

        function getSummoner(name) {
            return $http.get(ApiUrl + name + key).success(function(data){
                
                api.summoner = data[name];

                $http.get('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/'+ api.summoner.id + '/masteries' + key).success(function(data){
                    api.summoner.masteries = data[api.summoner.id].pages;
                });

                $http.get('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/'+ api.summoner.id + '/runes' + key).success(function(data){
                    api.summoner.runes = data[api.summoner.id].pages;
                });

                $http.get('https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/'+ api.summoner.id +'/ranked' + key).success(function(data){
                    api.summoner.rankedStats = data.champions;
                });

                $http.get('https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/'+ api.summoner.id +'/recent' + key).success(function(data){
                    api.summoner.recentGames = data.games;
                });

                $http.get('https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/'+ api.summoner.id +'/summary?season=SEASON4&api_key=eb5cff4a-9a8a-4932-a8f8-429e6d9c7183').success(function(data){
                    api.summoner.summary = data.playerStatSummaries;
                })

                $http.get('https://euw.api.pvp.net/api/lol/euw/v2.4/league/by-summoner/'+ api.summoner.id+'/entry' + key).success(function(data){
                    api.summoner.league = data[api.summoner.id];
                })
            });
        }


        function getStatsByGame(stats) {
            var statsByGame = {
                totalAssists:null,
                totalChampionKills:null,
                totalDeathsPerSession: null,
                totalMinionKills: null
            };

            angular.forEach(statsByGame, function(value, key){
                statsByGame[key] = Math.round(stats[key] / stats.totalSessionsPlayed *10)/10;
            });

            return statsByGame;
        }


        var api = {
            summoner: null,
            getSummoner: getSummoner,
            getStatsByGame: getStatsByGame
        };

    return api;
});