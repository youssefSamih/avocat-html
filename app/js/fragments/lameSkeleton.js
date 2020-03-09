/*
 * lameSkeleton Functions
 * */
"use strict"
var url = window.location.href.split('/')[3];
AV.lameSkeleton = {
	init: function () {
		$(window).on('hashchange', function(e){
			url = window.location.href.split('/')[3];
				$(".nav-item__link").removeClass("active");
				$("a[href='"+ url +"']").toggleClass("active");
		  });
		  $(".collap").click(function(){
				$(".collap a").attr("href", url);
				$(".sidebar").toggleClass("active");
				$("main").toggleClass("mainActive");
				$(".nav-item__link__title").toggleClass("collapsed");
				$(".nav-item__link__ic").toggleClass("collapsed");
			});
			function checkPosition() {
				if (window.matchMedia('(min-width: 768px)').matches) {
					$("section").removeAttr("id");
					new fullScroll({
						sections : 'section',
						mainElement: 'main',
						displayDots: true,
						dotsPosition: 'right',
						animateTime: 1,
						animateFunction: 'ease'
					});
				}
				if (window.matchMedia('(min-width: 768px)').matches) {
					$(".toggle").click(function(){
						$(".footer").toggleClass("stretch");
						$(".footer__el").toggleClass("active");
					});
				} else {
					$('.nav-item__link').click(function() {
						$(".nav-item__link").removeClass("active");
						$("a[href='"+ url +"']").toggleClass("active");
						$(".sidebar").addClass("active");
					});
				}
			}
			checkPosition();
	}
};
