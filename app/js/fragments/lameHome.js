/*
 * lameHome Functions
 * */
"use strict"
AV.lameHome = {
	init: function () {
		$(window).on("hashchange", function() {
			if($("a[href='#0']").hasClass("active")){
				$(".lame-home__section__subTitle, .lame-home__section__title, .lame-home__section__details, .lame-presentation__section__signature").addClass("animated fadeIn");
			}
		})
		setInterval(function(){
			$('#mouseMouve').toggleClass("mouseMouve");
		}, 900);
	}
};
