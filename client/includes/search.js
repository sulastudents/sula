Template.search.helpers({
    offer: function () {
        return Discounts.find().fetch();
    }
});
