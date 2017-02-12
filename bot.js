const _ = require('underscore');
const request = require('request');
const jwt = require('jsonwebtoken');
const debug = require('debug')('bomb-bot:bot');
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

    createAccount(displayname) {
        this.api.post('register', {
            form: {
                username: this.username,
                password: this.password,
                displayname: displayname
            }
        }, (err, httpResponse, body) => {
            debug(body);
        });
    }

    login(callback) {
        this.api.post('login', {
            form: {
                username: this.username,
                password: this.password
            }
        }, (err, httpResponse, body) => {
            if (err) {
                callback(err);
                return;
            }

            this.token = jwt.decode(httpResponse.headers.authorization.substring("Bearer ".length));
            this.displayName = this.token.displayName;
            this.playerId = this.token.userId;

            this.api = this.api.defaults({
                headers: {
                    'Authorization': httpResponse.headers.authorization
                }
            });

            if (callback)
                callback();
        });
    }

    games() {
        this.api.get('games', (err, httpResponse, body) => {
            const json = JSON.parse(body);
            this.games = _.map(json.games, g => new Game(g));

            debug(this.games.length + ' games');

            _.each(json.games, g => debug(' ' + g._id));

            if (this.isOurTurn(this.games[0])) {


                this.makeRandomMove(this.games[0], (err, res) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    debug(res);

                    this.games[0].updateGame(res);
                });
            } else debug('not our turn');
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
        }, (err, httpResponse, body) => {
            callback(err, JSON.parse(body));
        });
    }

    isOurTurn(game) {
        return game.turnPlayer.id === this.playerId;
    }
}

module.exports = Bot;
