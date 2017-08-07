const { GraphQLInputObjectType, GraphQLList } = require('graphql');

const ChessPieceType = require('./chess-piece-type');

module.exports = new GraphQLInputObjectType({
    name: 'ChessCemeteryInput',
    fields: () => ({
        w: { type: new GraphQLList(ChessPieceType) },
        b: { type: new GraphQLList(ChessPieceType) },
    })
});
