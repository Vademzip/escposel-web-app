const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull : false},
    email: {type: DataTypes.STRING, unique: true, allowNull : false},
    firstName: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING , allowNull : false},
    img: {type: DataTypes.STRING},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Tokens = sequelize.define('Tokens', {
    refreshToken: {type: DataTypes.STRING}
})



// Команды противников

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


// Игрок команды Escape Posel

const Player = sequelize.define('Player', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: DataTypes.STRING, },
    games: { type: DataTypes.INTEGER, defaultValue : 0},
    wins: { type: DataTypes.INTEGER, defaultValue : 0},
    loses: { type: DataTypes.INTEGER, defaultValue : 0},
    tournamentGames: { type: DataTypes.INTEGER, defaultValue : 0},
    tournamentWins: { type: DataTypes.INTEGER, defaultValue : 0},
    tournamentLoses: { type: DataTypes.INTEGER, defaultValue : 0},
})


// Лидеры и цивилизации

const Civilization = sequelize.define('Civilization', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
    },
    games: {type: DataTypes.INTEGER, defaultValue: 0},
    wins: {type: DataTypes.INTEGER, defaultValue: 0},
    loses: {type: DataTypes.INTEGER, defaultValue: 0},
});

// Турнир

const Tournament = sequelize.define('Tournament', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    link : {
        type : DataTypes.STRING,
        allowNull : true
    }
})



// Матч

const Game = sequelize.define('Game', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY
    },
    isWin: {
        type: DataTypes.BOOLEAN
    }
})




const OneGameInfo = sequelize.define('OneGameInfo', {
    game_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Games',
            key: 'id'
        }
    },
    player_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Players',
            key: 'id'
        }
    },
    civilization_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Civilizations',
            key: 'id'
        }
    }
});




const TeamTournamentStats = sequelize.define('TeamTournamentStats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    games: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    loses: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

const PlayerTournamentStats = sequelize.define('PlayerTournamentStats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    games: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    loses: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

const Map = sequelize.define('Map', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    icon: {
        type: DataTypes.STRING,
    },
    games: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    loses: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})



User.hasOne(Tokens)

OneGameInfo.belongsTo(Player, { foreignKey: 'player_id'});
OneGameInfo.belongsTo(Civilization, { foreignKey: 'civilization_id'});
OneGameInfo.belongsTo(Game, { foreignKey: 'game_id'});

Team.hasMany(Game)
Game.belongsTo(Team)

Tournament.hasMany(Game)
Game.belongsTo(Tournament)

Map.hasMany(Game)
Game.belongsTo(Map)


TeamTournamentStats.belongsTo(Team, { foreignKey: 'team_id' });
TeamTournamentStats.belongsTo(Tournament, { foreignKey: 'tournament_id' });

Team.belongsToMany(Tournament, { through: TeamTournamentStats, foreignKey: 'team_id' });
Tournament.belongsToMany(Team, { through: TeamTournamentStats, foreignKey: 'tournament_id' });

PlayerTournamentStats.belongsTo(Player, { foreignKey: 'player_id' });
PlayerTournamentStats.belongsTo(Tournament, { foreignKey: 'tournament_id' });

Player.belongsToMany(Tournament, { through: PlayerTournamentStats, foreignKey: 'player_id' });
Tournament.belongsToMany(Player, { through: PlayerTournamentStats, foreignKey: 'tournament_id' });

/*
Player.belongsToMany(Game, {through: OneGameInfo})
Civilization.belongsToMany(Player, {through: OneGameInfo})*/


module.exports = {
    User,
    Tokens,
    Team,
    Player,
    Civilization,
    OneGameInfo,
    Game,
    Tournament,
    TeamTournamentStats,
    PlayerTournamentStats,
    Map
}