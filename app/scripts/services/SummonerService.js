'use strict';


angular.module('lolApp')
    .service('SummonerService', function ($http, $q) {

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
            return $http.get(ApiUrl + '/v1.4/summoner/by-name/' + name + '?' + ApiKey).then(function(data){
                api.summoner = data.data[name];
                $q.all([
                    $http.get(ApiUrl + '/v1.4/summoner/'+ api.summoner.id + '/masteries?' + ApiKey),
                    $http.get(ApiUrl + '/v1.4/summoner/'+ api.summoner.id + '/runes?' + ApiKey),
                    $http.get(ApiUrl + '/v1.3/stats/by-summoner/'+ api.summoner.id +'/ranked?' + ApiKey),
                    $http.get(ApiUrl + '/v1.3/game/by-summoner/'+ api.summoner.id +'/recent?' + ApiKey),
                    $http.get(ApiUrl + '/v1.3/stats/by-summoner/'+ api.summoner.id +'/summary?season=SEASON4&'+ ApiKey),
                    $http.get(ApiUrl + '/v2.4/league/by-summoner/'+ api.summoner.id+'/entry?' + ApiKey),
                    $http.get(ApiUrl + '/v2.4/league/by-summoner/'+ api.summoner.id + '?' + ApiKey)
                ])
                .then(function(responses) {
                    api.summoner.masteries = responses[0].data[api.summoner.id].pages;
                    api.summoner.runes = responses[1].data[api.summoner.id].pages;
                    api.summoner.rankedStats = responses[2].data.champions;
                    api.summoner.recentGames = responses[3].data.games;
                    api.summoner.summary = responses[4].data.playerStatSummaries;
                    api.summoner.league = responses[5].data[api.summoner.id];
                    api.summoner.leagueRanks = responses[6].data[api.summoner.id];

                    // Maitrises traitements

                    var offense, defense, utilitary;
                    angular.forEach(api.summoner.masteries, function(masteryPage, key){
                        offense = 0;
                        defense = 0;
                        utilitary = 0;
                        angular.forEach(masteryPage.masteries, function(mastery) {

                            switch (mastery.id.toString().charAt(1)) {
                                case '1':
                                    offense += mastery.rank;
                                break;
                                case '2':
                                    defense += mastery.rank;
                                break;
                                case '3': 
                                    utilitary += mastery.rank;
                                break;
                            }
                        });
                        masteryPage.points = {
                            offense : offense,
                            defense : defense,
                            utilitary : utilitary
                        };
                        if(masteryPage.current) {
                            api.summoner.currentPage = key;
                        }
                    });

                    // Statistiques Parties classées traitements
                    var sortableChamps = [];
                    angular.forEach(api.summoner.rankedStats, function(value, key){
                        if(value.id === 0) {
                            api.summoner.rankedStats.summary = api.summoner.rankedStats[key];
                            delete(api.summoner.rankedStats[key]);
                        }
                        if(value.id !== 0) {
                            sortableChamps.push([value.id, value.stats.totalSessionsPlayed, value.stats.totalSessionsWon, value.stats.totalSessionsLost]);
                        }
                    });
                    sortableChamps.sort(function(a, b) {return b[1] - a[1]});
                    api.summoner.mostPlayedChamps = sortableChamps.slice(0,10);
                })
                return api.summoner;
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