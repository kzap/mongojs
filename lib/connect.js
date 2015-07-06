var once = require('once');

module.exports = function connect(server, config, cb) {
  cb = once(cb);

  if (config.auth) {
    server.addAuthProvider('mongocr', new MongoCR());
    server.on('connect', function(server) {
      server.auth('mongocr', config.dbName, config.auth.user, config.auth.password, function(err, r) {
        if (err) return cb(err);
        cb(null, r);
      });
    });
  } else {
    server.on('connect', function(server) {
      cb(null, server);
    });
  }

  server.on('error', function(err) {
    cb(err);
  });

  server.connect();
};