const request = require('request');
const debug = require('debug')('bombastic-bot:app');
const config = require('./config');

const DbWatcher = require('./dbWatcher');
const Bot = require('./bot');

const bot = new Bot(config.username, config.password);
bot.login(loginCallback);

function loginCallback(err) {
    if (err) {
        if (err === 'Unkown username') {
            bot.register(bot.username, (err, res) => {
                console.log(res);
                if (err) {
                    console.error(err);
                    return
                }

                console.info('registered a new account.');
                bot.login(loginCallback);
            });
        } else {
            console.error(err);
        }

        return;
    }

    console.info('logged in as (%s)', bot.displayName);
    // TODO: add with user status, if server gives us taht..
    // console.info(bot.toString());

    bot.fetchGames();
    const dbWatcher = new DbWatcher(bot);
    dbWatcher.start();

    return;

    let game = {
        opponent: 'joel2-bot#8075'
    };
    bot.createGame(game, (err, game) => {
        console.info(game.toString());
    });

    return;

    bot.fetchGames((err, games) => {
        if (err) {
            console.error(err);
            return;
        }

        //console.log(bot.toString());
        //console.log();

        bot.checkGames();
    });
}
