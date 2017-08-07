const { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'ChessPlayerInput',
    description: 'The chess game player',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});
