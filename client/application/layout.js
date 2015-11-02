Template.layout.events({
    // "click .sign-in": function(event, template){
    //      event.preventDefault();
    //      document.getElementsByClassName('sign-in-form')[0].onsubmit = logIn(event, template);
    // }//,
    "change #registerAcceptTerms": function (event) {
        var checkbox = document.getElementById('registerAcceptTerms');
        var registerBtn = document.getElementById('registerBtn');
            if(checkbox.checked) {
                $('#registerBtn').removeClass('disabled');
            } else {
                registerBtn.classList ? registerBtn.classList.add('disabled') : registerBtn.className += ' disabled';
            }
    },
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
        var classes = $('#registerBtn')[0].classList;
        if (_.indexOf(classes, 'disabled') > 0) {
            toastr.error('Accept the Terms.');
            return;
        }


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
