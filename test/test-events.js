var test = require('./tape');
var mongojs = require('../index');

test('events', function(t) {
  var db = mongojs('test', ['a']).on('connect', function() {
    t.end();
  });

  db.a.find({}, function(err, items) {
    // Need to invoke a db op since we're connecting on first db op
  })
});
