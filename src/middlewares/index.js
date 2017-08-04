const bootstrap = require('./bootstrap');
const compression = require('compression')({});
const routeNotFound = require('./route-not-found');

module.exports = {
    pre: [
        bootstrap,
        compression
    ],
    post: [
        routeNotFound
    ]
};
