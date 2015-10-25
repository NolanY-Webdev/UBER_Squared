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
        L.marker(waypoint).addTo(map).on('click', onMarkerClick);

        Waypoints.insert({
            destination: waypoint,
            index: Waypoints.find().count(),
            owner: Meteor.userId()
        })
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution : '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    var originMarker = L.marker(origin).addTo(map).on('click', onMarkerClick);

    data = Waypoints.find({owner: Meteor.userId()}, { sort: { index: 1 } });

    data.forEach(function (row) {
        var point = row.destination;
        L.marker(point).addTo(map).on('click', onMarkerClick);
    });

    function onMarkerClick(e) {
        alert(e.latlng);
    };

    return [lat, lon];
  }

  getLocation();

  L.getMap('map').on('click', onMapClick);

  function onMapClick(e) {
      var waypoint = [e.latitude, e.longitude];
      var wpCoor = {};
      L.marker(waypoint).addTo(L.map('map'));
  }

};

// Template.map.helpers({
//   getPriceEstimates : function (destination) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//     function showPosition(position) {
//       var origin = {};
//       origin._latlng.lat = position.coords.latitude;
//       origin._latlng.lng = position.coords.longitude;
//     }

//     $.get( apiUrl + 'estimates/price', {
//       source : JSON.stringify(origin),
//       destination : JSON.stringify(destination)
//     })
//     .done(function(data) {
//       prices.reset();
//       var result = JSON.parse(data);
//       result.prices.forEach(function(price) {
//         prices.add( new Price(
//           _.extend(price, {
//             source : origin,
//             destination : {
//               lat : destinationMarker._latlng.lat,
//               lng : destinationMarker._latlng.lng
//             }
//           })
//         ));
//       });
//     })
//     .fail(function(err){
//       prices.reset();
//       if ( err.status && err.responseText) {
//         console.error(err.status, err.responseText);
//       } else {
//         console.error(err);
//       }
//     });
//   }
// });