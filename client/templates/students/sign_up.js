Template.signUp.rendered = () => {
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
};

Template.signUp.events({
    'submit form': (event, template) => {
        event.preventDefault();

        var form = {
            name: $('#fullName').val(),
            dob: $('#dateOfBirth').val(),
            email: $('#email').val(),
            phnNumber: $('#phnNumber').val(),
            school: $('#school').val(),
            studentNumber: $('#studentNumber').val(),
            gradDate: $('#gradDate').val(),
            photo: $('#photo').val()
        };
        
        console.log(form);

    }
});
