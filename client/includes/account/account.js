function validateRegistration (bname, pword, cpword, num, email, loc, desc) {
	var errors = {};
	if(bname.length <= 4)
		alert('Please enter a valid Business name');

	if(pword.length < 6)
		alert('Please enter a stronger password');

	if(pword != cpword)
		alert('Passwords do not match!');

	if(num.length < 10)
		alert('please enter a valid contact number');

	if(email <= 15)
		alert('Please enter a valid email');

	if(desc.length <= 30)
		alert('please describe your business in full');

	return errors;
}

Template.sulaVendors.helpers({
	currentlyLoggedIn: function () {
		return Meteor.user().username;
	}
});

Accounts.onLogin(function () {
	$('.close').click();
	Router.go('vendors');
});





Template.sulaVendors.events({
	'click .sign-out': function (e) {
		e.preventDefault();

		Meteor.logout(function (error) {
			if(error) {
				alert('unable to log out!');
			}
		});
	} //,
	// 'click #navbarSignIn': function (evt) {
	// 	evt.preventDefault();
	// }

	// 'click #navbarDashboard': function (e) {
	// 	e.preventDefault();
	// 	// var userId = Meteor.user()._id;
	// 	// var currentUser = Meteor.user().username;
	// 	// console.log(currentUser);

	// 	Router.go('vendors');
	// }
});

Template.register.events({
	'submit .register-form': function (e, t) {
		e.preventDefault();

		// var errors = validateRegistration (t.find('#registerName').value, t.find('#registerPassword').value, t.find('#registerConfirmPassword').value, t.find('#registerNumber').value, t.find('#registerEmail').value, t.find('#registerLoaction').value, t.find('#registerDescription').value);
		// if(errors)
			// console.log('errors');
		if (t.find('#registerPassword').value !== t.find('#registerConfirmPassword').value) {
			alert('Passwords do not match');
		}

		Accounts.createUser({
			username: t.find('#registerName').value,
			password: t.find('#registerPassword').value,
			email: t.find('#registerEmail').value,
			profile: {
				logo: '',
				location: '',
				number: t.find('#registerNumber').value,
				website: '',
				description: t.find('#registerDescription').value
			}
		}, function (err) {
			if(err) {
				alert(err.message);
			}
		});
		Router.go('vendors');
	}
	// 'click .register': function () {
	// 	$('.register-form').submit();
	// }
});


Template.sulaVendors.events({
	'submit .sign-in-form': function (e, t) {
		e.preventDefault();

		var businessName = t.find('#signInName').value;
		var password = t.find('#signInPassword').value;

		Meteor.loginWithPassword(businessName,password,function(error) {
			if(error) {
				alert('Wrong credentials');
			}
		});
	},

	'click .go-to-register': function (e) {
		e.preventDefault();

		$('.close').click();
		return $('.register-modal').click();
	},
	'click #launchSignInModal': function (event) {
		event.preventDefault();

		$('#logInModal').openModal();
	},
	'click #launchRegisterModal': function (event) {
		event.preventDefault();

		$('#register').openModal();
	}
	// 'click .sign-in': function () {
	// 	$('.sign-in-form').submit();
	// }

});

Template.signOut.events({
	'click .sign-out': function (e, t) {
		e.preventDefault();

		Meteor.logout(function (error) {
			if(error) {
				alert('unable to log out!');
			}
		});
	}
});

Template.sulaVendors.rendered = function(e){
	$('.modal-trigger').leanModal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: 0.5, // Opacity of modal background
		in_duration: 300, // Transition in duration
		out_duration: 200 //, // Transition out duration
		// ready: function() { alert('Ready'); }, // Callback for Modal open
		// complete: function() { alert('Closed'); } // Callback for Modal close
	});
	$('.dropdown-button').dropdown({
	      inDuration: 300,
	      outDuration: 225,
	      constrain_width: false, // Changes the width of dropdown to the size of the li
	      hover: true, // Activate on hover
	      gutter: 0, // Spacing from edge
	      belowOrigin: true // Displays dropdown below the button
	    }
	  );
};
