Template.thumb.events({
	'click .btn': function (e) {
		e.preventDefault();

		Session.set('selectedDeal', this);
		$('#myModal').modal('show');
	}
});

Template.thumb.helpers({
	'offerImageAlt': function () {
		console.log(generateSEOKeyword());
		return generateSEOKeyword();
	}
});

function generateSEOKeyword () {
	var keywords = [
		"University Students", "Student Deals", "Student Offers", "Student Discounts",
		"Sula Students", "Sula Card", "Do More", "Tanzania", "Entertainment", "offers",
		"discounts", "Tanzanian Students", "Students"];

	var index = Math.floor(Math.random() * 12);

	return keywords[index];
}
