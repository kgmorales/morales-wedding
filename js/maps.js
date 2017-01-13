var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

var initMap = function() {
    var myLatlng = new google.maps.LatLng(43.045466, -87.923418);

    directionsDisplay = new google.maps.DirectionsRenderer();

    var mapOptions = {
        zoom: 18,
        center: myLatlng
    }

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Morales Wedding'
    });
}

var calcRoute = function() {
    console.log('calcRout ran');
    var start = new google.maps.LatLng(54.986136, -1.537945);
  var end = new google.maps.LatLng(41.850033, -87.6500523);

  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  console.log(request);
  if (request==true)
  {
    console.log("REQUEST");
  }
  console.log(JSON.stringify(request)); 
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        if (!response.routes[0].copyrights) { 
        response.routes[0].copyrights = "Copyrights unknown."; 
        }
        console.log("ALL GOOD!");
      directionsDisplay.setDirections(result);
    }
    else
    {
        console.log("NOT-GOOD!");
    }
  });
}

// google.maps.event.addDomListener(window, 'load', initMap);
