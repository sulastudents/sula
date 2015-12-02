Template.footer.helpers({
    copyrightYear: function () {
        return new Date().getFullYear();
    }
});

Template.footer.events({
    'click #services': function () {
        Router.go('/adminDash');
        return;
    },
    'submit #search-sula': function (e) {
		e.preventDefault();

		var toSearch = $(e.target).find('[name=search]').val();
		// var reg = toSearch;

		// Session.set('searched', 'one');
		Session.set('search', toSearch);
		$('body').click();
		Router.go('results');
	},
    'click .zmdi-facebook': function () {
        // window.location = "https://www.facebook.com/SulaStudents/";
        // return;
    },
    'click #footer-logo': function () {
        Session.set('category', 'deals');
        Router.go('students');
        return;
    }
});
