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

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Morales Wedding'
    });
}

var calcRoute = function() {
    var start = document.getElementById('start').value;
    var end = 'Grand Hall at Pabst Best Place 901 W Juneau Ave Milwaukee, WI 53233';

    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            alert("Sorry, no driving route can be found between these locations");
        }
    });
}