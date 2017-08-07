module.exports = function routeNotFound(req, res, next) {
    next();
    // next(new Error(`Resource not found`));
};