Template.sideBanner.events({
    'click #sideBanner': function (event) {
        event.preventDefault();

        Router.go('signUp');
        return;
    }
});
