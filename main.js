
$(document).ready(function () {

    jQuery(function ($) {
      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"),
      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.min.js",
      $.getScript("https://rawgit.com/Juliozen/Vitrinie_Wesy/master/main.js"),
      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/css/swiper.min.css"),
      $.getScript("https://rawgit.com/Juliozen/Vitrinie_Wesy/master/vitrine.css"),
      function() {
         // alert("Script loaded but not necessarily executed.");

        $.ajax({
            type: "GET",
            url: "http://backend.api.com/vitrine/get",
            headers: {
                'Content-Type' : 'application/json', 'Authorization-Token' : 'testtoken'
            },

            success: function (data) {


                $('#vitrine').append('<div class="swiper-container">\n' +
                    '    <div class="swiper-wrapper">\n' +
                    '      <div class="swiper-slide">Slide 1</div>\n' +
                    '      <div class="swiper-slide">Slide 2</div>\n' +
                    '      <div class="swiper-slide">Slide 3</div>\n' +
                    '      <div class="swiper-slide">Slide 4</div>\n' +
                    '      <div class="swiper-slide">Slide 5</div>\n' +
                    '      <div class="swiper-slide">Slide 6</div>\n' +
                    '      <div class="swiper-slide">Slide 7</div>\n' +
                    '      <div class="swiper-slide">Slide 8</div>\n' +
                    '      <div class="swiper-slide">Slide 9</div>\n' +
                    '      <div class="swiper-slide">Slide 10</div>\n' +
                    '    </div>\n' +
                    '    <!-- Add Pagination -->\n' +
                    '    <div class="swiper-pagination"></div>\n' +
                    '  </div>');
                    var swiper = new Swiper('.swiper-container', {
                      slidesPerView: 4,
                      spaceBetween: 30,
                      centeredSlides: true,
                      pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                      },
                    });
            },
            error: function () {

            }
        });

    });
  });
});
