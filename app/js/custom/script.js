"use strict";

var AV = AV || {};

$(document).ready(function () {
  $(".toggle").click(function(){
    $(".footer").toggleClass("stretch");
    $(".footer__el").toggleClass("active");
  });
  $("#collapse").click(function(){
    $(".sidebar").toggleClass("active");
    $("main").toggleClass("mainActive");
    $(".nav-item__link__title").toggleClass("collapsed");
    $(".nav-item__link__ic").toggleClass("collapsed");
  });
  new fullScroll({
    sections : 'section',
    mainElement: 'main',
    displayDots: true,
    dotsPosition: 'right',
    animateTime: 1,
    animateFunction: 'ease'
  });
});
