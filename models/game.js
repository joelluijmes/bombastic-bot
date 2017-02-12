const _ = require('underscore');
const debug = require('debug')('bomb-bot:game');
const Move = require('./move');
const Player = require('./player');

class Game {

    constructor(opts) {
        this.id = opts._id;
        this.moves = _.map(opts.moves, m => new Move(m));
        this.players = _.map(opts.players, p => new Player(p));
        this.turnPlayer = _.findWhere(this.players, {
            id: opts.turnPlayerId
        });
        this.secret = opts.secret;
        this.betAmount = opts.betAmount;
        this.stake = opts.stake;
        this.bombs = opts.bombs;
        this.creator = opts.creator;
    }

    validateMove(tileId) {
        if (!tileId) { // random tile
            tileId = random(1, 26); // random between 1 and 25 (inclusive)
            for (let i = 0; i < 25; ++i) {
                let tile = (i + tileId) % 26 + 1;

                if (_.findIndex(this.moves, m => m.tileId == tile) == -1)
                    break;
            }
        }

        if (_.findIndex(this.moves, m => m.tileId === tileId) !== -1) {
            console.error('tile is already been played!');
            return null;
        }

        return tileId;
    }

    updateGame(gameResponse) {
        debug(this.moves.length);
        debug(gameResponse.moves.length);
        this.stake = gameResponse.stake;
        _.map(gameResponse.moves, m => this.moves.push(m));

        for(var i  = 0; i < gameResponse.players.length - 1; i++) {
            Object.assign(this.players[i], gameResponse.players[i]);
        }

        debug(this.moves.length);
    }

    toString() {
        let str = '';

        str += `${this.id}\r\n`;
        str += ` players\r\n`;
        _.each(this.players, p => str += `${p.toString()}\r\n`);

        str += ` stake: ${this.stake}\r\n`;
        str += ` bombs: ${this.bombs}\r\n`;
        str += ` creator: ${this.creator.id}\r\n`;
        str += ` turn: ${this.turnPlayer.id}\r\n`;

        return str;
    }

}

function random(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

module.exports = Game;
