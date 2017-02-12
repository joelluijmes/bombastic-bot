const _ = require('underscore');
// const debug = require('debug')('bombastic-bot:player');

class Player {

    constructor(opts) {
        this.id = opts.id;
        this.displayName = opts.displayname;
        this.points = opts.points;
        this.colorId = opts.colorId;
    }

    toString() {
        return ` ${this.displayName} (${this.id})\r\n` +
        ` points: ${this.points}\r\n` +
        ` color: ${this.colorId}\r\n`;
    }

}

module.exports = Player;
