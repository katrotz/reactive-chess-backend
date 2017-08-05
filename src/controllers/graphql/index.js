const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');

const app = require('./../../index').app;
const graphqlService = require('./../../services/graphql');

const environment = app.get('environment');

const schema = graphqlService.schema;
const graphiql = (environment.name !== 'production');
const pretty = true;

require('./subscriptions');

router.use('/', graphqlHTTP({schema, graphiql, pretty}));

module.exports = router;
