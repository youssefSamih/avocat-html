"use strict";

var AV = AV || {};

$(document).ready(function () {

	AV.lameHome.init();
	AV.lameSkeleton.init();
	AV.lameContact.init();

});

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

AV.lameHome = {
	init: function () {
		setInterval(function(){
			$('#mouseMouve').toggleClass("mouseMouve");
		}, 900);
	}
};

"use strict"
var url = "#0";
AV.lameSkeleton = {
	init: function () {
		$(window).on('hashchange', function(e){
			var listSubUrl = window.location.href.split('/');
				for (let i = 0; i < listSubUrl.length; i++) {
					const element = listSubUrl[i];
					if(element.startsWith('#')){
						url = element;
						$(".collap a").attr("href", url);
						$(".nav-item__link").removeClass("active");
						$("a[href='"+ url +"']").toggleClass("active");
					}
				}
		  });
		  $(".collap").click(function(){
				$(".collap > a").click(function(e) {
					e.preventDefault();
				})
				var listSubUrl = window.location.href.split('/');
				for (let i = 0; i < listSubUrl.length; i++) {
					const element = listSubUrl[i];
					if(element.startsWith('#')){
						url = element;
						$(".collap a").attr("href", url);
					}
				}
				$(".nav-item__link").removeClass("active");
				$("a[href='"+ url +"']").toggleClass("active");
				$(".sidebar").toggleClass("active");
				$("main").toggleClass("mainActive");
				$(".nav-item__link__title").toggleClass("collapsed");
				$(".nav-item__link__ic").toggleClass("collapsed");
			});
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
					$(this).preventDefault();
					$(".footer").toggleClass("stretch");
					$(".footer__el").toggleClass("active");
				});
			} else {
				$('.nav-item__link').click(function(e) {
					$(e).preventDefault();
					$(".nav-item__link").toggleClass("active");
					$("a[href='"+ url +"']").toggleClass("active");
					$(".sidebar").addClass("active");
					$(".collap a").attr("href", url);
				});
			}
	}
};
