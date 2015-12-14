// instance > inside onCreated, rendered and destroyed, the current 'template instance' is available as the balue of 'this'.
// instance > inside helpers and event handlers, this actually points to the data context i.e. this === Template.instance().

Template.offer.onCreated(function () {
    // Session.set('category', 'deals');

    // initialize
    var instance = this;

    // initialize the reactive variable
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(10);
    // instance.category = Session.get('category');

    // autorun
    // re-run whenever the reactive variable "limit" changes
    instance.autorun(function () {
        // get the category
        var category = Session.get('category');
        // get the limit
        var limit = instance.limit.get();
        console.log("Asking for "+limit+" discounts..");
        // subscribe to the discounts publication
        var subscription = instance.subscribe('discounts', category, limit);

        // if subscription is ready, set limit to newLimit
        if (subscription.ready()) {
            console.log("> Received "+limit+" posts. \n\n");
            instance.loaded.set(limit);
        } else {
            console.log("> subscription is not ready yet. \n\n");
        }
    });

    instance.offers = function () {
        return Discounts.find({}, {limit: instance.loaded.get()});
    };

});


Template.offer.events({
    'click .load-more': function (event, instance) {
        event.preventDefault();

        // get the current value for limit, i.e. how many posts are currently displayed
        var limit = instance.limit.get();

        // increase limit by 5 and update it
        limit += 10;
        instance.limit.set(limit);
    }
});

Template.offer.helpers({
    // the discounts cursor
    offer: function () {
        return Template.instance().offers();
    },
    // are there any more offers to show
    hasMoreOffers: function () {
        return Template.instance().offers().count() >= Template.instance().limit.get();
    },

    isDEALS: function () {
        return Session.equals('category', 'deals');
    },
    noDiscounts: function () {
        return Template.instance().offers().count();
    },
    category: function () {
        var cat = Session.get('category');
        if (cat === 'entertainment') {
            return 'Entertainment';
        } else if (cat === 'foodNDrinks') {
            return 'Food and Drinks';
        } else if (cat === 'shopping') {
            return 'Shopping';
        } else if (cat === 'study') {
            return 'Study';
        } else if (cat === 'services') {
            return 'Services';
        }
    }
});
