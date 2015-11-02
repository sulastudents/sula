// Template.signUp.created = () => {
    // let instance = this;
    //
    // let subscription = instance.subscribe('profile', userId);
    //
    // instance.profile = () => {
    //     return Profiles.findOne({});
    // };
// };

Template.signUp.rendered = function() {
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 80 // Creates a dropdown of 15 years to control year
    });
};

Template.signUp.events({
    "change #studentsAcceptTerms": function (event) {
        var checkbox = document.getElementById('studentsAcceptTerms');
        var registerBtn = document.getElementById('studentSignUpBtn');
            if(checkbox.checked) {
                $('#studentSignUpBtn').removeClass('disabled');
            } else {
                registerBtn.classList ? registerBtn.classList.add('disabled') : registerBtn.className += ' disabled';
            }
    },
    'submit form': function(event, template) {
        event.preventDefault();

        var classes = $('#studentSignUpBtn')[0].classList;
        if (_.indexOf(classes, 'disabled') > 0) {
            toastr.error('Accept the Terms.');
            return;
        }

        var form = {
            name: $('#fullName').val(),
            dob: $('#dateOfBirth').val(),
            email: $('#email').val(),
            phnNumber: $('#phnNumber').val(),
            school: $('#school').val(),
            studentNumber: $('#studentNumber').val(),
            gradDate: $('#gradDate').val()

            // photo removed because cards are no longer printed with photoes
            // photo: $('#preview')[0].src
        };

        // console.log(form);

        Meteor.call('insertStudent', form, function(error, result) {
            if (error) {
                alert('Sorry, something went wrong!');
                return;
            }

            alert('You have successfully registered!');
            Router.go('students');
        });
    },

    'change #photo': function(event, template) {
        encodeImageFileAsURL = function (filesSelected){

			    // var filesSelected = document.getElementById('newImg').files;
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
			                    console.log(srcData);
			            $('#preview').attr('src', srcData);
			            return srcData;
			        };
			        fileReader.readAsDataURL(fileToLoad);

			    }
			};

		encodeImageFileAsURL(document.getElementById('photo').files);
    }
});
