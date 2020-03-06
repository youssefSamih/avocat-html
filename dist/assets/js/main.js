"use strict";

var AV = AV || {};

$(document).ready(function () {
  $("#collapse").toggle(
    function(){$(this).css({"color": "red"});},
    function(){$(this).css({"color": "blue"});},
  );
  new fullScroll({
    sections : 'section',
    mainElement: 'main',
    displayDots: true,
    dotsPosition: 'right',
    animateTime: 1,
    animateFunction: 'ease'
  });
});
