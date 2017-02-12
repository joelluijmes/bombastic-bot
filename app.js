var request = require('request');
var debug = require('debug')('bombastic-bot:app');
const config = require('./config');
var url = 'http://92.109.3.160:3000/api/';

const Bot = require('./bot');

let bot = new Bot('joel', '123qwe');
bot.login((err) => {
    if (err) {
        console.error(err);
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
});


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
