//any js functions we want to run on the map go here
Template.map.rendered = function() {
  var lat;
  var lon;
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  function showPosition(position) {
    return [position.coords.latitude, position.coords.longitude];
  }

  // var origin = getLocation();
  // console.log(origin);
  var origin = [21.2968065, -157.8565356];

  var map = L.map('map').setView(origin, 17);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution : '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
  }).addTo(map);

  var originMarker = L.marker(origin).addTo(map);
};