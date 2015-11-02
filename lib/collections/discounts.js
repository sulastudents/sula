Discounts = new Meteor.Collection('discounts');

Discounts.allow({
	update: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});
