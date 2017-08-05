const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

const app = require('./../../../index').app;
const server = require('./../../../index').server;
const graphqlService = require('./../../../services/graphql');

const schema = graphqlService.schema;
const path = (__dirname).replace(`${app.get('documentRoot')}/controllers`, '');

const subscriptionServer = new SubscriptionServer({ schema, execute, subscribe }, { server, path });

module.exports = subscriptionServer;
