$(document).ready(function () {

    jQuery(function ($) {
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
            },
            error: function () {

            }
        });
    });

});
