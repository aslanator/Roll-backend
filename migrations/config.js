const config = require('/config.json');

module.exports = {
    development : config.db.dev.url,
    test        : config.db.test.url,
    production  : config.db.dev.url
}