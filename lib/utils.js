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

SulaUtils.currentMonth = function () {
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	return months[new Date().getMonth()];
}
