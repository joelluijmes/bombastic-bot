const HOST = process.env.HOST || 'http://localhost'; // "http://92.109.3.160";
const PORT = process.env.PORT || 3000;

module.exports = Object.freeze({
    url: HOST + ':' + PORT,
    apiUrl: HOST + ':' + PORT + '/api/',
    username: process.env.USER_NAME || 'joel',
    password: process.env.PASS || '123qwe',

    // TODO: read from file
    DEFAULT_BET: process.env.DEFAULT_BET || 100,
    DEFAULT_COLORID: process.env.DEFAULT_COLORID || 1,
    DEFAULT_BOMBS: process.env.DEFAULT_BOMBS || 3
});
