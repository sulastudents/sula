// Template.layout.rendered = function(){
//     $('.modal-trigger').leanModal({
// 		dismissible: true, // Modal can be dismissed by clicking outside of the modal
// 		opacity: 0.5, // Opacity of modal background
// 		in_duration: 300, // Transition in duration
// 		out_duration: 200, // Transition out duration
// 		ready: function() { alert('Ready'); }, // Callback for Modal open
// 		complete: function() { alert('Closed'); } // Callback for Modal close
// 	});
// };

Template.layout.events({
    // "click .sign-in": function(event, template){
    //      event.preventDefault();
    //      document.getElementsByClassName('sign-in-form')[0].onsubmit = logIn(event, template);
    // }//,
    'submit .sign-in-form': function (e, t) {
		e.preventDefault();

		var businessName = t.find('#signInName').value;
		var password = t.find('#signInPassword').value;

		Meteor.loginWithPassword(businessName,password,function(error) {
			if(error) {
				alert('Wrong credentials');
			} else {
			    $('#logInModal').closeModal();
			}
		});
	},
    'click .go-to-register': function (e) {
		e.preventDefault();

		$('#logInModal').closeModal();
		return $('#register').openModal();
	},
    'submit .register-form': function (e, t) {
		e.preventDefault();

		// var errors = validateRegistration (t.find('#registerName').value, t.find('#registerPassword').value, t.find('#registerConfirmPassword').value, t.find('#registerNumber').value, t.find('#registerEmail').value, t.find('#registerLoaction').value, t.find('#registerDescription').value);
		// if(errors)
			// console.log('errors');
		if (t.find('#registerPassword').value !== t.find('#registerConfirmPassword').value) {
			alert('Passwords do not match');
		}

        console.log(t);

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
			} else {
			    $('#register').closeModal();
			}
		});
		Router.go('vendors');
	}
});

function logIn (e, t) {
    e.preventDefault();

    var businessName = t.find('#signInName').value;
    var password = t.find('#signInPassword').value;
    console.log(businessName);

    Meteor.loginWithPassword(businessName,password,function(error) {
        if(error) {
            // alert('Wrong credentials');
            return "error";
        }
        return "success";
    });
}

Meteor.startup(function(){
    Session.set('category', 'deals');
});
