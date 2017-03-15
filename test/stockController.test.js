var assert = require('assert');

describe('Stock controller when called', function () {
    it('getCount(), stock repository findOne is called and returns result', function (done) {
        var req = { params: { isbn: '123456' } };
        var res = {
            format: function (result) {
                res.format.called = true;
            }
        };

        var stockRepository = {
            findOne: function (isbn) {
                assert.equal(isbn, req.params.isbn);
                stockRepository.findOne.called = true;
                return Promise.resolve({ isbn: isbn, count: 10 });
            }
        };

        var stockController = require('../src/stockController')(stockRepository);

        var next = function () { next.called = true; };

        stockController.getCount(req, res, next).then(function () {
            assert.ok(stockRepository.findOne.called, 'findOne() expected to be called');
            assert.ok(res.format.called, 'format() expected to be called');
            assert.notEqual(next.called, true, 'next() should not be called');

            done(); // REMEMBER when async testing
        });
    });

    it('getCount(), stock repository findOne is called and returns null', function (done) {
        var req = { params: { isbn: '123456' } };
        var res = {
            format: function (result) {
                res.format.called = true;
            }
        };

        var stockRepository = {
            findOne: function (isbn) {
                assert.equal(isbn, req.params.isbn);
                stockRepository.findOne.called = true;
                return Promise.resolve(null);
            }
        };

        var stockController = require('../src/stockController')(stockRepository);

        var next = function () { next.called = true; };

        stockController.getCount(req, res, next).then(function () {
            assert.ok(stockRepository.findOne.called, 'findOne() expected to be called');
            assert.notEqual(res.format.called, true, 'format() expected to be called');
            assert.ok(next.called, 'next() should not be called');

            done(); // REMEMBER when async testing
        });
    });

    it('getCount(), stock repository findOne is called but returns an error', function (done) {
        var req = { params: { isbn: '123456' } };
        var res = {
            format: function (result) {
                res.format.called = true;
            }
        };

        var stockRepository = {
            findOne: function (isbn) {
                assert.equal(isbn, req.params.isbn);
                stockRepository.findOne.called = true;
                return Promise.reject();
            }
        };

        var stockController = require('../src/stockController')(stockRepository);

        var next = function () { next.called = true; };

        stockController.getCount(req, res, next).then(function () {
            assert.ok(stockRepository.findOne.called, 'findOne() expected to be called');
            assert.notEqual(res.format.called, true, 'format() expected to be called');
            assert.ok(next.called, 'next() should not be called');

            done(); // REMEMBER when async testing
        });
    });
});