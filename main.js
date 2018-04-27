var token;


var $j = jQuery.noConflict();

// function Vitrine(usuario, senha) {

//     console.log("USUARIO:" + usuario + " SENHA: " + senha);

//     $j.ajax({
//         type: "POST",
//         url: "http://backend.api.com/oauth/autenticate",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         data: JSON.stringify({
//             "email": usuario.toString(),
//             "password": senha.toString()
//         }),
//         success: data => {

//             token = data.resposta.access_token;

//             init();

//         },
//         error: () => {
//         }

//     });
// }

// function verifyUserAndType(url){
//     .ajax({
//         type: "POST",
//         url: "http://backend.api.com/user/typelayout",
//         headers: {
//             'Content-Type': 'application/json, url: base/ windown.load'
//         },
//         success: data => {

//             token = data.resposta.access_token;
//             layoutType = sadsa;
//             searchType = adssa;
//             init();

//         },
//         error: () => {
//         }
// }
function Vitrine(tk) {

    console.log("tk:" + tk);

    token = tk;
    console.log(token);
    init();
}



function onClickButton(varFunction) {
    $j('#button').onclick(varFunction);
}


function init() {
    $j.get("https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.min.js", () => {

        // alert(" loaded but not necessarily executed.");

        firebase.initializeApp({
            apiKey: "AIzaSyBeKDfUngI4aYbIIm-yM-mXtA2PLktBDsc",
            authDomain: "suaview-e4ea1.firebaseapp.com",
            databaseURL: "https://suaview-e4ea1.firebaseio.com",
            projectId: "suaview-e4ea1",
            storageBucket: "suaview-e4ea1.appspot.com",
            messagingSenderId: "577146762908"
        });

        let db = firebase.firestore();

        db.collection('SuaView').doc('Layout').collection('julio@julietes.com').get().then((querySnapshot) => {

            querySnapshot.forEach((doc) => {


                console.log("RESPOSTA DO SERV");

                let vitrine = doc.data();

                console.log("LAYOUT: ",vitrine);
                let vitrinePrefs = {};

                if (vitrine) {

                    $j('#vitrine').append('<div id="swiperID" class="swiper-container">' +
                        '    <div class="swiper-wrapper"></div>' +
                        '  </div>');

                    vitrinePrefs.loop = false;

                    let pagination = vitrine.passIndicator.not === 0 ?
                        vitrine.passIndicator.line === 0 ? {
                            el: '.swiper-pagination',
                            clickable: true
                        } : '' : '';

                    if (pagination !== '') {
                        vitrinePrefs.pagination = pagination;
                        $j('#swiperID').append('<div class="swiper-pagination"></div>');
                    }

                    let scrollbar = vitrine.passIndicator.not === 0 ?
                        vitrine.passIndicator.line === 1 ? {
                            el: '.swiper-scrollbar',
                            hide: false
                        } : '' : '';


                    if (scrollbar !== '') {
                        vitrinePrefs.scrollbar = scrollbar;
                        $j('#swiperID').append('<div class="swiper-scrollbar"></div>');
                    }

                    let autoplay = vitrine.autoLoop === 1 ? {
                        delay: 1000,
                        disableOnInteraction: false
                    } : false;


                    if (autoplay !== false) {
                        vitrinePrefs.autoplay = autoplay;
                    }


                    // vitrinePrefs.autoHeight = false;

                    vitrinePrefs.spaceBetween = 0;

                    vitrinePrefs.zoom = vitrine.zoom === 1;

                    vitrinePrefs.mousewheel = vitrine.mouseWeel === 1;

                    vitrinePrefs.direction = vitrine.indicator.vertical === 1 ? 'vertical' : 'horizontal';

                    vitrinePrefs.effect = vitrine.effects !== null ? vitrine.effects : "";

                    vitrinePrefs.loop = vitrine.flowGallery;

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
                            if (vitrine.passIndicator.color === "white") {
                                $j('#swiperID').append('<div class="swiper-button-next swiper-button-white"></div>');
                                $j('#swiperID').append('<div class="swiper-button-prev swiper-button-white"></div>');
                            } else if (vitrine.passIndicator.color === "black") {
                                $j('#swiperID').append('<div class="swiper-button-next swiper-button-black"></div>');
                                $j('#swiperID').append('<div class="swiper-button-prev swiper-button-black"></div>');
                            } else {
                                $j('#swiperID').append('<div class="swiper-button-next"></div>');
                                $j('#swiperID').append('<div class="swiper-button-prev"></div>');
                            }
                        }


                    } else {

                        $j('#vitrine').append('<div class="swiper-container">' +
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


                    $j.ajax({
                        type: "POST",
                        url: "http://backend.api.com/objrelacionado/produtos-relacionados/get",
                        headers: {
                            'Content-Type': 'application/json', 'Authorization-Token': token
                        },
                        data: JSON.stringify({
                            "sku": "OST-PE-AV2200",
                            "limit": 10,
                            "listChave": [{
                                "key": 'description'
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
                                }

                            ]
                        }),
                        success: data => {
                            let resposta = data.resposta;
                            let slides = [];

                            console.log("DADOS AQUI");
                            console.log(resposta);
                             console.log(data);

                            setSwipperSlides(resposta, vitrinePrefs, vitrine);
                        },
                        error: error => {

                        }
                    });
                }
            });
        });


    });
}


