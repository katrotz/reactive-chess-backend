const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const getGreeting = (name) => new Promise((resolve) => resolve(`Async greeting, ${name || 'world'}`));

const chessQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        greeting: {
            type: GraphQLString,
            description: 'Provides a parameterised greeting',
            args: {
                name: {
                    description: 'Used to construct the Hello ${name}. Defaults to "world".',
                    type: GraphQLString
                }
            },
            resolve: (root, { name }) => getGreeting(name),
        },
        staticName: {
            type: GraphQLString,
            description: 'Just a string',
            resolve: () => 'Just a string'
        }
    })
});

module.exports = {
    schema: new GraphQLSchema({
        query: chessQuery,
        types: []
    })
};
