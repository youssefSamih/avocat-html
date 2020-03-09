/*
 * lameSkeleton Functions
 * */
var url = window.location.href.split('/')[3];
AV.lameSkeleton = {
	init: function () {
		$(window).on('hashchange', function(e){
			url = window.location.href.split('/')[3];
			$(".nav-item__link").removeClass("active");
			$("a[href='"+ url +"']").toggleClass("active");
		   });
		  $(".toggle").click(function(){
			$(".footer").toggleClass("stretch");
			$(".footer__el").toggleClass("active");
		  });
		  $(".collap").click(function(){
			$(".sidebar").toggleClass("active");
			$("main").toggleClass("mainActive");
			$(".nav-item__link__title").toggleClass("collapsed");
			$(".nav-item__link__ic").toggleClass("collapsed");
			});
			function checkPosition() {
					if (window.matchMedia('(min-width: 768px)').matches) {
						new fullScroll({
							sections : 'section',
							mainElement: 'main',
							displayDots: true,
							dotsPosition: 'right',
							animateTime: 1,
							animateFunction: 'ease'
						});
					}
			}
			checkPosition();
	}
};
