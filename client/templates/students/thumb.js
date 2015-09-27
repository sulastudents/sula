Template.thumb.events({
	'click .btn': function (e) {
		e.preventDefault();

		Session.set('selectedDeal', this);
		$('#myModal').modal('show');
	}
});