function setSwipperSlides(resposta, vitrinePrefs, vitrine) {
    let slides = [];
    resposta.forEach(atributo => {
        let arr = atributo.chaves;

        console.log("Atributos: ", atributo.chaves);
        console.log("AttrName: ", vitrine.labels);
        if (arr[vitrine.labels[1].attrName].length > 100) {
            arr[vitrine.labels[1].attrName] = arr[vitrine.labels[1].attrName].substring(0, 99) + "...";
        }
        if (vitrine.grid.typeLayout === 1) {
            slides.push(
                '<div class="swiper-slide textsSlides" style="height: 100%; width: 100%;">\n' +
                '<div class="swiper-slide-content" style="width: 100%; height: 100%;">\n' +

                '<div class="card-background-image" style="background-image:url(' + arr["image_link"] + ')">\n'
                +
                '</div>\n' +
                '<div id="cardTexts">\n' +

                '<p class="text0">' + arr[vitrine.labels[0].attrName] + '</p>\n' +
                '<p align="center" class="text1">' + arr[vitrine.labels[1].attrName] + '</p>\n' +
                '<p class="text2">' + arr[vitrine.labels[2].attrName] + '</p>\n' +

                '</div>\n' +
                '</div>\n' +
                '</div>');
        } else {

            slides.push('<div class="swiper-slide textsSlides" style="background-image:url(' + arr["image_link"] + ')">' +

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
    console.log("entra cara")
    vitrinePrefs.slidesPerView = vitrine.grid.narrow > slides.length ? slides.length : vitrine.grid.narrow;


    let swiper = new Swiper('.swiper-container', vitrinePrefs);

    swiper.update();
    swiper.appendSlide(slides);

    $j(".text0").css({
        "padding-bottom": vitrine.labels[1].hide === 1 ? '10%b ' : '0%',
        "display": vitrine.labels[0].hide === 1 ? 'none' : 'inline-flex',
        "font-size": "20px",//vitrine.labels[0].fontSize,
        'color': vitrine.labels[0].fontColor,
        "font-family": vitrine.fontFamily
    });
    $j(".text1").css({
        // "padding-top": vitrine.labels[2].hide === 0 && vitrine.labels[0].hide === 1 ? '30%' : '0%',
        // "padding-bottom": vitrine.labels[0].hide === 0 ? '30%' : '0%',
        "display": vitrine.labels[1].hide === 1 ? 'none' : 'block',
        "font-size": "10px",          //vitrine.labels[1].fontSize,
        'color': vitrine.labels[1].fontColor,
        "font-family": vitrine.fontFamily
    });
    $j(".text2").css({
        "padding-top": vitrine.labels[1].hide === 1 ? '10%' : '0%',
        "display": vitrine.labels[2].hide === 1 ? 'none' : 'inline-flex',
        "font-size": "15px",//vitrine.labels[2].fontSize,
        'color': vitrine.labels[2].fontColor,
        "font-family": vitrine.fontFamily
    });

    swiper.update();

    if (vitrinePrefs.autoplay) {
        swiper.autoplay.stop();
        swiper.autoplay.start();
    }
}

