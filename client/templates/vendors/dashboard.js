Template.dashboard.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#address").geocomplete();
    }
  });
});

Template.dashboard.helpers({
	name: function () {
		return Meteor.user().username;
	},
	number: function () {
		return Meteor.user().profile.number;
	},
	email: function () {
		return Meteor.user().emails[0].address;
	},
	website: function () {
		return Meteor.user().profile.website;
	},
	address: function () {
		return Meteor.user().profile.location;
	},
	description: function () {
		return Meteor.user().profile.description;
	},
	discountCount: function () {
		var userId = Meteor.userId();
		return Discounts.find({authorId: userId}).count();
	},
	logo: function () {
		if(Meteor.user().profile.logo === "") {
			return "background-image: url('resources/sla.png');";
		} else {
			return "background-image: url('"+Meteor.user().profile.logo+"');";
		}
	}
});

Template.dashboard.events({
	'click #updateProfile': function (e) {
		e.preventDefault();

		var userInfo = {
			logo: Session.get('logo') || Meteor.user().profile.logo,
			username: document.getElementById('name').value,
			email: document.getElementById('email').value,
			number: document.getElementById('Number').value,
			website: document.getElementById('website').value,
			address: document.getElementById('address').value,
			description: document.getElementById('description').value,
		};

		// console.log(userInfo);
		var user = Meteor.user();

		Meteor.call('updateProfile', userInfo, function(error) {
			if(error) {
				console.log(error);
			}
		});

		// Meteor.users.update({_id: Meteor.userId()}, {$set: {
		// 	username: userInfo.username,
		// 	email: userInfo.email,
		// 	profile: {
		// 		logo: userInfo.logo,
		// 		website: userInfo.website,
		// 		location: userInfo.address,
		// 		number: userInfo.number,
		// 		description: userInfo.description
		// 	}
		// } });
	},
	'click .editLogo': function () {
		document.getElementById('logoInput').click();
	},
	'change #logoInput': function () {
		encodeImageFileAsURL = function (){

            var filesSelected = document.getElementById("logoInput").files;
            if (filesSelected.length > 0)
            {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    // var newImage = document.createElement('img');
                    // newImage.src = srcData;

                    // document.getElementById("imgTest").innerHTML = newImage.outerHTML;
                    // alert("Converted Base64 version is "+document.getElementById("imgTest").innerHTML);
                    // console.log(srcData);
                    $('#dashboardLogo').css('background-image', 'url('+srcData+')');
                    Session.set('logo', srcData);
                    return srcData;
                };
                fileReader.readAsDataURL(fileToLoad);

            }
        };
        encodeImageFileAsURL();
	}
});
