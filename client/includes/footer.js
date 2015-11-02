Template.footer.helpers({
    copyrightYear: function () {
        return new Date().getFullYear();
    }
});

Template.footer.events({
    'click #services': function () {
        Router.go('/adminDash');
        return;
    }
});
