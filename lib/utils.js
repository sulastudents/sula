SulaUtils = {};

SulaUtils.scrollToTop = function() {
	var scrollTo = window.currentScroll || 0;
	$('body').scrollTop(scrollTo);
	$('body').css("min-height", 0);
};
