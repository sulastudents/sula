SulaUtils = {};

SulaUtils.scrollToTop = function() {
	var scrollTo = window.currentScroll || 0;
	$('body').scrollTop(scrollTo);
	$('body').css("min-height", 0);
};

SulaUtils.validateStudentSignupForm = function (form) {
	var requiredFields = _.omit(form, 'studentNumber');

	return (_.indexOf(_.values(requiredFields), "") >= 0) ? false:true;
}
