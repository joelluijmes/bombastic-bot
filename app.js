const request = require('request');
const debug = require('debug')('bombastic-bot:app');
const config = require('./config');

const Bot = require('./bot');

const bot = new Bot(config.username, config.password);
bot.login(loginCallback);

function loginCallback(err) {
    if (err) {
        console.error(err);
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

    console.info('logged in (%s)', bot.displayName);

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


// request.post(url + 'login', {
//     form: {
//         username: 'joel',
//         password: '123qwe'
//     }
// }, function(err, httpResponse, body) {
//   debug(body);
//   var token = httpResponse.headers.authorization;
//   debug(token);
// });
