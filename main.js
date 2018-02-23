var token;

function Vitrine(usuario, senha) {

    console.log("USUARIO:" + usuario + " SENHA: " + senha);

    $.ajax({
        type: "POST",
        url: "http://backend.api.com/oauth/autenticate",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "email": usuario.toString(),
            "password": senha.toString()
        }),
        success: data => {

            token = data.resposta.access_token;

            init();

        },
        error: () => {

        }
    });


}

function onClickButton(varFunction) {
    $('#button').onclick(varFunction);
}


function init() {
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.min.js",
        function () {
            // alert("Script loaded but not necessarily executed.");

            $.ajax({
                type: "GET",
                url: "http://backend.api.com/vitrine/get",
                headers: {
                    'Content-Type': 'application/json', 'Authorization-Token': token
                },

                success: function (data) {

                    console.log("RESPOSTA DO SERV");
                    console.log(data.resposta);

                    var vitrine = data.resposta;

                    let vitrinePrefs = {};

                    if (vitrine) {

                        $('.vitrine').append('<div id="swiperID" class="swiper-container">' +
                            '    <div class="swiper-wrapper"></div>' +
                            '  </div>');

                        vitrinePrefs.loop = false;

                        let pagination = vitrine.passIndicator[0].not === 0 ?
                            vitrine.passIndicator[0].line === 0 ? {
                                el: '.swiper-pagination',
                                clickable: true
                            } : '' : '';



                        if (pagination !== '') {
                            vitrinePrefs.pagination = pagination;
                            $('#swiperID').append('<div class="swiper-pagination"></div>');
                        }

                        let scrollbar = vitrine.passIndicator[0].not === 0 ?
                            vitrine.passIndicator[0].line === 1 ? {
                                el: '.swiper-scrollbar',
                                hide: false
                            } : '' : '';


                        if (scrollbar !== '') {
                            vitrinePrefs.scrollbar = scrollbar;
                            $('#swiperID').append('<div class="swiper-scrollbar"></div>');
                        }

                        let autoplay = vitrine.autoLoop === 1 ? {
                            delay: 3000,
                            disableOnInteraction: false
                        } : false;


                        if (autoplay !== false) {
                            vitrinePrefs.autoplay = autoplay;
                        }


                        vitrinePrefs.spaceBetween = 0;

                        vitrinePrefs.zoom = vitrine.zoom === 1;

                        vitrinePrefs.mousewheel = vitrine.mouseWeel === 1;

                        vitrinePrefs.direction = vitrine.indicator[0].vertical === 1 ? 'vertical' : 'horizontal';

                        vitrinePrefs.effect = vitrine.effects !== null ? vitrine.effects : "";

                        if (vitrinePrefs.effect === 'coverflow') {
                            vitrinePrefs.centeredSlides = true;
                        } else {
                            vitrinePrefs.centeredSlides = false;
                        }

                        vitrinePrefs.cubeEffect = {
                            shadow: true,
                            slideShadows: true,
                            shadowOffset: 40,
                            shadowScale: 0.90,
                        };

                        vitrinePrefs.coverflowEffect = {
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        };

                        vitrinePrefs.keyboard = vitrine.arrows === 1 ? {
                            enabled: true,
                        } : {
                            enabled: false,
                        };

                        if (vitrine.arrows !== 0) {
                            vitrinePrefs.navigation = {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev'
                            };

                            vitrinePrefs.lazy = 0;

                            vitrinePrefs.spaceBetween = vitrine.grid.spacebetween;



                            if (vitrinePrefs.direction === 'horizontal') {
                                if (vitrine.passIndicator[0].color === "white") {
                                    $('#swiperID').append('<div class="swiper-button-next swiper-button-white"></div>');
                                    $('#swiperID').append('<div class="swiper-button-prev swiper-button-white"></div>');
                                } else if (vitrine.passIndicator[0].color === "black") {
                                    $('#swiperID').append('<div class="swiper-button-next swiper-button-black"></div>');
                                    $('#swiperID').append('<div class="swiper-button-prev swiper-button-black"></div>');
                                } else {
                                    $('#swiperID').append('<div class="swiper-button-next"></div>');
                                    $('#swiperID').append('<div class="swiper-button-prev"></div>');
                                }
                            }
                        }


                    } else {

                        $('.vitrine').append('<div class="swiper-container">' +
                            '    <div class="swiper-wrapper"></div>' +

                            '    <div class="swiper-button-next"></div>\n' +
                            '    <div class="swiper-button-prev"></div>\n' +
                            '    <div class="swiper-pagination"></div>\n' +
                            '    <div class="swiper-scrollbar"></div>\n' +
                            '  </div>');

                        vitrinePrefs = {
                            slidesPerView: 1,
                            spaceBetween: 0,
                            centeredSlides: false,
                            mousewheel: 0,
                            direction: 'horizontal',
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true
                            },
                            autoplay: false,
                            scrollbar: {
                                el: '',
                                hide: false
                            },
                            navigation: {
                                nextEl: vitrine.arrows === 1 ? '.swiper-button-next' : '',
                                prevEl: vitrine.arrows === 1 ? '.swiper-button-prev' : ''
                            }
                        };
                    }


                    $.ajax({
                        type: "POST",
                        url: "http://backend.api.com/objrelacionado/produtos-relacionados/get",
                        headers: {
                            'Content-Type': 'application/json', 'Authorization-Token': 'testtoken'
                        },
                        data: JSON.stringify({
                            "sku": "test1",
                            "limit": 10,
                            "listChave": [{
                                "key": vitrine.labels[0].attrName
                            },
                                {
                                    "key": vitrine.labels[2].attrName
                                }
                            ],
                            "listAtributo": [{
                                "key": vitrine.labels[0].attrName
                            },
                                {
                                    "key": vitrine.labels[1].attrName
                                },
                                {
                                    "key": vitrine.labels[2].attrName
                                },
                                {
                                    "key": "link_imagem"
                                }
                            ]
                        }),
                        success: data => {
                            let resposta = data.resposta;
                            let slides = [];

                            console.log("DADOS AQUI");
                            console.log(resposta);

                            setSwipperSlides(resposta, vitrinePrefs, vitrine);
                        },
                        error: error => {

                        }
                    });
                },
                error: () => {

                }
            });

        });


    function setSwipperSlides(resposta, vitrinePrefs, vitrine) {
        let slides = [];
        resposta.forEach(atributo => {

            let arr = atributo.attributes;
            if(arr[vitrine.labels[1].attrName].length > 100) {
                arr[vitrine.labels[1].attrName] = arr[vitrine.labels[1].attrName].substring(0,99)+"...";
            }

            if(arr[vitrine.labels[0].attrName].length > 30) {
                arr[vitrine.labels[0].attrName] = arr[vitrine.labels[0].attrName].substring(0,29)+"...";
            }
            if (vitrine.grid.typeLayout === 1) {
                slides.push(
                    '<div class="swiper-slide textsSlides" style="height: 100%; width: 100%;">\n' +
                        '<div class="swiper-slide-content" style="width: 100%; height: 100%;">\n' +

                            '<div class="card-background-image" style="background-image:url(' + arr["link_imagem"] + ')">\n' +
                            '</div>\n' +
                            '<div id="cardTexts" class="cardTexts"">\n' +

                                '<p class="text0">' + arr[vitrine.labels[0].attrName] + '</p>\n' +
                                '<p align="center" class="text1">' + arr[vitrine.labels[1].attrName] + '</p>\n' +
                                '<p class="text2">' + arr[vitrine.labels[2].attrName] + '</p>\n' +

                            '</div>\n' +
                        '</div>\n' +
                    '</div>');
            } else {

                slides.push('<div class="swiper-slide textsSlides" style="background-image:url(' + arr["link_imagem"] + ')">' +

                    // '<div data-background="http://lorempixel.com/1600/1200/nature/6/" class="swiper-lazy">\n' +
                    //     '<div class="swiper-lazy-preloader"></div>\n' +
                    '<p class="text0">' + arr[vitrine.labels[0].attrName] + '</p>\n' +
                    '<p class="text1">' + arr[vitrine.labels[1].attrName] + '</p>\n' +
                    '<p class="text2">' + arr[vitrine.labels[2].attrName] + '</p>\n' +
                    // '</div>\n' +
                    '</div>');
            }


        });

        configSwipper(slides, vitrinePrefs, vitrine);


    }

    function configSwipper(slides, vitrinePrefs, vitrine) {
        vitrinePrefs.slidesPerView = vitrine.grid.narrow > slides.length ? slides.length : vitrine.grid.narrow;


        let swiper = new Swiper('.swiper-container', vitrinePrefs);

        swiper.appendSlide(slides);

        $(".text0").css({
            // "padding-bottom": vitrine.labels[1].hide === 1 ? '10%' : '0%',
            "display": vitrine.labels[0].hide === 1 ? 'none' : 'inline-flex',
            "font-size": vitrine.labels[0].fontSize  ,//vitrine.labels[0].fontSize,
            'color': vitrine.labels[0].fontColor,
            "font-family": vitrine.labels[0].fontFamily,
            "padding-left": "15px"
        });
        $(".text1").css({
            // "padding-top": vitrine.labels[2].hide === 0 && vitrine.labels[0].hide === 1 ? '30%' : '0%',
            // "padding-bottom": vitrine.labels[0].hide === 0 ? '30%' : '0%',
            "display": vitrine.labels[1].hide === 1 ? 'none' : 'block',
            "font-size": vitrine.labels[1].fontSize,    //vitrine.labels[1].fontSize,
            'color': vitrine.labels[1].fontColor,
            "font-family": vitrine.labels[1].fontFamily,
            "padding-left": "15px"
        });
        $(".text2").css({
            // "padding-top": vitrine.labels[1].hide === 1 ? '10%' : '0%',
            "display": vitrine.labels[2].hide === 1 ? 'none' : 'inline-flex',
            "font-size": vitrine.labels[2].fontSize,//vitrine.labels[2].fontSize,
            'color': vitrine.labels[2].fontColor,
            "font-family": vitrine.labels[2].fontFamily,
            "padding-left": "15px",
            // "margin-bottom": "50px"
        });

        swiper.update();

        if (vitrinePrefs.autoplay) {
            swiper.autoplay.stop();
            swiper.autoplay.start();
        }
    }
}
