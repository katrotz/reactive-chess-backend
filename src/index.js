const logger = require('winston');
const express = require('express');

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const ENVIRONMENTS = {
    PROD: 'production',
    DEV: 'development'
};

let app;
let server;

let cfgPort = 8080;
let cfgEnvironment = ENVIRONMENTS.DEV;

module.exports = class ReactiveChessBackend {
    static setPort(port) {
        cfgPort = Number(port);
        return ReactiveChessBackend;
    }

    static setEnvironment(isProduction) {
        cfgEnvironment = Boolean(isProduction) ? ENVIRONMENTS.PROD : ENVIRONMENTS.DEV;
        return ReactiveChessBackend;
    }

    static run() {
        if (app) return app;

        app = express();

        app.set('documentRoot', __dirname);
        app.set('environment', require(`./environments/${cfgEnvironment}`));

        middlewares.pre.map(middleware => app.use(middleware));

        app.use('/', controllers);

        middlewares.post.map(middleware => app.use(middleware));

        server = app.listen(cfgPort, () => logger.info(`Server is running on port ${cfgPort}`));

        process.on('SIGINT', () => {
            process.exit();
        });

        process.on('exit', () => {
            server.close();
            logger.info(`Server running on port ${cfgPort} stopped`);
        });

        process.on('uncaughtException', (err) => {
            logger.error(err.message);
        });

        return app;
    }
};