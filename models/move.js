const debug = require('debug')('bombastic-bot:move');

class Move {

    constructor(opts) {
        this.playerId = opts.playerId;
        this.tileId = opts.tileId;
        this.points = opts.points;
        this.type = opts.type;
    }

}

module.exports = Move;
