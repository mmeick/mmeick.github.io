function setupMainSlideShow() {
  var slideDuration = 400;

  $("#main-slideshow").on("init", function(slick) {
    TweenMax.to($("#main-slideshow .slick-track"), 0.4, {
      marginLeft: 0
    });
    TweenMax.to($("#main-slideshow .slick-active"), 0.4, {
      x: 0,
      zIndex: 2
    });
    $("#main-slideshow .video-background")[0].play();
    console.log("played");
  });
  // On before slide change
  $("#main-slideshow").on("beforeChange", function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    TweenMax.to($("#main-slideshow .slick-track"), 0.4, {
      marginLeft: 0
    });
    TweenMax.to($("#main-slideshow .slick-active"), 0.4, {
      x: 0
    });
  });

  // On after slide change
  $("#main-slideshow").on("afterChange", function(event, slick, currentSlide) {
    TweenMax.to($("#main-slideshow .slick-track"), 0.4, {
      marginLeft: 0
    });
    $("#main-slideshow .slick-slide").css("z-index", "1");
    TweenMax.to($("#main-slideshow .slick-active"), 0.4, {
      x: 0,
      zIndex: 2
    });
  });

  $("#main-slideshow").slick({
    centerMode: true,
    centerPadding: "20px",
    slidesToShow: 1,
    speed: slideDuration,
    autoplay: false,
    autoplaySpeed: 8000,
    waitForAnimate: true,
    useTransform: true,
    cssEase: "cubic-bezier(0.455, 0.030, 0.130, 1.000)",

    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "10px",
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "10px",
          slidesToShow: 1
        }
      }
    ]
  });

  //PREV
  $("#main-slideshow .slick-prev").on("mouseenter", function() {
    TweenMax.to($(".slick-track"), 0.6, {
      marginLeft: "20px",
      ease: Quad.easeOut
    });
    TweenMax.to($(".slick-current"), 0.6, {
      x: -0,
      ease: Quad.easeOut
    });
  });

  $("#main-slideshow .slick-prev").on("mouseleave", function() {
    TweenMax.to($(".slick-track"), 0.4, {
      marginLeft: 0,
      ease: Sine.easeInOut
    });
    TweenMax.to($(".slick-current"), 0.4, {
      x: 0,
      ease: Sine.easeInOut
    });
  });

  //NEXT
  $("#main-slideshow .slick-next").on("mouseenter", function() {
    TweenMax.to($("#main-slideshow .slick-track"), 0.6, {
      marginLeft: "-20px",
      ease: Quad.easeOut
    });
    TweenMax.to($("#main-slideshow .slick-current"), 0.6, {
      x: 0,
      ease: Quad.easeOut
    });
  });

  $("#main-slideshow .slick-next").on("mouseleave", function() {
    TweenMax.to($("#main-slideshow .slick-track"), 0.4, {
      marginLeft: 0,
      ease: Quad.easeInOut
    });
    TweenMax.to($("#main-slideshow .slick-current"), 0.4, {
      x: 0,
      ease: Quad.easeInOut
    });
  });
}

var scrollPos = 0;
var lastOpened = "null";
//var currentPage = "null"

//setupMainSlideShow();
//setupSlides(lastOpened);
openPage("#home");

/* OPEN PAGE */
function openPage(name) {
  console.log("name of open page", name);

  destroySlides(lastOpened);

  $(lastOpened).fadeOut("slow");
  $(name).fadeIn("slow");

  lastOpened = name;
  setupSlides(name);

  if (name == "#home") {
    setupMainSlideShow();
  }

  if (name == "#resume") {
    $("#logo").addClass("color");
  } else {
    $("#logo").removeClass("color");
  }

  if (name == "#contact") {
    $("#logo").addClass("color");
  } else {
    $("#logo").removeClass("color");
  }

  $(window).scrollTop(0);

  //history.pushState("", document.title, window.location.pathname + window.location.search);
}

$(".link").on("click", function(e) {
  //e.preventDefault();

  //lastOpened = window.location.hash;

  var value = $(this).prop("hash");

  //console.log("value", value);

  //history.pushState( { article_id: 0, article: value }, null, value);

  //scrollPos = $(document).scrollTop();

  if (value == lastOpened) {
    $("#check1").prop("checked", false);
  } else {
    console.log("hash of link", value);
    openPage(value);
  }
});
function destroySlides(lastOpened) {
  $(lastOpened + " .slide-container").each(function(idx, item) {
    $(this).slick("unslick");
  });
  if (lastOpened == "#home") {
    $("#main-slideshow").slick("unslick");
  }
}

