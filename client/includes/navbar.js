Template.navbar.events({
	'click #sideNavLogo': function () {
		$('.button-collapse').sideNav('hide');
		Session.set('category', 'deals');
		Router.go('students');
	},
	'click .sideNavItem': function (e) {
		$('.button-collapse').sideNav('hide');
	},
	'click .deals': function () {
		Session.set('category', 'deals');
	},
	'click .entertainment': function () {
		Session.set('category', 'entertainment');
	},
	'click .shopping': function () {
		Session.set('category', 'shopping');
		Router.go('students');
	},
	'click .food-n-drinks': function () {
		Session.set('category', 'foodNDrinks');
	},
	'click .study': function () {
		Session.set('category', 'study');
	},
	'click .services': function () {
		Session.set('category', 'services');
	},
	// 'click #home': function () {
	// 	return Router.go('students');
	// },
	'click .brand-logo': function () {
		Session.set('category', 'deals');
		return Router.go('home');
	},
	'submit .search': function (e) {
		e.preventDefault();

		var toSearch = $(e.target).find('[name=search]').val();
		// var reg = toSearch;

		// Session.set('searched', 'one');
		Session.set('search', toSearch);
		$('body').click();
		Router.go('results');
	},
	'click #logoutMobile': function (event, template) {
		event.preventDefault();

		Meteor.logout(function(error){
			 if (error) {
			 	alert('Something went wrong! Try again later.');
				console.log(error);
				return;
			 }
		});
	}
});

Template.navbar.helpers({
	vendors: function () {
		if (!Meteor.user()) {
			return "Vendors";
		} else {
			return Meteor.user().username;
		}
	}
});

Template.navbar.rendered = function(){
	$(".button-collapse").sideNav();
};
