Discounts = new Meteor.Collection('discounts');

Discounts.allow({
	update: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});

Meteor.methods({
	offerInsert: function(post) {
		check(post, {
			image: String,
			title: String,
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
			photo: String
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
	}
});
