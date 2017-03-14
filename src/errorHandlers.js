module.exports = function (app) {
    var notFoundHandler = function () {
        var err = new Error("Not Found!");
        err.status = 404;
        return err;
    };

    // for all unhandled routes use this handler
    app.use(function (req, res, next) {
        next(notFoundHandler());
    });

    var errorHandler = function (err, req, res, next) {
        console.error(err);
        err.status = err.status || 500;
        res.status(err.status).send('Error: ' + err.status);
        next();
    };

    // for other use global error handler
    app.use(errorHandler);
};