/*
 * lamePresentation Functions
 * */
"use strict"
AV.lamePresentation = {
	init: function () {
		var listSubUrl = window.location.href.split("/");
		$(window).on("hashchange", function() {
			$(".lame-presentation__section__subTitle, .lame-presentation__section__title, .lame-presentation__section__details, .lame-presentation__section__signature").removeClass("animated fadeIn");
			setTimeout(function(){
				if(listSubUrl[listSubUrl.length - 1] === "#1"){
					$(".lame-presentation__section__subTitle, .lame-presentation__section__title, .lame-presentation__section__details, .lame-presentation__section__signature").addClass("animated fadeIn");
				}
			}, 600);
		});
	}
};
