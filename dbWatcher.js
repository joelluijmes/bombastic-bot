/* Libs */
const config = require('./config');
const nano = require('nano')(config.dbUrl);
const debug = require('debug')('bomb-bot:dbWatcher');

/* Variables */
const db = nano.use(config.dbName);
const feed = db.follow({
    since: 'now',
    style: 'all_docs',
    include_docs: true
});

feed.on('start', () => debug('Starting up db watcher.. Watching \'%s\'', config.dbName));
/* Change handler */
feed.on('change', (change) => {
  debug('there is a change, %j', change);
  //TODO handle it
  /* example change:
  {
  	"seq": 319,
  	"id": "user-joel-vs-user-marvin-BJTkY3ZKl",
  	"changes": [{
  		"rev": "2-0114baeeebb7c1ef37b7ba82bea610a1"
  	}],
  	"doc": {
  		"_id": "user-joel-vs-user-marvin-BJTkY3ZKl",
  		"_rev": "2-0114baeeebb7c1ef37b7ba82bea610a1",
  		"type": "game",
  		"diceroll": 1,
  		"moves": [{
  			"playerId": "user-marvin",
  			"tileId": 22,
  			"points": 13,
  			"type": 0
  		}],
  		"players": [{
  			"id": "user-joel",
  			"displayname": "joel#2052",
  			"points": 0,
  			"colorId": -1,
  			"roll": -1
  		}, {
  			"id": "user-marvin",
  			"displayname": "God#4580",
  			"points": 13,
  			"colorId": 4,
  			"roll": 1
  		}],
  		"turnPlayerId": "user-joel",
  		"secret": "13-6-2-5Mg2Sju96LE6pZ7f",
  		"betAmount": 100,
  		"stake": 113,
  		"state": 0,
  		"bombs": 3,
  		"creator": "user-marvin"
  	}
  }
  */
});


/* Update handler */
function updateHandler(change) {
  debug('There is an update in the db. %j', change);
}
/* Created handler */
function createHandler(change) {
  debug('There is a new object in the db. %j', change);
}
/* Follow it! */
feed.follow()
