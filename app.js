var request = require('request');
var debug = require('debug')('bomb-bot:app');
const config = require('./config');
var url = 'http://92.109.3.160:3000/api/';

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
