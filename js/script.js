/*

Style   : MobApp Script JS
Version : 1.0
Author  : Surjith S M
URI     : https://surjithctly.in/

Copyright © All rights Reserved 

*/

$(function () {
  "use strict";

  /*-----------------------------------
   * FIXED  MENU - HEADER
   *-----------------------------------*/
  function menuscroll() {
    var $navmenu = $(".nav-menu");
    if ($(window).scrollTop() > 50) {
      $navmenu.addClass("is-scrolling");
    } else {
      $navmenu.removeClass("is-scrolling");
    }
  }
  menuscroll();
  $(window).on("scroll", function () {
    menuscroll();
  });
  /*-----------------------------------
   * NAVBAR CLOSE ON CLICK
   *-----------------------------------*/

  $(".navbar-nav > li:not(.dropdown) > a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });
  /*
   * NAVBAR TOGGLE BG
   *-----------------*/
  var siteNav = $("#navbar");
  siteNav.on("show.bs.collapse", function (e) {
    $(this).parents(".nav-menu").addClass("menu-is-open");
  });
  siteNav.on("hide.bs.collapse", function (e) {
    $(this).parents(".nav-menu").removeClass("menu-is-open");
  });

  /*-----------------------------------
   * ONE PAGE SCROLLING
   *-----------------------------------*/
  // Select all links with hashes
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[data-toggle="tab"]')
    .on("click", function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
  /*-----------------------------------
   * OWL CAROUSEL
   *-----------------------------------*/
  var $testimonialsDiv = $(".testimonials");
  if ($testimonialsDiv.length && $.fn.owlCarousel) {
    $testimonialsDiv.owlCarousel({
      items: 1,
      nav: true,
      dots: false,
      navText: [
        '<span class="ti-arrow-left"></span>',
        '<span class="ti-arrow-right"></span>',
      ],
    });
  }

  var $galleryDiv = $(".img-gallery");
  if ($galleryDiv.length && $.fn.owlCarousel) {
    $galleryDiv.owlCarousel({
      nav: false,
      center: true,
      loop: true,
      autoplay: true,
      dots: true,
      navText: [
        '<span class="ti-arrow-left"></span>',
        '<span class="ti-arrow-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 3,
        },
      },
    });
  }
}); /* End Fn */

var words = [
    "Travel",
    "Health",
    "Nature",
    "Career",
    "Sports",
    "Beauty",
    "Future",
    "Family",
  ],
  part,
  i = 0,
  offset = 0,
  len = words.length,
  forwards = true,
  skip_count = 0,
  skip_delay = 15,
  currentWordIndex = 0,
  speed = 100;

var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      } else {
        offset--;
      }
    }
    $(".word").text(part);
  }, speed);
};

var wordChange = function () {
  // Initial display of the first word
  $(".word").text(words[currentWordIndex]);

  setInterval(function () {
    // Get the next word
    currentWordIndex++;

    // If reached the end, start from the first word
    if (currentWordIndex >= words.length) {
      currentWordIndex = 0;
    }

    // Display the current word in the HTML element with class "wordChange"
    $(".word").text(words[currentWordIndex]);
  }, 1000);
};

// $(document).ready(function () {
//   wordChange();
// });

/* FadeIn Scroll */
$(document).ready(function () {
  wordChange();
  /* Every time the window is scrolled ... */
  $(window).scroll(function () {
    /* Check the location of each desired element */
    $(".fade").each(function (i) {
      // var bottom_of_object = $(this).position().top + $(this).outerHeight();
      // var bottom_of_window = $(window).scrollTop() + $(window).height();
      // /* If the object is completely visible in the window, fade it it */
      // if (bottom_of_window > bottom_of_object) {
      //   $(this).animate({ opacity: "1" }, 100);
      // }
      var top_of_object = $(this).position().top;
      var mid_of_window = $(window).scrollTop() + $(window).height() / 2;

      /* If the top of the object is visible in the window, fade it in */
      if (mid_of_window > top_of_object) {
        $(this).animate({ opacity: "1" }, 100);
      }
    });
  });
});
