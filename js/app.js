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

    function timeToLaunch() {
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

    function countDownTimer() {
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

    function numberTransition(id, endPoint, transitionDuration, transitionEase) {
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

    //ajax form
    $(function() {
        // Get the form.
        var form = $('#ajax-contact');

        // Get the messages div.
        var formMessages = $('#form-messages');

        // Set up an event listener for the contact form.
        $(form).submit(function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    data: formData
                })
                .done(function(response) {
                    // Make sure that the formMessages div has the 'success' class.
                    $(formMessages).removeClass('error');
                    $(formMessages).addClass('success');

                    // Set the message text.
                    $(formMessages).text(response);

                    // Clear the form.
                    $('#name').val('');
                    $('#email').val('');
                    $('#message').val('');
                })
                .fail(function(data) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass('success');
                    $(formMessages).addClass('error');

                    // Set the message text.
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('Oops! An error occured and your message could not be sent.');
                    }
                });

        });

    });

    // // smooth scrolling
    // $(function() {
    //     $('a[href*=#]:not([href=#])').click(function() {
    //         if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    //             var target = $(this.hash);
    //             target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //             if (target.length) {
    //                 $('html,body').animate({
    //                     scrollTop: target.offset().top
    //                 }, 700);
    //                 return false;
    //             }
    //         }
    //     });
    // });
    // initialize wow.js
    new WOW().init();

    // Push the body and the nav over by 285px over
    var main = function() {
        $('.fa-bars').click(function() {
            $('.nav-screen').animate({
                right: "0px"
            }, 200);

            $('body').animate({
                right: "300px"
            }, 200);
        });

        // Then push them back */
        $('.fa-times').click(function() {
            $('.nav-screen').animate({
                right: "-300px"
            }, 200);

            $('body').animate({
                right: "0px"
            }, 200);
        });

        $('.nav-links a').click(function() {
            $('.nav-screen').animate({
                right: "-300px"
            }, 500);

            $('body').animate({
                right: "0px"
            }, 500);
        });
    };

    $('#slider').slick({
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        speed: 2000,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
    });

    // Page Scroll
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 32
                }, 1000);
                return false;
            }
        }
    });

    // Fixed Nav
    $(window).scroll(function() {
        var scrollTop = 366;
        if ($(window).scrollTop() >= scrollTop) {
            $('nav').css({
                position: 'fixed',
                top: '0'
            });
            $('nav ul').css({
                display: 'flex'
            })
        }
        if ($(window).scrollTop() < scrollTop) {
            $('nav').removeAttr('style');
            $('nav ul').removeAttr('style');
        }
    });

    // Active Nav Link
    $('nav ul li a').click(function() {
        $('nav ul li a').removeClass('active');
        $(this).addClass('active');
    });
});


var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var myLatlng = new google.maps.LatLng(43.045466,-87.923418);


function initialize() {
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

function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

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

google.maps.event.addDomListener(window, 'load', initialize);
