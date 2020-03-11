/*
 * lameSkeleton Functions
 * */
"use strict";

AV.lameSkeleton = {
  init: function() {
		var url = "#0";
		var listSubUrl = window.location.href.split("/");
		function scrollToSection(id) {
			if (window.matchMedia("(max-width: 768px)").matches) {
				if(url !== id) {
					$('html, body').animate({
						scrollTop: $(""+url).offset().top
					}, .3);
				}
			}
		}
		function toggleClasses() {
			$(".nav-item__link").removeClass("active");
			$("a[href='" + url + "']").toggleClass("active");
			$(".sidebar").toggleClass("active");
		}
		function truncateText(selector, maxLength) {
			var element = document.getElementsByClassName(selector);
			for (var i = 0; i < element.length; i++) {
				var el = element[i];
				var truncated = el.innerText;
				if (truncated.length > maxLength) {
					truncated = truncated.substr(0,maxLength) + '...';
				}
				el.innerText = truncated;
			}
		}
		function removeDotsElement(){
			var dotsElement = document.getElementsByClassName("dots-right");
				for (var i = 0; i < dotsElement.length; i++) {
					var el = dotsElement[i];
					el.remove();
				}
		}
		function forMatchMedia() {
			if (window.matchMedia("(min-width: 768px)").matches) {
				$("section").removeAttr("id");
				removeDotsElement();
				new fullScroll({
					sections: "section",
					mainElement: "main",
					displayDots: true,
					dotsPosition: "right",
					animateTime: 1,
					animateFunction: "ease"
				});
			}
			else if (window.matchMedia("(max-width: 768px)").matches) {
				removeDotsElement
				$(".link").click(function() {
					listSubUrl = window.location.href.split("/");
					if (listSubUrl[listSubUrl.length - 1].startsWith("#")) {
						url = listSubUrl[listSubUrl.length - 1];
					}
					toggleClasses();
					$("a[href='" + url + "']").toggleClass("active");
				});
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
      toggleClasses();
      $("main").toggleClass("mainActive");
      $(".nav-item__link__title").toggleClass("collapsed");
      $(".nav-item__link__ic").toggleClass("collapsed");
		});
		$(".toggle").click(function() {
			$(".footer").toggleClass("stretch");
			$(".footer__el").toggleClass("active");
		});
		$('#collapMenu, .collap').click(function(){
			var href = $("a.active").attr("href");
			if (window.matchMedia("(max-width: 768px)").matches){
				$('html, body').animate({
					scrollTop: $(""+href).offset().top
				}, .3);
			}
		});
		$(window).resize(function() {
			removeDotsElement();
			forMatchMedia();
		});
		truncateText('nav-item__link__title', 15);
    forMatchMedia();
  }
};
