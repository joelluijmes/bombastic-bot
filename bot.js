const _ = require('underscore');
const request = require('request');
const jwt = require('jsonwebtoken');
const debug = require('debug')('bombastic-bot:bot');
const io = require('socket.io-client');

const config = require('./config');
const Move = require('./models/move');
const Game = require('./models/game');

class Bot {
    constructor(username, password) {
        this.username = username;
        this.password = password;

        this.api = request.defaults({
            baseUrl: config.apiUrl
        });

        this.socket = io('http://')
    }

    register(displayname, callback) {
        this.api.post('register', {
            form: {
                username: this.username,
                password: this.password,
                displayname: displayname
            },
            json: true
        }, (err, res, body) => {
            callback(err, body);
        });
    }

    login(callback) {
        this.api.post('login', {
            form: {
                username: this.username,
                password: this.password
            },
            json: true
        }, (err, res, body) => {
            if (err || (body && body.result === ':('))
                return callback(err || body.message);

            this.token = jwt.decode(res.headers.authorization.substring("Bearer ".length));
            this.displayName = this.token.displayName;
            this.playerId = this.token.userId;

            this.api = this.api.defaults({
                headers: {
                    'Authorization': res.headers.authorization
                }
            });

            if (callback)
                callback();
        });
    }

    fetchGames(callback) {
        this.api.get('games', (err, res, body) => {
            const json = JSON.parse(body);
            this.games = _.map(json.games, g => new Game(g));

            callback(null, this.games);
        });
    }

    createGame(opts, callback) {
        this.api.post('game/create', {
            form: {
                bet: opts.bet || config.DEFAULT_BET,
                opponent: opts.opponent,
                colorId: opts.colorId || config.DEFAULT_COLORID, // TODO: random
                bombs: opts.bombs || config.DEFAULT_BOMBS
            },
            json: true
        }, (err, res, body) => {
            callback(err, new Game(body));
        })
    }

    checkGames() {
        debug('checking games..');
        let games = _.filter(this.games, this.isOurTurn);

        // only want one for debugging
        games = _.initial(games, games.length - 1);

        if (_.isEmpty(games)) {
            console.info('no games to be played atm.');
            return;
        }

        console.info('playing %d games', games.length);
        _.each(games, game => {
            console.info(game.toString());

            this.makeRandomMove(game, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }

                if (res.result === ':(') {
                    console.error(res.message);
                    return;
                }

                game.updateGame(res);
            });
        });

    }

    makeRandomMove(game, callback) {
        let tile = game.validateMove();

        debug('id ' + game.id);

        this.api.post('game/move/', {
            form: {
                tileId: tile,
                gameId: game.id
            }
        }, (err, res, body) => {
            callback(err, JSON.parse(body));
        });
    }

    isOurTurn(game) {
        return game.turnPlayer.id === Bot.playerId;
    }

    toString() {
        if (typeof(this.games) === 'undefined')
            return 'No games to play';

        return `${this.games.length} games (${_.filter(this.games, isOurTurn)} our turn)`;
    }
}

module.exports = Bot;
