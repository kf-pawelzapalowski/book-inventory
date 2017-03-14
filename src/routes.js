module.exports = function (app, stockController) {
    function logger(req, res, next) {
        console.log("incoming request at " + new Date());
        next();
    }

    app.get('/stock', stockController.getAll);
    app.get('/stock/:isbn', logger, stockController.getCount);
    app.post('/stock', stockController.stockUp);
};