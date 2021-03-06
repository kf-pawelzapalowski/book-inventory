var MongoClient = require('mongodb').MongoClient;

function stockRepository() {
    var dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-inventory';
    var collectionName = process.env.BOOKS_COLLECTION_NAME || 'books';

    var collection = MongoClient
        .connect(dbUrl, { bufferMaxEntries: 0 })
        .then(function (db) {
            return db.collection(collectionName);
        })
        .catch(function (err) {
            console.error(err);
            process.exit(1);
        });

    function stockUp(book) {
        var bookEntry = {
            isbn: book.isbn,
            count: book.count
        };

        return collection
            .then(function (collection) {
                return collection.updateOne({ isbn: bookEntry.isbn }, bookEntry, { upsert: true });
            });
    }

    function findAll() {
        return collection
            .then(function (collection) {
                return collection.find({}).toArray();
            });
    }

    function findOne(isbn) {
        return collection
            .then(function (collection) {
                return collection.find({ isbn: isbn }).limit(1).next();
            });
    }

    return {
        stockUp: stockUp,
        findAll: findAll,
        findOne: findOne
    };
}

module.exports = stockRepository;