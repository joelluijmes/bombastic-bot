/* Libs */
const config = require('./config');
const nano = require('nano')(config.dbUrl);
const debug = require('debug')('bombastic-bot:dbWatcher');
const Game = require('./models/game');
const _ = require('underscore');

/* Variables */
const db = nano.use(config.dbName);
const feed = db.follow({
    since: 'now',
    style: 'all_docs',
    include_docs: true
});


class DbWatcher {

    constructor(bot) {
        this.bot = bot;

        feed.filter = (doc, req) => {
            console.log('Filtering for query: ' + JSON.stringify(req.query));
            if(doc.type != 'game')
                return false;

            return _.findIndex(doc.players, (p) => p.id == bot.playerId) != -1;
        }

        feed.on('change', (change) => onChange(bot, change));
    }

    start() {
        feed.on('start', onStart);

        feed.follow();
    }


}

module.exports = DbWatcher;

function onStart() {
    console.info('Starting up db watcher.. Watching \'%s\'', config.dbName);
}

function onChange(bot, change) {
    debug('there is a change, %j', change);


    if (change.doc.type === 'game') {
        bot.consumeGame(new Game(change.doc));
    } else {
        console.error(`Unkown change ${change.doc.type}`);
    }

    //TODO handle it
    /* example change:
    {
        "seq": 319,
        "id": "user-joel-vs-user-marvin-BJTkY3ZKl",
        "changes": [{
            "rev": "2-0114baeeebb7c1ef37b7ba82bea610a1"
        }],
        "doc": {
            "_id": "user-joel-vs-user-marvin-BJTkY3ZKl",
            "_rev": "2-0114baeeebb7c1ef37b7ba82bea610a1",
            "type": "game",
            "diceroll": 1,
            "moves": [{
                "playerId": "user-marvin",
                "tileId": 22,
                "points": 13,
                "type": 0
            }],
            "players": [{
                "id": "user-joel",
                "displayname": "joel#2052",
                "points": 0,
                "colorId": -1,
                "roll": -1
            }, {
                "id": "user-marvin",
                "displayname": "God#4580",
                "points": 13,
                "colorId": 4,
                "roll": 1
            }],
            "turnPlayerId": "user-joel",
            "secret": "13-6-2-5Mg2Sju96LE6pZ7f",
            "betAmount": 100,
            "stake": 113,
            "state": 0,
            "bombs": 3,
            "creator": "user-marvin"
        }
    }
    */
}
