<<<<<<< HEAD
const HOST = process.env.HOST || 'http://localhost'; // "http://92.109.3.160";
const PORT = process.env.PORT || 3000;
=======
const HOST = "http://lensert.com";
const PORT = 3000;
>>>>>>> 38ba087592b7ed80259ec7a4a983b20d9b7a2bd3

module.exports = Object.freeze({
    url: HOST + ':' + PORT,
    apiUrl: HOST + ':' + PORT + '/api/',
<<<<<<< HEAD
    username: process.env.USER_NAME || 'joel',
    password: process.env.PASS || '123qwe',

    // TODO: read from file
    DEFAULT_BET: process.env.DEFAULT_BET || 100,
    DEFAULT_COLORID: process.env.DEFAULT_COLORID || 1,
    DEFAULT_BOMBS: process.env.DEFAULT_BOMBS || 3
});
=======
    dbUrl: 'http://127.0.0.1:5984',
    dbName: 'test'
};
>>>>>>> 38ba087592b7ed80259ec7a4a983b20d9b7a2bd3
