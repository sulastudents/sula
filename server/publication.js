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

Meteor.publish('search', function (query) {
	return Discounts.find({title: new RegExp(query, "i") });
});

Meteor.publish('myDiscounts', function (userId) {
	return Discounts.find({authorId: userId});
});
