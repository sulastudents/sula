// Meteor.publish('discounts', function () {
// 		return Discounts.find();
// });

Meteor.publish('discounts', function (category, limit) {
	if (category === "deals") {
		return Discounts.find({}, {limit: limit});
	} else {
		return Discounts.find({category: category}, {limit: limit});
	}
});

// playground code
Meteor.publish('pdiscounts', function (category, limit) {
	if (category === "deals") {
		return Discounts.find({}, {limit: limit, fields: {image: 0}});
	} else {
		return Discounts.find({category: category}, {limit: limit, fields: {image: 0}});
	}
});

Meteor.publish('search', function (query) {
	return Discounts.find({title: new RegExp(query, "i") });
});

Meteor.publish('myDiscounts', function (userId) {
	return Discounts.find({authorId: userId});
});

Meteor.publish('editOffer', function (offerId) {
	return Discounts.find({_id: offerId});
});

Meteor.publish('admin', function (userId) {
	return [
		Discounts.find({}),
		Students.find({}),
		Meteor.users.find({})
	];
});
