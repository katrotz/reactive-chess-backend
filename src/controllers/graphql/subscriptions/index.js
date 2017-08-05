const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

const app = require('./../../../index').app;
const server = require('./../../../index').server;
const graphqlService = require('./../../../services/graphql');

const environment = app.get('environment');

const schema = graphqlService.schema;

const subscriptionServer = new SubscriptionServer({ schema, execute, subscribe }, { server, path: '/graphql/subscriptions' });

module.exports = subscriptionServer;
