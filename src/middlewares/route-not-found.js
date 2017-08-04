module.exports = function routeNotFound(req, res, next) {
    next(new Error(`Resource not found`));
};