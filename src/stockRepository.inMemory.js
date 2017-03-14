module.exports = function () {
    var items = [];

    return {
        _items: function (state) {
            items = state;
        },
        stockUp: function (isbn, count) {
            var updated = false;
            items.forEach(function (item) {
                if (item.isbn === isbn) {
                    item.count = count;
                    updated = true;
                }
            });
            if (!updated) {
                items.push({ "isbn": isbn, "count": count });
            }
            return Promise.resolve();
        },
        findAll: function () {
            return Promise.resolve(items);
        },
        findOne: function (isbn) {
            var foundItem = null;
            foundItem = items.find(function (item) { return item.isbn == isbn; });
            return Promise.resolve(foundItem);
        }
    };
};