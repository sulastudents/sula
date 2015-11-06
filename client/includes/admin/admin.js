Template.adminLayout.helpers({
    isAllowed: function () {
        return Session.get('isAllowed') || false;
    }
});

Template.adminLayout.events({
    'submit #access': function (event, template) {
        event.preventDefault();

        var code = $('#code').val();

        if (code === "@t@ck!") {
            Session.set("isAllowed", true);
        }
    }
});

Template.admin.helpers({
    template: function () {
        return Session.get('adminTemplate') || 'adminSummary';
    }
});

Template.admin.events({
    'click .adminSummary': function (event) {
        event.preventDefault();

        Session.set('adminTemplate', 'adminSummary');
        return;
    },
    'click .adminUsers': function (event) {
        event.preventDefault();

        Session.set('adminTemplate', 'adminSetPassword');
        return;
    },
    'click .adminDiscounts': function (event) {
        event.preventDefault();

        Session.set('adminTemplate', 'adminDiscounts');
        return;
    },
    'click .adminStudents': function (event) {
        event.preventDefault();

        Session.set('adminTemplate', 'adminStudents');
        return;
    },
    'click #resetAdmin': function (event) {
        event.preventDefault();

        Meteor.call("resetAdmin", function(error, result){
            if(error){
                console.log("error", error);
                toastr.error("error");
                return;
            }
            if(result){
                 toastr.success("success!");
                 return;
            }
        });
    }
});

Template.adminSummary.helpers({
    usersCount: function () {
        return Meteor.users.find().count();
    },
    discountsCount: function () {
        return Discounts.find().count();
    },
    studentsCount: function () {
        return Students.find().count();
    }
});

Template.adminSetPassword.helpers({
    adminUser: function () {
        return Accounts.users.find().fetch();
    }
});

Template.adminSetPassword.events({
    "click .card-panel": function (event) {
        // event.preventDefault();

    },
    "click #setPassword": function (event) {
        event.preventDefault();

        var userId = this._id,
            newPassword = $('#'+userId).val();

        Meteor.call("adminSetPassword", userId, newPassword, function (error, result) {
            if (error) {
                alert("error");
                return;
            }
            console.log("no error");

            alert(result);
            return;
        });
    },
    "click .deleteUser": function (event) {
        event.preventDefault();

        var userId = this._id;

        Meteor.call("deleteVendor", userId, function (error, result) {
            if (error) {
                toastr.error(error);
                console.log(error);
                return;
            }
            toastr.success("success!");
            console.log(result);
            return;
        });
    }
});
