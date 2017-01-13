$(document).ready(function() {
    // The date you want to count down to
    var targetDate = new Date("2017/10/14 05:00:00");

    // Other date related variables
    var days;
    var hrs;
    var min;
    var sec;
    $(function() {
        // Calculate time until launch date
        timeToLaunch();
        // Transition the current countdown from 0 
        numberTransition('#days .number', days, 1000, 'easeOutQuad');
        numberTransition('#hours .number', hrs, 1000, 'easeOutQuad');
        numberTransition('#minutes .number', min, 1000, 'easeOutQuad');
        numberTransition('#seconds .number', sec, 1000, 'easeOutQuad');
        // Begin Countdown
        setTimeout(countDownTimer, 1001);
    });

    var timeToLaunch = function() {
        // Get the current date
        var currentDate = new Date();
        // Find the difference between dates
        var diff = (currentDate - targetDate) / 1000;
        var diff = Math.abs(Math.floor(diff));
        // Check number of days until target
        days = Math.floor(diff / (24 * 60 * 60));
        sec = diff - days * 24 * 60 * 60;
        // Check number of hours until target
        hrs = Math.floor(sec / (60 * 60));
        sec = sec - hrs * 60 * 60;
        // Check number of minutes until target
        min = Math.floor(sec / (60));
        sec = sec - min * 60;
    }

    var countDownTimer = function() {
        // Figure out the time to launch
        timeToLaunch();
        // Write to countdown component
        $("#days .number").text(days);
        $("#hours .number").text(hrs);
        $("#minutes .number").text(min);
        $("#seconds .number").text(sec);

        // Repeat the check every second
        setTimeout(countDownTimer, 1000);
    }

    var numberTransition = function(id, endPoint, transitionDuration, transitionEase) {
        // Transition numbers from 0 to the final number
        $({ numberCount: $(id).text() }).animate({ numberCount: endPoint }, {
            duration: transitionDuration,
            easing: transitionEase,
            step: function() {
                $(id).text(Math.floor(this.numberCount));
            },
            complete: function() {
                $(id).text(this.numberCount);
            }
        });
    };

    // initialize wow.js
    new WOW().init();

    //slider
    $('#slider').slick({
        lazyLoad: 'ondemand',
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        speed: 2000,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //FAQ
    $(".faq-q").click(function() {
        var container = $(this).parents(".faq-c");
        var answer = container.find(".faq-a");
        var trigger = container.find(".faq-t");

        answer.slideToggle(200);

        if (trigger.hasClass("faq-o")) {
            trigger.removeClass("faq-o");
        } else {
            trigger.addClass("faq-o");
        }
    });

    //nav mobile
    $('#toggle').on('click touchstart', function(e) {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');

        e.preventDefault();
    });

    $('.overlay-menu a').on('click touchstart', function(e) {
        $('#toggle').removeClass('active');
        $('#overlay').removeClass('open');

        e.preventDefault();

    });

    //scroll for NAV
    $('a[href*=#]:not([href=#])').on('click touchstart', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 0
                }, 1000);
                return false;
            }
        }
    });
});

var geocoder;
var map;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

function initMap() {
    var map = new google.maps.Map(
    document.getElementById("map-canvas"), {
        center: new google.maps.LatLng(37.4419, -122.1419),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(map);
    calcRoute("New York, NY", "Baltimore, MD");
}
google.maps.event.addDomListener(window, "load", initMap);

function calcRoute(ref1, ref2) {
    var start = String(ref1);
    var end = String(ref2);
    var args = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    }
    directionsService.route(args, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var myroute = directionsDisplay.directions.routes[0];
            var distance = 0;
            for (i = 0; i < myroute.legs.length; i++) {
                distance += myroute.legs[i].distance.value;
                //for each 'leg'(route between two waypoints) we get the distance and add it to the total
            }
            document.getElementById('distance').innerHTML = distance +" meters";
        } else {
            alert("fail");
        }
    });

};

// var map;
// var directionsDisplay;
// var directionsService = new google.maps.DirectionsService();

// var initMap = function() {
//     var myLatlng = new google.maps.LatLng(43.045466, -87.923418);

//     directionsDisplay = new google.maps.DirectionsRenderer();

//     var mapOptions = {
//         zoom: 18,
//         center: myLatlng
//     }

//     var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//     directionsDisplay.setMap(map);

//     var marker = new google.maps.Marker({
//         position: myLatlng,
//         map: map,
//         title: 'Morales Wedding'
//     });
// }

// var calcRoute = function() {
//     var start = document.getElementById('start').value;
//     var end = 'Grand Hall at Pabst Best Place 901 W Juneau Ave Milwaukee, WI 53233';

//     var request = {
//         origin: start,
//         destination: end,
//         travelMode: google.maps.TravelMode.DRIVING
//     };

//     directionsService.route(request, function(response, status) {
//         if (status == google.maps.DirectionsStatus.OK) {
//             directionsDisplay.setDirections(response);
//         } else {
//             alert("Sorry, no driving route can be found between these locations");
//         }
//     });
// }

// google.maps.event.addDomListener(window, 'load', initMap);
