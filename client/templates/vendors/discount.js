Template.discount.events({
	'click #delete': function () {
		if (confirm('Delete this posting?')) {
			Meteor.call('deleteOffer', this._id);
		}
	}
});