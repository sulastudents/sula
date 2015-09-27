Template.vendors.events({
	'click #vendorSignIn': function (e) {
		e.preventDefault();

		// document.getElementById('navbarSignIn').click();
		$('#logInModal').openModal();
	},
	'click #vendorRegister': function (e) {
		e.preventDefault();

		$('#register').openModal();
	}
});
