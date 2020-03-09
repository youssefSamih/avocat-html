/*
 * lameContact Functions
 * */
AV.lameContact = {
	init: function () {
		mapboxgl.accessToken = 'pk.eyJ1IjoieW91c3NlZnNhbWloIiwiYSI6ImNrMnJucjducTA4aXAzaHB2bmF5cjhsZnAifQ.0mJnZzE7_w0J9SXQoUKecw';
		var map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
		center: [-74.5, 40], // starting position [lng, lat]
		zoom: 9 // starting zoom
		});
	}
};
