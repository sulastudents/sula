Template.students.helpers({
    isMobile: function () {
        if (screen.width < 450) {
            return true;
        }
        return false;
    }
});
