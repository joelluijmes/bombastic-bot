var request = require('request');
var debug = require('debug')('bomb-bot:app');
const config = require('./config');
const dbWatcher = require('./dbWatcher');

const Bot = require('./bot');

let bot = new Bot('joel', '123qwe');
bot.login((err) => {
    if (err) {
        debug(err);
        return;
    }

    debug('DisplayName: ' + bot.displayName);

    bot.games();
});
