"use strict";

var AV = AV || {};

$(document).ready(function () {

	AV.lameHome.init();
	AV.lameSkeleton.init();
	AV.lameContact.init();

});

"use strict"
AV.lameContact = {
	init: function () {
		mapboxgl.accessToken = 'pk.eyJ1IjoieW91c3NlZnNhbWloIiwiYSI6ImNrMnJucjducTA4aXAzaHB2bmF5cjhsZnAifQ.0mJnZzE7_w0J9SXQoUKecw';
		var map = new mapboxgl.Map({
		container: 'map', 
		style: 'mapbox://styles/mapbox/streets-v11', 
		center: [-74.5, 40], 
		zoom: 9 
		});
	}
};

"use strict"
AV.lameHome = {
	init: function () {
		setInterval(function(){
			$('#mouseMouve').toggleClass("mouseMouve");
		}, 900);
	}
};

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
		function toggleClasses() {
			$(".nav-item__link").removeClass("active");
			$("a[href='" + url + "']").toggleClass("active");
			$(".sidebar").toggleClass("active");
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
			$('html, body').animate({
				scrollTop: $(""+href).offset().top
			}, .3);
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
		}
		if (window.matchMedia("(max-width: 768px)").matches) {
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
};
