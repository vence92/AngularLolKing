'use strict';


angular.module('lolApp')
.filter('formatGameType', function () {
    return function(value) {
        var gameType = {
            'Unranked' : 'Normal 5v5',
            'RankedSolo5x5' : 'Ranked 5v5',
            'Unranked3x3' : 'Normal 3v3',
            'RANKED_SOLO_5x5' : 'Solo 5v5',
            'RANKED_TEAM_3x3' : 'Team 3v3',
            'RANKED_TEAM_5x5' : 'Team 5v5'
        };
        return gameType[value];
    };
})

.filter('formatDivision', function(){
    return function(division) {
        var divisionTab = {
            'I' : 1,
            'II' : 2,
            'III' : 3,
            'IV' : 4,
            'V' : 5
        };
        return divisionTab[division];
    };
})

.filter('formatTypeMastery', function(){
    return function(type) {
        var typeTable = {
            0 : 'offense',
            1 : 'defense',
            2 : 'utilitary'
        };
        return typeTable[type];
    };
});