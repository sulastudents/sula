Meteor.methods({
	offerInsert: function(post) {
		check(post, {
			image: String,
			// title: String,
			discount: String,
			location: String,
			category: String,
			description: String
		});

		var user = Meteor.user();
		var postDetails = _.extend(post, {
			authorId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var postId = Discounts.insert(postDetails);

		return {
			_id: postId
		};
	},

	offerUpdate: function (offerDetails) {
		check(offerDetails, {
			image: String,
			// title: String,
			discount: String,
			location: String,
			category: String,
			description: String
		});

		var userId = Meteor.userId();

		Discounts.update({authorId: userId},
			{
				$set: {
					image: offerDetails.image,
					title: offerDetails.title,
					discount: offerDetails.discount,
					location: offerDetails.location,
					category: offerDetails.category,
					description: offerDetails.description
				},
			}
		);
	},

	updateProfile: function(userInfo) {
		check(userInfo, {
			username: String,
			email: String,
			logo: String,
			number: String,
			website: String,
			address: String,
			description: String
		});

		Meteor.users.update({_id: Meteor.userId()}, {$set: {
			username: userInfo.username,
			email: userInfo.email,
			profile: {
				logo: userInfo.logo,
				website: userInfo.website,
				location: userInfo.address,
				number: userInfo.number,
				description: userInfo.description
			}
		} });
	},

	deleteOffer: function (postId) {
		check(postId, String);

		var toDelete = Discounts.findOne(postId);

		if (toDelete == null) {
			alert('no posting found');
		}

		// Posts.delete(toDelete.path);
		Discounts.remove({ _id: postId });
	},

	insertStudent: function (studentAttributes) {
		check(studentAttributes, {
			name: String,
			dob: String,
			email: String,
			phnNumber: String,
			school: String,
			studentNumber: String,
			gradDate: String,
			gender: String,
			delivery: String,
			payment: String
		});

		// let result = "";

		var studentNumberExists = Students.findOne({studentNumber: studentAttributes.studentNumber});

		if (studentNumberExists) {
			var result = "The Student Number Already Exists!";
			return;
		}

		var student = _.extend(studentAttributes, {
			submitted: new Date()
		});

		var studentId = Students.insert(student);

		// result = studentId;

		return {
			id: studentId
		};
	},
	adminSetPassword: function (userId,newPassword) {
		check(userId, String);
		check(newPassword, String);

		console.log(userId, newPassword);

		Accounts.setPassword(userId, newPassword, function (error) {
			if (error) {
				console.log(error);
				return error;
			}
			return "success!";
		});
	},
	deleteVendor: function (vendorId) {
		check(vendorId, String);

		var result = Meteor.users.remove(vendorId);

		return result;
	},
	resetAdmin: function () {
		// db.houston_admins.find().pretty();
		var result = Houston_admins.remove({});
		return result;
	},
	updateUserAccount: function (edits) {
		if(Meteor.isServer){
			if (Meteor.users.update({_id: Meteor.userId()}, {$set: { "profile.website": edits.website, "profile.location": edits.location, "profile.number": edits.telephone, "profile.description": edits.description, "emails.0.address": edits.email}})) {
	            return "Success!";
	        }
		}
	},
	offersTrafficCardData: function (vendorId) {
		if(Meteor.isServer){
			var vendorTraffic = Traffic.findOne({ownerId: vendorId}).traffic;

			var impressionsData = [],
			clicksData = [];

			function getDatasetData (vendorTraffic) {

				var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];


				for (var i = 0; i < months.length; i++) {
					var key = months[i];
					if (vendorTraffic.hasOwnProperty(key)) {
						impressionsData.push(vendorTraffic[key].impressions);
						clicksData.push(vendorTraffic[key].clicks);
					}
				}

			};

			getDatasetData(vendorTraffic);


			return {
				// result: {
					impressionsData: impressionsData,
					clicksData: clicksData
				// }
			};
		}
	},
	recordImpression: function (vendorId) {
		// {$set: {'name.first': "Alice"}, $inc: {score: 1}}
		var trafficId = "";

		switch (SulaUtils.currentMonth()) {
			case "January":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.january.impressions": 1
				}
			}});
			break;

			case "February":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.february.impressions": 1
				}
			}});
			break;
			case "March":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.march.impressions": 1
				}
			}});
			break;
			case "April":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.april.impressions": 1
				}
			}});
			break;
			case "May":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.may.impressions": 1
				}
			}});
			break;
			case "June":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.june.impressions": 1
				}
			}});
			break;
			case "July":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.july.impressions": 1
				}
			}});
			break;
			case "August":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.august.impressions": 1
				}
			}});
			break;
			case "September":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.september.impressions": 1
				}
			}});
			break;
			case "October":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.october.impressions": 1
				}
			}});
			break;
			case "November":
			trafficId = Traffic.update({ownerId: vendorId}, {
				$inc: {
					"traffic.november.impressions": 1
				}
			});
			break;
			case "December":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.december.impressions": 1
				}
			}});
			break;

		}

		return {
			result: trafficId
		}

	},
	recordClick: function (vendorId) {
		// {$set: {'name.first': "Alice"}, $inc: {score: 1}}
		var trafficId = "";

		switch (SulaUtils.currentMonth()) {
			case "January":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.january.clicks": 1
				}
			}});
			break;

			case "February":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.february.clicks": 1
				}
			}});
			break;
			case "March":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.march.clicks": 1
				}
			}});
			break;
			case "April":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.april.clicks": 1
				}
			}});
			break;
			case "May":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.may.clicks": 1
				}
			}});
			break;
			case "June":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.june.clicks": 1
				}
			}});
			break;
			case "July":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.july.clicks": 1
				}
			}});
			break;
			case "August":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.august.clicks": 1
				}
			}});
			break;
			case "September":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.september.clicks": 1
				}
			}});
			break;
			case "October":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.october.clicks": 1
				}
			}});
			break;
			case "November":
			trafficId = Traffic.update({ownerId: vendorId}, {
				$inc: {
					"traffic.november.clicks": 1
				}
			});
			break;
			case "December":
			trafficId = Traffic.update({ownerId: vendorId}, {$set:{
				$inc: {
					"traffic.december.clicks": 1
				}
			}});
			break;

		}

		return {
			result: trafficId
		}

	}
});
