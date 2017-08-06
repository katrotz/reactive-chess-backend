const { GraphQLSchema, GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLEnumType, GraphQLList, GraphQLNonNull } = require('graphql');

const boards = [{turn: 'w', captured: {w: [], b: []}, fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}];

const getBoard = (gameId) => new Promise((resolve => resolve(boards[0])));

const ChessColorType = new GraphQLEnumType({
    name: 'ChessColor',
    description: 'The chess game piece color (white|black)',
    values: {
        w: { value: 'w', description: 'White color player' },
        b: { value: 'b', description: 'Black color player' }
    }
});

const ChessPieceType = new GraphQLEnumType({
    name: 'ChessPiece',
    description: 'The chess game piece type',
    values: {
        p: { value: 'p', description: 'Pawn piece type' },
        n: { value: 'n', description: 'Knight piece type' },
        b: { value: 'b', description: 'Bishop piece type' },
        r: { value: 'r', description: 'Rook piece type' },
        q: { value: 'q', description: 'Queen piece type' },
        k: { value: 'k', description: 'King piece type' }
    }
});

const BoardType = new GraphQLObjectType({
    name: 'Board',
    description: 'Describes the board state in the chess game',
    fields: () => ({
        turn: {
            type: new GraphQLNonNull(ChessColorType),
            description: 'The current player to make the move'
        },
        captured: {
            type: new GraphQLObjectType({
                name: 'CapturedType',
                fields: () => ({
                    w: { type: new GraphQLList(ChessPieceType) },
                    b: { type: new GraphQLList(ChessPieceType) },
                })
            }),
            description: 'Holds the captured pieces in the current game'
        },
        fen: {
            type: GraphQLString,
            description: 'The current chess game Forsyth–Edwards Notation'
        }
    })
});

const types = [ ChessColorType, ChessPieceType, BoardType ];

const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        board: {
            type: BoardType,
            description: 'The current game board state',
            args: {
                gameId: {
                    description: 'The game id',
                    type: GraphQLString
                }
            },
            resolve: (root, { gameId }) => getBoard(gameId)
        }
    })
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        updateBoard: {
            type: BoardType,
            args: {
                turn: {
                    type: GraphQLString
                },
                captured: {
                    type: new GraphQLInputObjectType({
                        name: 'CapturedInputType',
                        fields: () => ({
                            w: { type: new GraphQLList(ChessPieceType) },
                            b: { type: new GraphQLList(ChessPieceType) },
                        })
                    })
                }
            },
            resolve: (root, { turn, captured }) => {
                if (turn) boards[0].turn = turn;

                if (captured) boards[0].captured = captured;

                return boards[0];
            }
        }
    }
});

module.exports = {
    schema: new GraphQLSchema({query, mutation, types})
};
