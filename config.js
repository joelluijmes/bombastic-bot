const HOST = process.env.HOST || 'http://localhost'; // "http://92.109.3.160";
const PORT = process.env.PORT || 3000;

module.exports = {
    url: HOST + ':' + PORT,
    apiUrl: HOST + ':' + PORT + '/api/'
};
