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
    var latest = null;
    map.on('click', function (e) {
        var waypoint = [e.latlng.lat, e.latlng.lng];
        L.marker(waypoint).addTo(map);
        console.log("1", waypoint);


        latest = Waypoints.insert({
            destination: waypoint,
            index: Waypoints.find().count(),
            date: new Date()
        })
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution : '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    var originMarker = L.marker(origin).addTo(map);
    var destinationMarker = null;
    map.on('click', function(event) {
      if (destinationMarker) {
        destinationMarker.setLatLng(event.latlng);
      } else {
        destinationMarker = L.marker(event.latlng).addTo(map);
        // console.log("4", destinationMarker._latlng.lat, destinationMarker._latlng.lng);
      }
    })
    $('#pin').on('click', function(){
      // console.log("4", destinationMarker._latlng.lat, destinationMarker._latlng.lng);
      var waypoints = Waypoints.findOne({_id: latest });
      // var waypoints = Waypoints.findOne({ date : 1 });
      // var waypoints = Waypoints.find({"_id" : {"$lt" : date}})
      // var waypoints = Waypoints.find().sort({date: 1});
      // var waypoints = Waypoints.find({ $first : "date"});
      // var waypoints = Waypoints.find({ _id : 1 });
      console.log("", waypoints);
    })

    return [lat, lon];
  }

  getLocation();


};

