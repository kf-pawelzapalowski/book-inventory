var request = require('supertest');
var app = require('../app');

describe('Book inventory service', function () {
    it('should return isbn and count on /store request while ignoting other extra properties', function (done) {
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
        request(app)
            .get('/unknown-url')
            .expect(404, done);
    })
});