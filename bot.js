const request = require('request');
const jwt = require('jsonwebtoken');
const debug = require('debug')('bomb-bot:bot');
const io = require('socket.io-client');
const config = require('./config');

class Bot {
    constructor(username, password) {
        this.username = username;
        this.password = password;

        this.api = request.defaults({baseUrl: config.apiUrl});

        this.socket = io('http://')
    }

    //authToken = xxx.(xxx).xxx -> base64 decode OFFFF je bent lui, en je zoekt json webtoken


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

            this.api = this.api.defaults({
                headers: {
                    'Authorization': httpResponse.headers.authorization
                }
            });

            debug(body);

            if (callback)
                callback();
        });
    }

    games() {
        this.api.get('games', (err, httpResponse, body) => {
            console.log(body);
        });
    }
}

module.exports = Bot;
