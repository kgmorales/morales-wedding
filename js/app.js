$(document).ready(function() {
    // typing animation
    (function($) {
        $.fn.writeText = function(content) {
            var contentArray = content.split(""),
                current = 0,
                elem = this;
            setInterval(function() {
                if (current < contentArray.length) {
                    elem.text(elem.text() + contentArray[current++]);
                }
            }, 80);
        };

    })(jQuery);

    // input text for typing animation 
    $("#holder").writeText("WEB DESIGNER + FRONT-END DEVELOPER");

    // initialize wow.js
    new WOW().init();

    // Push the body and the nav over by 285px over
    var main = function() {
        $('.fa-bars').click(function() {
            $('.nav-screen').animate({
                right: "0px"
            }, 200);

            $('body').animate({
                right: "285px"
            }, 200);
        });

        // Then push them back */
        $('.fa-times').click(function() {
            $('.nav-screen').animate({
                right: "-285px"
            }, 200);

            $('body').animate({
                right: "0px"
            }, 200);
        });

        $('.nav-links a').click(function() {
            $('.nav-screen').animate({
                right: "-285px"
            }, 500);

            $('body').animate({
                right: "0px"
            }, 500);
        });
    };

    $(document).ready(main);

    // initiate full page scroll

    $('#fullpage').fullpage({
        scrollBar: true,
        responsiveWidth: 400,
        navigation: true,
        navigationTooltips: ['home', 'about', 'information', 'contact', 'connect'],
        anchors: ['home', 'about', 'information', 'contact', 'connect'],
        menu: '#myMenu',
        fitToSection: false,

        afterLoad: function(anchorLink, index) {
            var loadedSection = $(this);


            //using index
            if (index == 1) {
                /* add opacity to arrow */
                $('.fa-chevron-down').each(function() {
                    $(this).css('opacity', '1')
                });
                $('.header-links a').each(function() {
                    $(this).css('color', 'white')
                });
            } else if (index != 1) {
                $('.header-links a').each(function() {
                    $(this).css('color', 'black')
                });
            }

            //using index
            if (index == 2) {

                /* animate skill bars */
                $('.skillbar').each(function() {
                    $(this).find('.skillbar-bar').animate({
                        width: jQuery(this).attr('data-percent')
                    }, 2500);
                });
            }
        }
    });


    // move section down one
    $(document).on('click', '#moveDown', function() {
        $.fn.fullpage.moveSectionDown();
    });

    // fullpage.js link navigation
    $(document).on('click', '#about', function() {
        $.fn.fullpage.moveTo(2);
    });

    $(document).on('click', '#information', function() {
        $.fn.fullpage.moveTo(3);
    });

    $(document).on('click', '#contact', function() {
        $.fn.fullpage.moveTo(4);
    });

    // smooth scrolling
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 700);
                    return false;
                }
            }
        });
    });

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
    /* --------------------------
     * GLOBAL VARS
     * -------------------------- */
    // The date you want to count down to
    var targetDate = new Date("2017/10/14 05:00:00");

    // Other date related variables
    var days;
    var hrs;
    var min;
    var sec;

    /* --------------------------
     * ON DOCUMENT LOAD
     * -------------------------- */
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

    /* --------------------------
     * FIGURE OUT THE AMOUNT OF 
       TIME LEFT BEFORE LAUNCH
     * -------------------------- */
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

    /* --------------------------
     * DISPLAY THE CURRENT 
       COUNT TO LAUNCH
     * -------------------------- */
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

    /* --------------------------
     * TRANSITION NUMBERS FROM 0
       TO CURRENT TIME UNTIL LAUNCH
     * -------------------------- */
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

});
