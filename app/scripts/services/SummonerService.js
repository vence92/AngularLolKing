'use strict';


angular.module('lolApp')
    .service('SummonerService', function ($http) {

        var regions = {
            'br': 'br.api.pvp.net',
            'eune' : 'eune.api.pvp.net',
            'euw' : 'euw.api.pvp.net',
            'kr' : 'kr.api.pvp.net',
            'las' : 'las.api.pvp.net',
            'lan' : 'lan.api.pvp.net',
            'na' : 'na.api.pvp.net',
            'oce' : 'oce.api.pvp.net',
            'tr' : 'tr.api.pvp.net',
            'ru' : 'ru.api.pvp.net',
            'global' : 'global.api.pvp.net'
        };


        function getSummoner(name, selectedRegion) {

            var ApiKey = 'api_key=eb5cff4a-9a8a-4932-a8f8-429e6d9c7183';
            var ApiUrl = 'https://'+ api.regions[selectedRegion] + '/api/lol/'+ selectedRegion;
            console.log(selectedRegion); 

            return $http.get(ApiUrl + '/v1.4/summoner/by-name/' + name + '?' + ApiKey).success(function(data){
                
                api.summoner = data[name];

                $http.get(ApiUrl + '/v1.4/summoner/'+ api.summoner.id + '/masteries?' + ApiKey).success(function(data){
                    api.summoner.masteries = data[api.summoner.id].pages;
                });

                $http.get(ApiUrl + '/v1.4/summoner/'+ api.summoner.id + '/runes?' + ApiKey).success(function(data){
                    api.summoner.runes = data[api.summoner.id].pages;
                });

                $http.get(ApiUrl + '/v1.3/stats/by-summoner/'+ api.summoner.id +'/ranked?' + ApiKey).success(function(data){
                    api.summoner.rankedStats = data.champions;
                    angular.forEach(api.summoner.rankedStats, function(value, key){
                        if(value.id === 0) {
                            api.summoner.rankedStats.summary = api.summoner.rankedStats[key];
                            delete(api.summoner.rankedStats[key]);
                        }
                    });
                });

                $http.get(ApiUrl + '/v1.3/game/by-summoner/'+ api.summoner.id +'/recent?' + ApiKey).success(function(data){
                    api.summoner.recentGames = data.games;
                });

                $http.get(ApiUrl + '/v1.3/stats/by-summoner/'+ api.summoner.id +'/summary?season=SEASON4&'+ ApiKey).success(function(data){
                    api.summoner.summary = data.playerStatSummaries;
                });

                $http.get(ApiUrl + '/v2.4/league/by-summoner/'+ api.summoner.id+'/entry?' + ApiKey).success(function(data){
                    api.summoner.league = data[api.summoner.id];
                });

                $http.get(ApiUrl + '/v2.4/league/by-summoner/'+ api.summoner.id + '?' + ApiKey).success(function(data) {
                    api.summoner.leagueRanks = data[api.summoner.id];
                    console.log(data);
                });
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

        function getWinRate(stats) {
            var winRate;
            angular.forEach(api.summoner.rankedStats, function() {
               /* console.log(value, key);*/
                winRate = stats.totalSessionsWon /stats.totalSessionsPlayed * 100;
                winRate = Math.round(winRate *10)/10;    
            });

            return winRate;
        }


        var api = {
            summoner: null,
            getSummoner: getSummoner,
            getStatsByGame: getStatsByGame,
            getWinRate: getWinRate,
            regions : regions
        };

    return api;
});