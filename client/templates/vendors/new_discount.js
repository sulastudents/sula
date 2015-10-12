Template.newDiscount.onRendered(function() {
	this.autorun(function () {
		if (GoogleMaps.loaded()) {
			$("#location").geocomplete();
		}
	});

	$(document).ready(function() {
		$('select').material_select();
	});

});

Template.newDiscount.events({
	'submit #newOffer': function (e) {
		e.preventDefault();

		var offer = {
			image: $('#preview').attr('src'),
			title: $(e.target).find('[name=title]').val(),
			discount: $(e.target).find('[name=discount]').val(),
			location: $(e.target).find('[name=location]').val(),
			category: $(e.target).find('[name=category]').val(),
			description: $(e.target).find('[name=description]').val()
		};

		Meteor.call('offerInsert', offer, function (error, result) {
			// display error to user and abort
			if (error) {
				return throwError(error.reason);
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
