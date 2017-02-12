const _ = require('underscore');
const debug = require('debug')('bomb-bot:game');
const Move = require('./move');
const Player = require('./player');

class Game {

    constructor(opts) {
        this.moves = _.map(opts.moves, m => new Move(m));
        this.players = _.map(opts.players, p => new Player(p));
        this.playerTurn = _.findWhere(this.players, { id: opts.turnPlayerId })
        this.secret = opts.secret;
        this.betAmount = opts.betAmount;
        this.stake = opts.stake;
        this.bombs = opts.bombs;
        this.creator = opts.creator;

        debug(this.playerTurn);
    }

}

module.exports = Game;
