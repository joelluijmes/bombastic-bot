const _ = require('underscore');
// const debug = require('debug')('bomb-bot:player');

class Player {

    constructor(opts) {
        this.id = opts.id;
        this.displayname = opts.displayname;
        this.points = opts.points;
        this.colorId = opts.colorId;
    }

}

module.exports = Player;
