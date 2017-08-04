const logger = require('winston');
const argv = require('minimist')(process.argv.slice(2));
const ReactiveChessBackend = require('./src');

const port = argv.port || 8080;
const isProduction = (process.env.NODE_ENV === 'production');

logger.cli();

ReactiveChessBackend
    .setPort(port)
    .setEnvironment(isProduction)
    .run();
