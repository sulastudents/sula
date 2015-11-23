Template.vendorDiscounts.created = function () {
    var instance = this;

    var userId = Meteor.userId();

    var subscription = instance.subscribe('vendorDiscounts', userId);

    instance.discounts = function() {
        return Discounts.find({});
      }
}

Template.vendorDiscounts.helpers({
    discounts: function () {
        // console.log(this);
        mToast("discounts called!");
        return Template.instance().discounts();
    }
});

Template.dashboard.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#address").geocomplete();
    }
  });
});

Template.dashboard.helpers({

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
	},
    discounts: function () {
        return Discounts.find().fetch();
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

Template.accountCard.helpers({
    vendor: function () {
        var user = Meteor.user();

        return {
            username: user.username,
            email: user.emails[0].address,
            telephone: user.profile.number,
            location: (user.profile.location !== "") ? user.profile.location:false,
            website: (user.profile.website !== "") ? user.profile.website:false,
            description: user.profile.description
        }
    },
    editAccount: function () {
        return Session.get("editAccount") || false;
    }
});

Template.accountCard.events({
    "click #accountAddLocation": function (event) {
        event.preventDefault();
        $('#accountAddLocationContainer').html('<input href="" id="accountEditLocation" placeholder="Add Location"> &nbsp <a class="waves-effect waves-light btn" id="dashboardAddLocation">Add</a>');
        return;
    },
    "click #dashboardAddLocation": function (event) {
        event.preventDefault();

        var location = $('#accountEditLocation').val();

        if (Meteor.users.update({_id: Meteor.userId()}, {$set: { "profile.location" : location }})) {
            mToast("Success!");
            return;
        }
    },
    "click #accountAddWebsite": function (event) {
        event.preventDefault();
        $('#accountAddWebsiteContainer').html('<input href="" id="accountEditWebsite" placeholder="Add Website"> &nbsp <a class="waves-effect waves-light btn" id="dashboardAddWebsite">Add</a>');
        return;
    },
    "click #dashboardAddWebsite": function (event) {
        event.preventDefault();

        var website = $('#accountEditWebsite').val();

        if (Meteor.users.update({_id: Meteor.userId()}, {$set: { "profile.website" : website }})) {
            mToast("Success!");
            return;
        }
    },
    "click #editAccount": function (event) {
        event.preventDefault();

        Session.set("editAccount", true);

        mToast("Edit your Account.");
        return;
    },
    "click #cancelEditAccount": function (event) {
        event.preventDefault();
        Session.set("editAccount", false);
        mToast("Cancelled.");
        return;
    },
    "click #saveAccountChanges": function (event) {
        event.preventDefault();

        var edits = {
            email: $("#editAccountEmail").val(),
            telephone: $("#editAccountTelephone").val(),
            location: $("#editAccountLocation").val(),
            website: $("#editAccountWebsite").val(),
            description: $("#editAccountDescription").val()
        }

        Meteor.call("updateUserAccount", edits, function(error, result){
            if(error){
                mToast("Something went wrong! Try again.");
                return;
            }
            if(result){
                 mToast(result);
                 Session.set("editAccount", false);
                 return;
            }
        });

        console.log(edits);
    }
});


Template.offersTrafficCard.created = function () {
    var instance = this,
        vendorId = Meteor.userId();

    // instance.autorun(function () {
        var subscription = instance.subscribe("offersTrafficCard", vendorId);
    // });

    instance.traffic = function () {
        return Traffic.find({});
    }
};


Template.offersTrafficCard.rendered = function () {
    // Chart.defaults.global.responsive = true;

    var ownerId = Meteor.userId();

    Meteor.call("offersTrafficCardData", ownerId, function(error, result){
        if(error){
            console.log("error", error);
            mToast("Sorry, there has been an error rendering the chart.");
            return;
        }
        if(result){
            var data = {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: result.impressionsData
                        // data: [65, 59, 80, 81, 56, 55, 40, 60, 55, 80, 20, 83]
                    },
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: result.clicksData
                        // data: [28, 48, 40, 19, 86, 27, 90, 71, 50, 80, 46, 53]
                    }
                ]
            };

            // console.log(data);

            Chart.defaults.global.responsive = true;

            var ctx = document.getElementById("offersTrafficChart").getContext("2d");
            window.myLine = new Chart(ctx).Line(data, {});

             return;
        }
    });

}

Template.offersTrafficCard.helpers({

});


Template.addDiscount.events({
    'click #addDiscount': function (event) {
        event.preventDefault();

        Router.go('newDiscount');
        return;
    }
});
