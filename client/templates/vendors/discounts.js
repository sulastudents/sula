Template.discounts.helpers({
	discountList: function () {
		var user = Meteor.userId()
		return Discounts.find({authorId: user}).fetch();
	}
});

Template.discounts.events({
	'click #userDash': function () {
		Router.go('vendors');
	}
});