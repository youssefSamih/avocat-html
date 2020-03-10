/*
 * lameExpertise Functions
 * */
"use strict"
AV.lameExpertise = {
	init: function () {
		$(window).on("hashchange", function() {
			if($("a[href='#2']").hasClass("active")){
				$(".cols").addClass("animated fadeIn");
			}
		});
	}
};
