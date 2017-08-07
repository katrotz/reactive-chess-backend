const { GraphQLObjectType, GraphQLList } = require('graphql');

const ChessPieceType = require('./chess-piece-type');

module.exports = new GraphQLObjectType({
    name: 'ChessCemetery',
    fields: () => ({
        w: { type: new GraphQLList(ChessPieceType) },
        b: { type: new GraphQLList(ChessPieceType) },
    })
});
