module.exports = function (app, stockRepository) {
    function logger(req, res, next) {
        console.log("incoming request at " + new Date());
        next();
    };

    app.get('/stock', function (req, res, next) {
        stockRepository
            .findAll()
            .then(function (books) {
                res.json(books);
            })
            .catch(next);
    });

    app.get('/stock/:isbn', logger, function (req, res, next) {
        stockRepository
            .findOne(req.params.isbn)
            .then(function (book) {
                if (book == null) {
                    next();  // we have generic not-found handler for all requests, so here we tell that we want to use it
                } else {
                    res.json({ count: book.count });
                }
            })
            .catch(next);
    });

    app.post('/stock', function (req, res, next) {
        stockRepository
            .stockUp(req.body)
            .then(function () {
                res.json({ isbn: req.body.isbn, count: req.body.count });
            })
            .catch(next);
    });
}