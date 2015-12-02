Discounts = new Meteor.Collection('discounts');

Discounts.allow({
	update: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});
// traffic = {
// 	ownerId: "CFzNXoKnP6wZc69wP",
// 	traffic: {
// 		january: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		february: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		march: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		april: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		may: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		june: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		july: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		august: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		september: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		october: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		november: {
// 			clicks: 0,
// 			impressions: 0
// 		},
// 		december: {
// 			clicks: 0,
// 			impressions: 0
// 		}
// 	},
// 	created: new Date()
// }