function setupSlides(name) {
  var numSlick = 0;

  $(name + " .slide-container").each(function(idx, item) {
    numSlick++;
    var carouselId = name.substring(1) + "carousel" + idx;
    this.id = carouselId;
    slideCount = null;
    indv = $(this).addClass("slider-" + numSlick);
    prev_next = $(this).find(".prev_next");

    //console.log("hello", idx);

    indv.on("init", function(event, slick) {
      //console.log('initiated', this);
      slideCount = slick.slideCount;

      setSlideCount(slideCount);

      //console.log("currentslide", slick.currentSlide);

      setCurrentSlideNumber(slick.currentSlide);
      /*
  slideCount = slick.slideCount;
  setSlideCount();
  setCurrentSlideNumber(slick.currentSlide);
  */
      if ($(this).find("#vid").length > 0) {
        // $('#vid').play();
        //console.log("you did it", this);
      }
    });

    indv.slick({
      slide: "#" + carouselId + " .slide",
      autoplay: false,
      autoplaySpeed: 10000,
      slidesToShow: 1,
      arrows: true,
      speed: 250,
      fade: true,
      cssEase: "linear",
      swipe: true,
      swipeToSlide: true,
      touchThreshold: 10,
      focusOnSelect: false,
      accessibility: false,
      appendArrows: "#" + carouselId + " .prev_next",
      prevArrow: '<a class="slick-prev">Previous</a>',
      nextArrow: '<a class="slick-next">Next</a>'
    });

    indv.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
      var slider = $(this);
      // console.log("this", slider);
      setCurrentSlideNumber(nextSlide);
      // slideCount = slick.slideCount;

      // setSlideCount();
      //setCurrentSlideNumber(slick.currentSlide);
      if ($("#" + carouselId ).find(".slick-current .vid").length > 0) {
        $(slick.$slides[currentSlide]).find("video").trigger('pause');
      }
       if ($("#" + carouselId ).find(".slick-current .video").length > 0) {
        var video = $(slick.$slides[currentSlide]).find(".vid").attr("src");
      $(slick.$slides[currentSlide]).find(".vid").attr("src","");
      $(slick.$slides[currentSlide]).find(".vid").attr("src",video);
          console.log("hi there");
      };
    });

    indv.on("afterChange", function(event, slick, currentSlide) {
      if ($(".slick-current .vid").length > 0) {
        $(".vid")[0].play();
      }
    });

    indv.on("click", function(event, slick, currentSlide, nextSlide) {
      var slider = $(this);
      //slider.slick("slickNext");
    });

    function setSlideCount(slideCount) {
      var $el = $("#" + carouselId + " .slide-count-wrap").find(".total");
      $el.text(slideCount);
    }

    function setCurrentSlideNumber(currentSlide) {
      var $el = $("#" + carouselId + " .slide-count-wrap").find(".current");
      $el.text(currentSlide + 1);
    }
  });
}

// menu start

$("#check1").click(function() {
  if ($(this).is(":checked")) {
    $("html, body").css("overflowY", "hidden");
  } else {
    $("html, body").css("overflowY", "auto");
  }
});

$("#menu .link").click(function(e) {
  //e.preventDefault();
  $("#check1").prop("checked", false);
  $("html, body").css("overflowY", "auto");
});

$(".header .logo").click(function(e) {
  //e.preventDefault();
  //history.pushState("", document.title, window.location.pathname + window.location.search);
  //lastOpened = window.location.hash;
  history.pushState("", document.title, window.location.pathname);
  openPage("#home");
  // history.replaceState(undefined, undefined, "#home")

  //$('#check1').prop('checked', false);
  //$('html, body').css('overflowY', 'auto');
});

$("#menu .logo").click(function(e) {
  //e.preventDefault();
  //history.pushState("", document.title, window.location.pathname + window.location.search);
  //lastOpened = window.location.hash;
  history.pushState("", document.title, window.location.pathname);
  openPage("#home");

  $("#check1").prop("checked", false);
  $("html, body").css("overflowY", "auto");
  // history.replaceState(undefined, undefined, "#home")
});

window.onpopstate = function(event) {
  // var content = "";
  console.log("Popped!");
  console.log("popped last opened", lastOpened);

  if (lastOpened == "null") {
    openPage("#home");
  } else {
    //history.back(); // openPage(lastOpened); //REPLACE WITH GO BACK ONE IN HISTORY
    openPage(lastOpened);
  }
};

if (window.location.hash) {
  var hash = window.location.hash; // .substring(1); Puts hash in variable, and removes the # character
  console.log("Hash Found!", hash);
  // hash found
  if (hash == lastOpened) {
  } else {
    openPage(hash);
  }
} else {
  // No hash found
  //openPage("#home");
  //history.pushState("", document.title, window.location.pathname + window.location.search);
}

$(window).on("load", function() {
  setTimeout(function() {
    $(".loader").fadeOut();
  }, 0);
});

$(window).scroll(function() {
  $("#digital .vid").each(function() {
    if ($(window).scrollTop() > $(this).offset().top - 200) {
      $(this)[0].play();
    } else {
      $(this)[0].pause();
      $(this)[0].currentTime = 0;
    }
  });
});

$(window).bind("beforeunload", function() {
  //save info somewhere
  e.preventDefault();
});
