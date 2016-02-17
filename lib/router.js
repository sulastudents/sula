Meteor.startup(function() {
 if(Meteor.isClient){
      return SEO.config({
        title: 'Sula Students Discount Services',
        meta: {
          'description': 'Discounts for students from fashion to dinners and eateries! The one stop shop for Tanzanian Student Discounts!'
        },
        og: {
          'image': 'http://sulastudents.org/resources/site%20logo.png' 
        }
      });
    }
});

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

// Router.route('/', {
// 	name: 'students'
// });
Router.onAfterAction(function() {
	SulaUtils.scrollToTop();
});

Router.route('/adminDash', {
	name: 'admin',
	layoutTemplate: 'adminLayout',
	waitOn: function () {
		var userId = Meteor.userId();

		return Meteor.subscribe("admin", userId);
	}
});

Router.route('signup', {
	name: 'signUp'
});

Router.route('/results', {
	name: 'results',
	data: function () {
		// var res = Discounts.find({ title: new RegExp(Session.get('search'), "i") }, { sort: { submitted: -1 } });
		return {
			offer: Discounts.find({ title: new RegExp(Session.get('search'), "i") }, { sort: { submitted: -1 } })
		};
	}
});

Router.route('/search/:q', {
	name: 'search',
	waitOn: function () {
		var query = this.params.q;
		return Meteor.subscribe('search', query);
	}
	// data: function () {
	// 	return Discounts.find();
	// }
});

Router.route('/', {
	name: 'students',
	waitOn: function () {

	}
});

Router.route('/playground/students', {
	name: 'pstudents'
});

// Router.route('/:')

Router.route('/Students/Entertainment', {
	name: 'entertainment',
	data: function () {
		return { offer: Discounts.find({category: "entertainment"}).fetch() };
	}
});

Router.route('/Students/Shopping', {
	name: 'shopping',
	data: function () {
		return { offer: Discounts.find({category: "shopping"}).fetch() };
	}
});

Router.route('/Students/Services', {
	name: 'services',
	data: function () {
		return { offer: Discounts.find({category: "services"}).fetch() };
	}
});

Router.route('/Students/FoodnDrinks', {
	name: 'foodNDrinks',
	data: function () {
		return { offer: Discounts.find({category: "foodNDrinks"}).fetch() };
	}
});

Router.route('/Students/Study', {
	name: 'study',
	data: function () {
		return { offer: Discounts.find({category: "study"}).fetch() };
	}
});

Router.route('/Students/Other', {
	name: 'other',
	data: function () {
		return { offer: Discounts.find({category: "other"}).fetch() };
	}
});

Router.route('/Vendors', {
	name: 'vendors'
});

Router.route('/Vendors/Discounts', {
	name: 'discounts'
});

Router.route('/Vendors/New_Discount', {
	name: 'newDiscount'
});

Router.route('/Vendor/edit_discount/:id', {
	name: 'editDiscount'
});

Router.route('/about', {
	name: 'about'
});

Router.route('/faq', {
	name: 'faq'
});

Router.route('/Privacy_Policy', {
	name: 'privacyPolicy'
});

Router.route('/Terms_of_Use', {
	name: 'termsOfUse'
});
