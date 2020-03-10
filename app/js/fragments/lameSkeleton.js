/*
 * lameSkeleton Functions
 * */
"use strict";

AV.lameSkeleton = {
  init: function() {
		var url = "#0";
		var listSubUrl = window.location.href.split("/");
		function scrollToSection(id) {
			if(url !== id) {
				$('html, body').animate({
					scrollTop: $(""+url).offset().top
				}, .3);
			}
		}
    $(window).on("hashchange", function() {
			listSubUrl = window.location.href.split("/");
      if (listSubUrl[listSubUrl.length - 1].startsWith("#")) {
				url = listSubUrl[listSubUrl.length - 1];
				scrollToSection(url);
        $(".nav-item__link").removeClass("active");
        $("a[href='" + url + "']").toggleClass("active");
      }
    });
    $(".collap").click(function(e) {
			e.preventDefault();
      listSubUrl = window.location.href.split("/");
      if (listSubUrl[listSubUrl.length - 1].startsWith("#")) {
				url = listSubUrl[listSubUrl.length - 1];
				scrollToSection(url);
      }
      $(".nav-item__link").removeClass("active");
      $("a[href='" + url + "']").toggleClass("active");
      $(".sidebar").toggleClass("active");
      $("main").toggleClass("mainActive");
      $(".nav-item__link__title").toggleClass("collapsed");
      $(".nav-item__link__ic").toggleClass("collapsed");
    });
    if (window.matchMedia("(min-width: 768px)").matches) {
      $("section").removeAttr("id");
      new fullScroll({
        sections: "section",
        mainElement: "main",
        displayDots: true,
        dotsPosition: "right",
        animateTime: 1,
        animateFunction: "ease"
			});
			$(".toggle").click(function() {
        $(this).preventDefault();
        $(".footer").toggleClass("stretch");
        $(".footer__el").toggleClass("active");
      });
		}
		if (window.matchMedia("(max-width: 768px)").matches) {
      $(".link").click(function() {
        listSubUrl = window.location.href.split("/");
        if (listSubUrl[listSubUrl.length - 1].startsWith("#")) {
					url = listSubUrl[listSubUrl.length - 1];
				}
        $(".nav-item__link").removeClass("active");
        $(".nav-item__link").toggleClass("active");
        $("a[href='" + url + "']").toggleClass("active");
        $(".sidebar").toggleClass("active");
      });
    }
  }
};
