const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = { hello: () => 'Hello world!' };

router.use('/', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}));

module.exports = router;
