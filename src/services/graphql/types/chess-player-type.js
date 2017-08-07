const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'ChessPlayer',
    description: 'The chess game player',
    fields: () => ({
        name: {
            type: GraphQLString
        }
    })
});
