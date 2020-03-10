/*
 * lameHome Functions
 * */
"use strict"
AV.lameHome = {
	init: function () {
		var listSubUrl = window.location.href.split("/");
		$(window).on("hashchange", function() {
			if(listSubUrl[listSubUrl.length - 1] === "#0"){
				$(".lame-home__section__subTitle, .lame-home__section__title, .lame-home__section__details").addClass("animated fadeIn");
			}
		});
		setInterval(function(){
			$('#mouseMouve').toggleClass("mouseMouve");
		}, 900);
	}
};
