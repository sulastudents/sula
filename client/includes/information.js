// Template.information.created({
    // Session.set("sceenWidth", screen.width);
// });
Template.information.rendered = function(){
    $('#carousel').slick({
        // dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
}

Template.information.helpers({
    isMobile: function () {
        if (screen.width < 450) {
            return true;
        }
        return false;
    }
});
