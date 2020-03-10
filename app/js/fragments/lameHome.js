/*
 * lameHome Functions
 * */
"use strict"
AV.lameHome = {
	init: function () {
		setInterval(function(){
			$('#mouseMouve').toggleClass("mouseMouve");
		}, 900);
	}
};
