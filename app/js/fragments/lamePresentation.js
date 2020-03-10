/*
 * lamePresentation Functions
 * */
"use strict"
AV.lamePresentation = {
	init: function () {
		$(window).on("hashchange", function() {
			if($("a[href='#1']").hasClass("active")){
				$(".lame-presentation__section__subTitle, .lame-presentation__section__title, .lame-presentation__section__details, .lame-presentation__section__signature").addClass("animated fadeIn");
			}
		})
	}
};
