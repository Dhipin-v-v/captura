(function($) {
  "use strict";

  // Css Function Js
  const bgSelector = $("[data-bg-img]");
  bgSelector.each(function (index, elem) {
    let element = $(elem),
      bgSource = element.data('bg-img');
    element.css('background-image', 'url(' + bgSource + ')');
  });

  const Bgcolorcl = $("[data-bg-color]");
  Bgcolorcl.each(function (index, elem) {
    let element = $(elem),
      Bgcolor = element.data('bg-color');
    element.css('background-color', Bgcolor);
  });

  // Responsive Menu
  var $offcanvasNav = $("#offcanvasNav a");
  $offcanvasNav.on("click", function () {
    var link = $(this);
    var closestUl = link.closest("ul");
    var activeLinks = closestUl.find(".active");
    var closestLi = link.closest("li");
    var linkStatus = closestLi.hasClass("active");
    var count = 0;

    closestUl.find("ul").slideUp(function () {
      if (++count == closestUl.find("ul").length)
        activeLinks.removeClass("active");
    });

    if (!linkStatus) {
      closestLi.children("ul").slideDown();
      closestLi.addClass("active");
    }
  });

  // Menu Activeion Js
  var cururl = window.location.pathname;
  var curpage = cururl.substr(cururl.lastIndexOf('/') + 1);
  var hash = window.location.hash.substr(1);
  if((curpage === "" || curpage === "/" || curpage === "admin") && hash === "")
    {
    } else {
      $(".header-navigation li").each(function()
    {
      $(this).removeClass("active");
    });
    if(hash != "")
      $(".header-navigation li a[href='"+hash+"']").parents("li").addClass("active");
    else
    $(".header-navigation li a[href='"+curpage+"']").parents("li").addClass("active");
  }

  // Vertical Menu Js
  const $btnMenu = $(".vmenu-btn");
  const $vmenuContent = $(".vmenu-content");
  $btnMenu.on("click", function (event) {
    $vmenuContent.slideToggle(500);
  });

  $vmenuContent.each(function () {
    var $ul = $(this),
      $lis = $ul.find(".vmenu-item:gt(08)"),
      isExpanded = $ul.hasClass("expanded");
    $lis[isExpanded ? "show" : "hide"]();

    if ($lis.length > 0) {
      $ul.append(
        $(
          '<li class="expand">' +
            (isExpanded
              ? '<a class="minus" href="javascript:void(0);"><span>- Close Categories</span></a>'
              : '<a href="javascript:void(0);"><span>+ More Categories</span></a>') +
            "</li>"
        ).on("click", function (event) {
          var isExpanded = $ul.hasClass("expanded");
          event.preventDefault();
          $(this).html(
            isExpanded
              ? '<a href="javascript:void(0);"><span>+ More Categories</span></a>'
              : '<a class="minus" href="javascript:void(0);"><span>- Close Categories</span></a>'
          );
          $ul.toggleClass("expanded");
          $lis.toggle(300);
        })
      );
    }
  });

  // Swiper Hero Slider One JS
  var mainlSlider = new Swiper('.hero-slider-container', {
    slidesPerView : 1,
    slidesPerGroup: 1,
    loop: true,
    speed: 700,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    }
  });

  // Swiper Hero Slider Two JS
  var mainlSliderTwo = new Swiper('.hero-two-slider-container', {
    slidesPerView : 1,
    slidesPerGroup: 1,
    loop: true,
    speed: 700,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    }
  });

  // Swiper Hero Slider Three JS
  var mainlSliderThree = new Swiper('.hero-three-slider-container', {
    slidesPerView : 1,
    slidesPerGroup: 1,
    loop: true,
    speed: 700,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    }
  });

  // Swiper Hero Slider Four JS
  var mainlSliderThree = new Swiper('.hero-four-slider-container', {
    slidesPerView : 1,
    slidesPerGroup: 1,
    loop: true,
    speed: 700,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    }
  });

  // Swiper Hero Slider Five JS
  var mainlSliderThree = new Swiper('.hero-five-slider-container', {
    slidesPerView : 1,
    slidesPerGroup: 1,
    loop: true,
    speed: 700,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.hero-slide-five-pagination',
      clickable: 'true',
    }
  });

  // Swiper Hero Slider Six JS
  var mainlSliderTwo = new Swiper('.hero-six-slider-container', {
    slidesPerView : 1,
    slidesPerGroup: 1,
    loop: true,
    speed: 700,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.hero-slide-six-pagination',
      clickable: 'true',
    }
  });

  // Product Slider Js
  var productSlider = new Swiper('.product-slider-container', {
    autoplay: false,
    slidesPerView : 5,
    spaceBetween: 0,
    loop: true,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 5,
      },
      992: {
        slidesPerView : 4,
      },
      768: {
        slidesPerView : 3,
      },
      576: {
        slidesPerView : 2,
      },
      480: {
        slidesPerView : 2,
      },
      0: {
        slidesPerView : 1,
      },
    },
    navigation: {
      nextEl: '.swiper-button-style1 .swiper-button-next',
      prevEl: '.swiper-button-style1 .swiper-button-prev',
    },
  });

  // Product Slider Js
  var productSlider = new Swiper('.product-slider-two-container', {
    autoplay: false,
    slidesPerView : 4,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 4,
      },
      992: {
        slidesPerView : 3,
      },
      768: {
        slidesPerView : 2,
      },
      576: {
        slidesPerView : 2,
      },
      480: {
        slidesPerView : 2,
      },
      0: {
        slidesPerView : 1,
      },
    },
    navigation: {
      nextEl: '.swiper-button-style4 .swiper-button-next',
      prevEl: '.swiper-button-style4 .swiper-button-prev',
    },
  });

  // Product Slider Js
  var productSlider = new Swiper('.product-slider-three-container', {
    autoplay: false,
    slidesPerView : 3,
    spaceBetween: 0,
    loop: true,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 3,
      },
      768: {
        slidesPerView : 3,
      },
      576: {
        slidesPerView : 2,
      },
      480: {
        slidesPerView : 2,
      },
      0: {
        slidesPerView : 1,
      },
    },
    navigation: {
      nextEl: '.swiper-button-style6 .swiper-button-next',
      prevEl: '.swiper-button-style6 .swiper-button-prev',
    },
  });

  // Product Slider Js
  var productSlider = new Swiper('.product-slider-four-container', {
    autoplay: false,
    slidesPerView : 4,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 4,
      },
      992: {
        slidesPerView : 3,
      },
      768: {
        slidesPerView : 2,
      },
      576: {
        slidesPerView : 2,
      },
      480: {
        slidesPerView : 2,
      },
      0: {
        slidesPerView : 1,
      },
    },
    navigation: {
      nextEl: '.swiper-button-style7 .swiper-button-next',
      prevEl: '.swiper-button-style7 .swiper-button-prev',
    },
  });

  // Product Tab Slider Js
  var productSlider = new Swiper('.product-tab-one-slider', {
    autoplay: false,
    slidesPerView : 4,
    spaceBetween: 0,
    loop: true,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 4,
      },
      768: {
        slidesPerView : 3,
      },
      576: {
        slidesPerView : 2,
      },
      480: {
        slidesPerView : 2,
      },
      0: {
        slidesPerView : 1,
      },
    },
    navigation: {
      nextEl: '.swiper-button-style5 .swiper-button-next',
      prevEl: '.swiper-button-style5 .swiper-button-prev',
    },
  });

  // Product Tab Slider Js
  var productSlider = new Swiper('.product-tab-two-slider', {
    autoplay: false,
    slidesPerView : 6,
    spaceBetween: 26,
    loop: true,
    speed: 500,
    breakpoints: {
      1700: {
        slidesPerView : 6,
      },
      1400: {
        slidesPerView : 5,
      },
      1200: {
        slidesPerView : 4,
      },
      992: {
        slidesPerView : 3,
      },
      768: {
        slidesPerView : 3,
      },
      576: {
        slidesPerView : 2,
      },
      480: {
        slidesPerView : 2,
      },
      0: {
        slidesPerView : 1,
      },
    },
    navigation: {
      nextEl: '.swiper-button-style10 .swiper-button-next',
      prevEl: '.swiper-button-style10 .swiper-button-prev',
    },
  });

  // Product Categories Slider Js
  var productSlider = new Swiper('.product-categories-slider', {
    autoplay: false,
    slidesPerView : 6,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 6,
      },
      768: {
        slidesPerView : 4,
      },
      576: {
        slidesPerView : 3,
      },
      480: {
        slidesPerView : 3,
      },
      0: {
        slidesPerView : 2,
      },
    },
  });

  // Product Categories Slider Js
  var productSlider = new Swiper('.product-categories-two-slider', {
    autoplay: false,
    slidesPerView : 8,
    slidesPerGroup: 2,
    spaceBetween: 95,
    loop: true,
    speed: 500,
    breakpoints: {
      1600: {
        slidesPerView : 8,
      },
      1200: {
        slidesPerView : 6,
      },
      992: {
        slidesPerView : 5,
      },
      768: {
        slidesPerView : 4,
      },
      576: {
        slidesPerView : 3,
        spaceBetween: 95
      },
      480: {
        slidesPerView : 3,
        spaceBetween: 30
      },
      0: {
        slidesPerView : 2,
      },
    },
    pagination: {
      el: '.categories-two-slider-pagination .swiper-pagination-style1',
      clickable: 'true',
    },
  });

  // Product Categories Slider Js
  var productSlider = new Swiper('.product-categories-three-slider', {
    autoplay: false,
    slidesPerView : 6,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    breakpoints: {
      1600: {
        slidesPerView : 6,
      },
      992: {
        slidesPerView : 5,
      },
      768: {
        slidesPerView : 4,
      },
      576: {
        slidesPerView : 3,
      },
      480: {
        slidesPerView : 3,
      },
      0: {
        slidesPerView : 2,
      },
    },
  });

  // Product Slider Js
  var productSlider = new Swiper('.product-daily-deals-slider', {
    autoplay: false,
    slidesPerView : 1,
    loop: true,
    speed: 500,
    navigation: {
      nextEl: '.swiper-button-style3 .swiper-button-next',
      prevEl: '.swiper-button-style3 .swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView : 1,
        spaceBetween: 30
      },
      768: {
        slidesPerView : 2,
        spaceBetween: 30
      },
      576: {
        slidesPerView : 2,
        spaceBetween: 30
      },
      480: {
        slidesPerView : 2,
        spaceBetween: 15
      },
      0: {
        slidesPerView : 1,
      },
    },
  });

  // Product Categories Slider Js
  var productSlider = new Swiper('.product-daily-deals-two-slider', {
    autoplay: false,
    slidesPerView : 4,
    slidesPerGroup: 1,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 4,
      },
      768: {
        slidesPerView : 3,
      },
      576: {
        slidesPerView : 2,
      },
      480: {
        slidesPerView : 2,
      },
      0: {
        slidesPerView : 1,
      },
    },
    pagination: {
      el: '.product-daily-deals-two-slider-pagination .swiper-pagination-style1',
      clickable: 'true',
    },
  });

  // Product Slider Js
  var productSlider = new Swiper('.product-daily-deals-three-slider', {
    autoplay: false,
    slidesPerView : 1,
    loop: true,
    speed: 500,
    navigation: {
      nextEl: '.swiper-button-style3 .swiper-button-next',
      prevEl: '.swiper-button-style3 .swiper-button-prev',
    },
    breakpoints: {
      1200: {
        slidesPerView : 1,
        spaceBetween: 30
      },
      992: {
        slidesPerView : 2,
        spaceBetween: 30
      },
      768: {
        slidesPerView : 2,
        spaceBetween: 30
      },
      576: {
        slidesPerView : 2,
        spaceBetween: 30
      },
      480: {
        slidesPerView : 2,
        spaceBetween: 15
      },
      0: {
        slidesPerView : 1,
        spaceBetween: 15
      },
    },
  });

  // Product Slider Js
  var productSlider = new Swiper('.related-product-slider', {
    autoplay: false,
    slidesPerView : 4,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 4,
      },
      992: {
        slidesPerView : 3,
      },
      768: {
        slidesPerView : 2,
      },
      576: {
        slidesPerView : 2,
      },
      480: {
        slidesPerView : 2,
      },
      0: {
        slidesPerView : 1,
      },
    },
  });

  // Product Details Slider Nav
  var productNav = new Swiper('.single-product-nav-slider', {
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-style11 .swiper-button-next',
      prevEl: '.swiper-button-style11 .swiper-button-prev',
    },
  });

  // Product Details Slider Thumb
  var productThumb = new Swiper('.single-product-thumb-slider', {
    slidesPerView: 1,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-style11 .swiper-button-next',
      prevEl: '.swiper-button-style11 .swiper-button-prev',
    },
    thumbs: {
      swiper: productNav
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  });

  // Product Modal Slider
  var ProductThumb = new Swiper('.single-product-quick-view-slider', {
    slidesPerView : 1,
    loop: true,
    speed: 1000,
    spaceBetween : 0,
    autoplay: false,
    navigation: {
      nextEl: '.single-product-quick-view-slider .swiper-button-next',
      prevEl: '.single-product-quick-view-slider .swiper-button-prev',
    },
    freeMode: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    }
  });

  // Testimonial Slider Js
  var testimonialSlider = new Swiper('.testimonial-slider-container', {
    autoplay: false,
    slidesPerView : 3,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    breakpoints: {
      992: {
        slidesPerView : 3,
        spaceBetween: 45,
      },
      768: {
        slidesPerView : 2,
        spaceBetween: 45,
      },
      576: {
        slidesPerView : 2,
      },
      480: {
        slidesPerView : 1,
      },
      0: {
        slidesPerView : 1,
      },
    },
    navigation: {
      nextEl: '.swiper-button-style2 .swiper-button-next',
      prevEl: '.swiper-button-style2 .swiper-button-prev',
    },
  });

  // Brand Logo Slider Js
  var brandLogoSlider = new Swiper('.brand-logo-slider-container', {
    autoplay: false,
    loop: true,
    slidesPerView : 5,
    spaceBetween: 0,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 5,
      },
      768: {
        slidesPerView : 4,
      },
      576: {
        slidesPerView : 3,
      },
      480: {
        slidesPerView : 3,
      },
      0: {
        slidesPerView : 2,
      },
    },
    navigation: {
      nextEl: '.swiper-button-style8 .swiper-button-next',
      prevEl: '.swiper-button-style8 .swiper-button-prev',
    },
  });

  // Brand Logo Slider Js
  var brandLogoSlider = new Swiper('.brand-logo-two-slider-container', {
    autoplay: false,
    loop: true,
    slidesPerView : 7,
    spaceBetween: 0,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 7,
      },
      768: {
        slidesPerView : 5,
      },
      576: {
        slidesPerView : 3,
      },
      480: {
        slidesPerView : 3,
      },
      0: {
        slidesPerView : 2,
      },
    },
    navigation: {
      nextEl: '.swiper-button-style8 .swiper-button-next',
      prevEl: '.swiper-button-style8 .swiper-button-prev',
    },
  });

  // Gallery Slider Js
  var gallerySlider = new Swiper('.gallery-slider-container', {
    autoplay: false,
    loop: true,
    slidesPerView : 6,
    spaceBetween: 0,
    speed: 500,
    breakpoints: {
      1200: {
        slidesPerView : 6,
      },
      768: {
        slidesPerView : 4,
      },
      576: {
        slidesPerView : 3,
      },
      480: {
        slidesPerView : 3,
      },
      0: {
        slidesPerView : 2,
      },
    },
    navigation: {
      nextEl: '.swiper-button-style9 .swiper-button-next',
      prevEl: '.swiper-button-style9 .swiper-button-prev',
    },
  });

  // Countdown Js
  $('[data-countdown]').each(function () {
    var $this = $(this),
    $finalDate = $this.data('countdown');
    $this.countdown($finalDate, function (event) {
      $this.html(event.strftime('<div class="count"><span class="amount">%-D</span><span class="period">D<span class="period-desc">ays</span></span></div><div class="count"><span class="amount">%-H</span><span class="period">H<span class="period-desc">RS</span></span></div><div class="count"><span class="amount">%-M</span><span class="period">M<span class="period-desc">IN</span></span></div><div class="count"><span class="amount">%-S</span><span class="period">S<span class="period-desc">EC</span></span></div>'));
    });
  });

  // Mouse Move Parallax
  document.addEventListener("mousemove", parallax);
    function parallax(e) {
    if(window.innerWidth >= 768){
      this.querySelectorAll('.mousemove-layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed)/80;
        const y = (window.innerHeight - e.pageY * speed)/80;
        layer.style = `transform: translateX(${x}px) translateY(${y}px) !important`;
      })
    }
  }

  // Checkout Toggle Active
  $('.checkout-coupon-active').on('click', function(e) {
    e.preventDefault();
    $('.checkout-coupon-content').slideToggle(1000);
  });

  //Checkout Page Checkbox Accordion
  $("#create_pwd").on("change", function() {
    $(".account-create").slideToggle("100");
  });

  $("#ship_to_different").on("change", function() {
    $(".ship-to-different").slideToggle("100");
  });

  $('.checkout-toggle').on('click', function() {
    $('.open-toggle').slideToggle(1000);
  });

  var checked = $( '.sin-payment input:checked' )
  if(checked){
    $(checked).siblings( '.payment-box' ).slideDown(900);
  };
  $( '.sin-payment input' ).on('change', function() {
    $( '.payment-box' ).slideUp(900);
    $(this).siblings( '.payment-box' ).slideToggle(900);
  });

  // Nice Select JS
  $('select').niceSelect();

  // Isotope and data filter
  function isotopeMasonry() {
    // Isotope filter Menu
    $('.masonry-filter-menu').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $itemMasonry.isotope({ filter: filterValue });
      var filterMenuactive = $(".masonry-filter-menu button");
      filterMenuactive.removeClass('active');
      $(this).addClass('active');
    });

    // Masonry Grid
    var $itemMasonry = $(".masonryGrid").isotope({
      itemSelector: '.masonry-item'
    });
  }

  // Product Quantity JS
  var proQty = $(".pro-qty");
  proQty.append('<div class= "dec qty-btn">-</div>');
  proQty.append('<div class="inc qty-btn">+</div>');
  $('.qty-btn').on('click', function (e) {
    e.preventDefault();
    var $button = $(this);
    var oldValue = $button.parent().find('input').val();
    if ($button.hasClass('inc')) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 1) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 1;
      }
    }
    $button.parent().find('input').val(newVal);
  });

  // Ajax Contact Form JS
  var form = $('#contact-form');
  var formMessages = $('.form-message');

  $(form).submit(function(e) {
    e.preventDefault();
    var formData = form.serialize();
    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: formData
    }).done(function(response) {
      // Make sure that the formMessages div has the 'success' class.
      $(formMessages).removeClass('alert alert-danger');
      $(formMessages).addClass('alert alert-success fade show');

      // Set the message text.
      formMessages.html("<button type='button' class='btn-close' data-bs-dismiss='alert'>&times;</button>");
      formMessages.append(response);

      // Clear the form.
      $('#contact-form input,#contact-form textarea').val('');
    }).fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      $(formMessages).removeClass('alert alert-success');
      $(formMessages).addClass('alert alert-danger fade show');

      // Set the message text.
      if (data.responseText === '') {
        formMessages.html("<button type='button' class='btn-close' data-bs-dismiss='alert'>&times;</button>");
        formMessages.append(data.responseText);
      } else {
        $(formMessages).text('Oops! An error occurred and your message could not be sent.');
      }
    });
  });

  // Scroll Top Hide Show
  var varWindow = $(window);
  varWindow.on('scroll', function(){
    if ($(this).scrollTop() > 250) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  //Scroll To Top Animate
  $('.scroll-to-top').on('click', function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
  });

  // When document is loading, do  
  varWindow.on('load', function() {
    isotopeMasonry();
  });


})(window.jQuery);