Template.discounts.onCreated(function () {
	var instance = this,
		userId = Meteor.userId();

	var subscription = instance.subscribe('myDiscounts', userId);

	instance.myOffers = function () {
        return Discounts.find({});
    };
});

Template.discounts.helpers({
	discountList: function () {
		return Template.instance().myOffers();
	}
});

Template.discounts.events({
	'click #userDash': function () {
		Router.go('vendors');
	}
});
