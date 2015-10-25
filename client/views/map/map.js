//any js functions we want to run on the map go here
Template.map.rendered = function() {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var origin = [lat, lon];

    // hard coded orig
    // var origin = [21.2968065, -157.8565356];

    var map = L.map('map').setView(origin, 17);

    map.on('click', function (e) {
        var waypoint = [e.latlng.lat, e.latlng.lng];
        L.marker(waypoint).addTo(map);

        Waypoints.insert({
            destination: waypoint,
            index: Waypoints.find().count(),
        })
    });
    
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution : '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    var originMarker = L.marker(origin).addTo(map);
    return [lat, lon];
  }

  getLocation();

  L.getMap('map').on('click', onMapClick);

  function onMapClick(e) {
      var waypoint = [e.latitude, e.longitude];
      L.marker(waypoint).addTo(L.map('map'));
  }

};