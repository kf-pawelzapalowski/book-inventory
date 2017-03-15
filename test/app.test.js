var request = require('supertest');
var stockRepository = require('../src/stockRepository.inMemory')();
var appFactory = require('../src/app');
var auth =
    function (req, res, next) {
        next();
    };

describe('App authentication', function (done) {
    it('fails', function () {
        var app = appFactory(stockRepository, function (req, res, next) {
            next();
        });

        request(app).get('/').expect(401, done);
    });
});

describe('Book inventory service', function () {
    it('should return isbn and count on /store request while ignoring other extra properties', function (done) {
        var app = appFactory(stockRepository, auth);
        var sent = {
            isbn: 'aaa',
            count: 10,
            prop2: null
        };

        var expected = {
            isbn: sent.isbn,
            count: sent.count
        };

        request(app)
            .post('/stock')
            .set('Accept', 'application/json')
            .send(sent)
            .expect('Content-Type', /json/)
            .expect(expected)
            .expect(200, done);
    });

    it('should return 404 when unknown url', function (done) {
        var app = appFactory(stockRepository, auth);
        request(app)
            .get('/unknown-url')
            .expect(404, done);
    });

    describe('when getting via isbn', function () {
        var isbn = 'some-new';
        var count = 10;
        stockRepository._items([{ isbn: isbn, count: count }]);

        it('should return null when no entry found', function () {
            var app = appFactory(stockRepository, auth);
            request(app)
                .get('/stock/unknown')
                .expect(404);
        });

        it('should return count when entry found', function () {
            var app = appFactory(stockRepository, auth);
            request(app)
                .get('/stock/isbn')
                .expect({ count: count });
        });
    });
});

