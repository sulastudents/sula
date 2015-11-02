Template.editDiscount.onCreated(function () {
    var instance = this;

    var offerId = Router.current().params.id;
    var subscription = instance.subscribe('editOffer', offerId);

    instance.offer = function () {
        return Discounts.findOne();
    };
});

Template.editDiscount.onRendered(function() {
	this.autorun(function () {
		if (GoogleMaps.loaded()) {
			$("#location").geocomplete();
		}
	});

	$(document).ready(function() {
		$('select').material_select();
	});

});

Template.editDiscount.helpers({
    offer: function () {
        return Template.instance().offer();
    }
});

Template.editDiscount.events({
	'submit #editOffer': function (e) {
		e.preventDefault();

		var offerDetails = {
			image: $('#preview').attr('src'),
			// title: $(e.target).find('[name=title]').val(),
			discount: $(e.target).find('[name=discount]').val(),
			location: $(e.target).find('[name=location]').val(),
			category: $(e.target).find('[name=category]').val(),
			description: $(e.target).find('[name=description]').val()
		};

		Meteor.call('offerUpdate', offerDetails, function (error, result) {
			// display error to user and abort
			if (error) {
				return toastr.error("error");
			}
			//show this result but route anyway
			// if (result.postExists) {
			// 	throwError()
			// }
			Router.go('discounts');
		});

	},
	'click #preview': function () {
		document.getElementById('fileInput').click();
	},
	'change #fileInput': function () {
		encodeImageFileAsURL = function (){

            var filesSelected = document.getElementById("fileInput").files;
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
                    $('#preview').attr('src', srcData);
                    return srcData;
                };
                fileReader.readAsDataURL(fileToLoad);

            }
        };
        encodeImageFileAsURL();
	}
});
