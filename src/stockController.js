module.exports = function (stockRepository) {
    function getAll(req, res, next) {
        stockRepository
            .findAll()
            .then(function (books) {
                res.json(books);
            })
            .catch(next);
    };

    function getCount(req, res, next) {
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
    };

    function stockUp(req, res, next) {
        stockRepository
            .stockUp(req.body)
            .then(function () {
                res.json({ isbn: req.body.isbn, count: req.body.count });
            })
            .catch(next);
    };

    return {
        stockUp: stockUp,
        getAll: getAll,
        getCount: getCount
    };
}