// call to increment the number of impressions and clicks on a thumb
// Meteor.call("recordImpression", Meteor.userId(), function (error, result) { if (error) {console.log(eror)} if (result) { console.log(result)} });
// Meteor.call("recordClick", Meteor.userId(), function (error, result) { if (error) {console.log(eror)} if (result) { console.log(result)} });

Template.thumb.rendered = function () {
	var that = this;
	setTimeout(function () {
		console.log(that.data.authorId);

		// record impression of offer
		Meteor.call("recordImpression", that.data.authorId, function (error, result) {
			if (error) {
				console.log(eror);

			} if (result) {
				mToast("impression");
				// console.log(result);
			}
		});

	},2000);
};


Template.thumb.events({
	'click .btn': function (e) {
		e.preventDefault();

		Session.set('selectedDeal', this);
		$('#myModal').modal('show');
	},
	'click .card': function (event) {
		event.preventDefault();

		// console.log(this)

		// register click of offer
		Meteor.call("recordClick", this.authorId, function (error, result) {
			if (error) {
				console.log(eror)
			} if (result) {
				mToast("click");
				// console.log(result)
			}
		});
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
