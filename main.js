$(document).ready(function () {

    jQuery(function ($) {
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.min.js",
            function () {
                // alert("Script loaded but not necessarily executed.");

                $.ajax({
                    type: "GET",
                    url: "http://backend.api.com/vitrine/get",
                    headers: {
                        'Content-Type': 'application/json', 'Authorization-Token': 'testtoken'
                    },

                    success: function (data) {

                        console.log(data.resposta);

                        var vitrine = data.resposta;


                        $('#vitrine').append('<div class="swiper-container">' +
                            '    <div class="swiper-wrapper"></div>' +

                            '    <div class="swiper-button-next"></div>\n' +
                            '    <div class="swiper-button-prev"></div>\n' +
                            '    <div class="swiper-pagination"></div>\n' +
                            '    <div class="swiper-scrollbar"></div>\n' +
                            '  </div>');


                        var pagination = vitrine.passIndicator[0].not === 0 ?
                            vitrine.passIndicator[0].line === 0 ? '.swiper-pagination' : null : null;

                        var scrollbar = vitrine.passIndicator[0].not === 0 ?
                            vitrine.passIndicator[0].line === 1 ? '.swiper-scrollbar' : null : null;

                        var autoplay = vitrine.autoLoop === 1 ? {
                            delay: 1000,
                            disableOnInteraction: false
                        } : false;

                        var swiper = new Swiper('.swiper-container', {
                            slidesPerView: vitrine.grid.narrow,
                            spaceBetween: 0,
                            centeredSlides: false,
                            mousewheel: vitrine.mouseWeel === 1,
                            direction: vitrine.indicator[0].vertical ? 'vertical' : 'horizontal',
                            pagination: {
                                el: pagination,
                                clickable: true
                            },
                            autoplay: autoplay,
                            scrollbar: {
                                el: scrollbar,
                                hide: false
                            },
                            navigation: {
                                nextEl: vitrine.arrows === 1 ? '.swiper-button-next' : null,
                                prevEl: vitrine.arrows === 1 ? '.swiper-button-prev' : null
                            },
                            virtual: {
                                slides: (function () {
                                    var slides = [];
                                    for (var i = 0; i < 3; i++) {
                                        slides.push('<p class="text">' +  vitrine.labels[0].attrName + '</p>');
                                    }
                                    return slides;
                                }())
                            }
                        });

                        $(".text").css({
                            "padding-top" : vitrine.labels[0].bottom === 1 ? '35%' : '0%',
                            "padding-bottom" : vitrine.labels[0].top === 1 ? '35%' : '0%',
                            "font-size": vitrine.labels[0].fontSize,
                            'color': vitrine.labels[0].fontColor,
                            "font-family": vitrine.fontFamily
                        });
                    },
                    error: function () {

                    }
                });

            });
    });
});
