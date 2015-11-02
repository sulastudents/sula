Template.discount.events({
	'click #delete': function () {
		if (confirm('Delete this posting?')) {
			Meteor.call('deleteOffer', this._id);
		}
	},
	'click #edit': function (event, template) {
		event.preventDefault();

		Router.go('editDiscount', {id: this._id});
		return;
	}
});
