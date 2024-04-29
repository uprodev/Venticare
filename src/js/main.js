// Import our custom CSS
import "../scss/styles.scss";

import { Modal } from "bootstrap";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

var imagesLoaded = require("imagesloaded");
var $ = require("jquery");
imagesLoaded.makeJQueryPlugin($);

// import Swiper from "swiper";
import Swiper from "swiper/bundle";

var moment = require("moment");

import Headroom from "headroom.js-latest";

$(document).ready(function () {
  // fixed header
  if (document.querySelector(".header")) {
    var myElement = document.querySelector(".header");
    var headroom = new Headroom(myElement, {
      offset: 30,
    });
    headroom.init();
  }

  if ($(".cp-calendar").length) {
    var calendar = $(".cp-calendar");
    var month, week, day;
    var date = $("#calendar").data("date");

    var a = moment();
    var b = moment(date);

    month = b.diff(a, "months");

    var c = b.subtract(month, "months");
    week = c.diff(a, "weeks");

    var d = c.subtract(c.diff(a, "weeks"), "weeks");
    day = d.diff(a, "days") + 1;

    month = month < 10 ? "0" + month : month;
    week = week < 10 ? "0" + week : week;

    $("#cMonth").text(month);
    $("#cWeek").text(week);
    $("#cDayCurrent").text(day - 1);
    $("#cDayBefore").text(day);

    ScrollTrigger.create({
      trigger: calendar,
      start: "top center",
      onEnter: function () {
        setTimeout(() => {
          calendar.addClass("in-view");
        }, 1000);
      },
    });
  }

  $("body").imagesLoaded(function () {
    ScrollTrigger.refresh();
  });

  // hero circles
  if ($(".s-hero").length) {
    var request = null;
    var mouse = { x: 0, y: 0 };
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var circle1 = document.querySelector(".s-hero .c1"),
      circle2 = document.querySelector(".s-hero .c2"),
      circle3 = document.querySelector(".s-hero .c3");

    document.querySelector(".s-hero").addEventListener("mousemove", function (event) {
      mouse.x = event.pageX;
      mouse.y = event.pageY;
      cancelAnimationFrame(request);
      request = requestAnimationFrame(update);
    });

    function update() {
      var dx = mouse.x / -cx;
      var dy = mouse.y / -cy;
      gsap.to(circle1, 0.5, { left: dx * 2, top: dy * 2, ease: "none" });
      gsap.to(circle2, 0.5, { left: dx * 5, top: dy * 5, ease: "none" });
      gsap.to(circle3, 0.5, { left: dx * 15, top: dy * 15, ease: "none" });
    }

    window.addEventListener("resize", function () {
      cx = window.innerWidth;
      cy = window.innerHeight;
    });
  }

  // menu toggle
  $(".header .navbar-toggler").on("click", function () {
    if ($(this).hasClass("active")) {
      const body = document.body;
      const scrollY = body.style.top;
      body.removeAttribute("style");
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      $(this).removeClass("active");
      $(".navigation-main").removeClass("active");
    } else {
      const scrollY = $(window).scrollTop();
      $("body").css({ position: "fixed", top: -scrollY });
      $(this).addClass("active");
      $(".navigation-main").addClass("active");
    }
  });

  // blur images
  const blurDivs = document.querySelectorAll(".blur-mode");

  blurDivs.forEach((div) => {
    const img = div.querySelector("img");

    function loaded() {
      div.classList.add("loaded");

      gsap.to(div, {
        scrollTrigger: {
          trigger: div,
          start: "top center",
          onEnter: function () {
            div.classList.add("in-view");
          },
        },
      });
    }

    if (img.complete) {
      loaded();
    } else {
      img.addEventListener("load", loaded);
    }
  });

  // play video
  $(".btn-play").on("click", function () {
    var videoContainer = $(this).closest(".cp-video"),
      video = videoContainer.find("video").get(0);
    videoContainer.find(".cp-video-description").fadeOut(200);
    videoContainer.find(".cp-video-banner").fadeOut(200, function () {
      videoContainer.find(".cp-video-banner").hide();
      video.play();
    });
    videoContainer.find("video").on("ended", function () {
      videoContainer.find(".cp-video-banner").show();
      videoContainer.find(".cp-video-description").show();
    });
  });

  // news-slider
  if ($(".cp-news-slider").length) {
    const swiperNews = new Swiper(".cp-news-slider .swiper", {
      loop: true,
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 40,
      navigation: {
        nextEl: ".cp-news-slider  .swiper-button-next",
        prevEl: ".cp-news-slider  .swiper-button-prev",
      },
      on: {
        init: function () {
          ScrollTrigger.refresh();
        },
      },
    });
  }

  // news-carousel
  if ($(".cp-news-carousel").length) {
    const swiperNews1 = new Swiper(".cp-news-carousel .swiper", {
      loop: true,
      initialSlide: 1,
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".cp-news-carousel  .swiper-button-next",
        prevEl: ".cp-news-carousel  .swiper-button-prev",
      },
      breakpoints: {
        1280: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
      on: {
        init: function () {
          ScrollTrigger.refresh();
        },
      },
    });
  }

  // product slider
  if ($(".s-product-slider").length) {
    var swiper = new Swiper(".swiper-thumbs", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".swiper-main", {
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
  }

  // quote-slider
  if ($(".cp-quote-slider").length) {
    const swiperQuote = new Swiper(".cp-quote-slider .swiper", {
      loop: true,
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 40,
      navigation: {
        nextEl: ".cp-quote-slider  .swiper-button-next",
        prevEl: ".cp-quote-slider  .swiper-button-prev",
      },
      on: {
        init: function () {
          ScrollTrigger.refresh();
        },
      },
    });
  }

  // authors-carousel
  if ($(".cp-authors-carousel").length) {
    const swiperAuthor = new Swiper(".cp-authors-carousel .swiper", {
      loop: true,
      initialSlide: 1,
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".cp-authors-carousel  .swiper-button-next",
        prevEl: ".cp-authors-carousel  .swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 31,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 31,
        },
      },
      on: {
        init: function () {
          ScrollTrigger.refresh();
        },
      },
    });
  }

  // product-carousel
  if ($(".cp-product-carousel").length) {
    const swiperProduct = new Swiper(".cp-product-carousel .swiper", {
      loop: true,
      initialSlide: 1,
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".cp-product-carousel  .swiper-button-next",
        prevEl: ".cp-product-carousel  .swiper-button-prev",
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: false,
          touchMove: false,
        },
      },
      on: {
        init: function () {
          ScrollTrigger.refresh();
        },
      },
    });
  }

  $(document)
    .on("click", ".btn-read-more", function () {
      $(this).hide();
      $(".s-product-description-hidden").slideDown(300);
    })
    .on("click", ".header-meta-cart", function (e) {
      e.preventDefault();
      $(".s-cart-overlay").fadeIn(300);
    })
    .on("click", ".btn-cart-overlay-close", function () {
      $(".s-cart-overlay").fadeOut(300);
    })
    .on("click", ".s-cart-overlay", function () {
      $(this).fadeOut(300);
    })
    .on("click", ".s-cart-overlay .wrapper", function (e) {
      e.stopPropagation();
    });

  function activePayment() {
    var activeBox;
    $("input[name=payment_method]").each(function () {
      console.log($(this).prop("checked"));
      if ($(this).prop("checked")) {
        activeBox = $(this).closest(".payment-box");
      }
    });
    console.log(activeBox);
    setTimeout(() => {
      $(".payment-box.active").removeClass("active").find(".payment-box-inner").slideUp(200);
      activeBox.addClass("active").find(".payment-box-inner").slideDown(200);
    }, 500);
  }
  if ($("input[name=payment_method]").length) {
    activePayment();
    $("input[name=payment_method]").on("change", function () {
      activePayment();
    });
  }

  $(".num-less").on("click", function () {
    var input = $(this).closest(".cp-cart-item-number").find("input"),
      inputVal = parseInt(input.val());
    if (inputVal > 1) {
      input.val(inputVal - 1);
    }
  });
  $(".num-more").on("click", function () {
    var input = $(this).closest(".cp-cart-item-number").find("input"),
      inputVal = parseInt(input.val());
    input.val(inputVal + 1);
  });

  // read more
  $(".btn-more").on("click", function () {
    $(this).toggleClass("active");
    $(this).next(".text-more-hidden").slideToggle(300);
  });

  $(".cp-filter li a").on("click", function () {
    $(".cp-filter li.active").removeClass("active");
    $(this).parent().addClass("active");
  });

  //HOVER submenu

  $(".sub-menu-2 a").hover(function() {
    let itemIndex = $(this).parent('li').index() + 1;
    $(".sub-menu-2 a").removeClass('is-hover')
    $(this).addClass("is-hover");
    $('.submenu .col-right .item').hide();
    $('.submenu .col-right .item-'+ itemIndex).show();

  });

  /*slider*/
  var swiperEvent = new Swiper(".slider-event", {
    navigation: {
      nextEl: ".event-next",
      prevEl: ".event-prev",
    },
  });

  /*open mob filter*/
  $(document).on('click', '.btn-filter', function (e){
    e.preventDefault();
    $('.s-article-list-v2 .aside').addClass('is-open')
  });

  /*close mob filter*/
  $(document).on('click', '.btn-close-filter', function (e){
    e.preventDefault();
    $('.s-article-list-v2 .aside').removeClass('is-open')
  });


});
