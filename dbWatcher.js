/* Libs */
const config = require('./config');
const nano = require('nano')(config.dbUrl);


/* Variables */
const db = nano.use(config.dbName);
var feed = db.follow({
    since: 'now',
    style: 'all_docs'
});

/* Change handler */
feed.on('change', (change) => {

});

/* Follow it! */
feed.follow()
