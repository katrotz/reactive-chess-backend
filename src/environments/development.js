const _ = require('lodash');
const local = (() => {try {return require('./local');} catch (err) {return {}}})();

module.exports = _.merge({
    name: 'development',
    connections: {
        redis: {
            host: null,
            port: null
        }
    }
}, local);
