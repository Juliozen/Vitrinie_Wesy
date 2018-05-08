var $j = jQuery.noConflict();

/**
*Primitive helper to render layout
*/
var LayoutRender = Class.create();
LayoutRender.prototype =
{
 initialize: function()
 {
    
 },

  render: function(query, callback)
  {
    query.forEach((doc) =>
    {
        let vitrine = doc.data();
        let vitrinePrefs = {};

        if (vitrine)
        {
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

            return callback(vitrine, vitrinePrefs);
        }
    });
  },

  setSwipperSlides: function(resposta, vitrinePrefs, vitrine, callback)
  {
    let slides = [];
    resposta.forEach(atributo => {
        let arr = atributo.chaves;

        console.log("Atributos: ", atributo.chaves);
        console.log("AttrName: ", vitrine.labels);

        if (arr[vitrine.labels[1].attrName].length > 100)
         arr[vitrine.labels[1].attrName] = arr[vitrine.labels[1].attrName].substring(0, 99) + "...";

        if (vitrine.grid.typeLayout === 1)
        {
            slides.push
              (
                '<div class="swiper-slide textsSlides" style="height: 100%; width: 100%;">\n' +
                '<div class="swiper-slide-content" style="width: 100%; height: 100%;">\n' +

                '<a href="'+arr["link"]+'" target="_blank">\n' +
                  '<div data-sku="'+arr["gid"]+'" class="card-background-image" style="width: 100%; height: 50%; background-image:url(' + arr["image_link"] + ')">\n'
                  +
                  '</div>\n' +
                '</a>\n' +

                '<div id="cardTexts" class="cardTexts-adjusted">\n' +

                '<p class="text0 text-ajusted">' + arr[vitrine.labels[0].attrName] + '</p>\n' +
                '<p align="center" class="text1 text-ajusted">' + arr[vitrine.labels[1].attrName] + '</p>\n' +
                '<p class="text2 text-ajusted">' + arr[vitrine.labels[2].attrName] + '</p>\n' +

                '</div>\n' +
                '</div>\n' +
                '</div>'
              );
        }
        else
        {
          slides.push
            (
              '<a href="'+arr["link"]+'" target="_blank">\n' +
                '<div data-sku="'+arr["gid"]+'" class="swiper-slide textsSlides" style="background-image:url(' + arr["image_link"] + ')">' +
                // '<div data-background="http://lorempixel.com/1600/1200/nature/6/" class="swiper-lazy">\n' +
                //     '<div class="swiper-lazy-preloader"></div>\n' +
                '<p class="text0">' + arr[vitrine.labels[0].attrName] + '</p>\n' +
                '<p class="text1">' + arr[vitrine.labels[1].attrName] + '</p>\n' +
                '<p class="text2">' + arr[vitrine.labels[2].attrName] + '</p>\n' +
                '</div>\n' +
              '</a>\n'
            );
        }
    });

    callback = typeof callback == 'undefined' ? function(){} : callback;
    this._configSwipper(slides, vitrinePrefs, vitrine, callback);
  },

 _configSwipper: function(slides, vitrinePrefs, vitrine, callback)
 {
    vitrinePrefs.slidesPerView = vitrine.grid.narrow > slides.length ? slides.length : vitrine.grid.narrow;
    let swiper = new Swiper('.swiper-container', vitrinePrefs);

    swiper.update();
    swiper.appendSlide(slides);

    $j(".text0").css({
        "padding-bottom": vitrine.labels[1].hide === 1 ? '10%b ' : '0%',
        //"display": vitrine.labels[0].hide === 1 ? 'none' : 'inline-flex',
        "font-size": vitrine.labels[0].fontSize,//"20px",
        'color': vitrine.labels[0].fontColor,
        "font-family": vitrine.fontFamily
    });
    if(vitrine.labels[0].hide === 1)
        $j(".text0").css({'display':'none'});

    $j(".text1").css({
        // "padding-top": vitrine.labels[2].hide === 0 && vitrine.labels[0].hide === 1 ? '30%' : '0%',
        // "padding-bottom": vitrine.labels[0].hide === 0 ? '30%' : '0%',
        "font-size": vitrine.labels[1].fontSize, //10px
        'color': vitrine.labels[1].fontColor,
        "font-family": vitrine.fontFamily
    });
    if(vitrine.labels[1].hide === 1)
        $j(".text1").css({'display':'none'});

    $j(".text2").css({
        "padding-top": vitrine.labels[1].hide === 1 ? '10%' : '0%',
        //"display": vitrine.labels[2].hide === 1 ? 'none' : 'inline-flex',
        "font-size": vitrine.labels[2].fontSize, //15px
        'color': vitrine.labels[2].fontColor,
        "font-family": vitrine.fontFamily
    });
    if(vitrine.labels[2].hide === 1)
        $j(".text2").css({'display':'none'});

    swiper.update();

    if (vitrinePrefs.autoplay)
    {
      swiper.autoplay.stop();
      swiper.autoplay.start();
    }

    callback();
  }
};

/**
*Primitive helper to access firebase query's
*/
var FireBaseHelper = Class.create();
FireBaseHelper.prototype =
{
 initialize: function(token)
 {
    firebase.initializeApp({
      apiKey: "AIzaSyBeKDfUngI4aYbIIm-yM-mXtA2PLktBDsc",
      authDomain: "suaview-e4ea1.firebaseapp.com",
      databaseURL: "https://suaview-e4ea1.firebaseio.com",
      projectId: "suaview-e4ea1",
      storageBucket: "suaview-e4ea1.appspot.com",
      messagingSenderId: "577146762908"
    });

    this.token = token;
    this._objStore = firebase.firestore();
 },

 getLayout: function(fn)
 {
    //var crenditals = this.token == 'c81e728d9d4c2f636f067f89cc14862c' ? 'shibata@homolog.com' : this.token;

    var query = 
      this._objStore.collection('SuaView').doc('Layout').collection(this.token);

    query.get().then((querySnapshot) => {
      fn(querySnapshot);
    });
 }
};

var Vitrine = Class.create();
Vitrine.prototype =
{
 initialize: function(token, sku)
 {
  this.sku = sku;
  this.analyticsHelper = Analytics().setToken(token);
  this.objFireBaseHelper = new FireBaseHelper(token);
  this.objLayoutRender = new LayoutRender();

  this._init();
 },

  _observeProspectItems: function()
  {
    var items = $$('div[data-sku]');
    var me = this;

    items.each(function(item, idx){
      $$('div[data-sku]')[idx].observe('click', function(){
        var sku = $$('div[data-sku]')[idx].readAttribute('data-sku');
        me.analyticsHelper.addProspectItem(sku);
      });
    });
  },

  _getRelatedProducts: function(arrAtributosInfo, callback)
  {
    $j.ajax({
        type: "POST",
        url: "https://api.suaview.com.br/objrelacionado/produtos-relacionados/get",
        headers: {
            'Content-Type': 'application/json', 'Authorization-Token': this.analyticsHelper.objAnalytics.token
        },
        data: JSON.stringify({
            "sku": this.sku,
            "limit": 10,
            "listChave": [{
                "key": 'description'
             }
            ],
            "listAtributo": [{
                  "key": 'link'
                },
                {
                  "key": 'gid'
                },
                {
                  "key": 'image_link'
                },
                {
                  "key": arrAtributosInfo[0].attrName
                },
                {
                    "key": arrAtributosInfo[1].attrName
                },
                {
                    "key": arrAtributosInfo[2].attrName
                }
            ]
        }),
        success: data => {
            let resposta = data.resposta;
            let slides = [];
            callback(data);
        },
        error: error => {

        }
    });
  },

  _init()
  {
    var me = this;

    //FireBase Query -> Render Layout -> API Related Products -> Plugin JS Swiper Render -> Analytics Observable items
    this.objFireBaseHelper.getLayout(function(fireBaseQueryResponse)
      {
        me.objLayoutRender.render(fireBaseQueryResponse, function(layoutRenderQueryResp, layoutRenderVitriPrefsResponse){
          me._getRelatedProducts(layoutRenderQueryResp.labels, function(relatedProductsResponse)
          {
            if(relatedProductsResponse.status != 200)
              return console.error('vitrine status code invalid');

            me.objLayoutRender.setSwipperSlides(relatedProductsResponse.resposta, layoutRenderVitriPrefsResponse, layoutRenderQueryResp);
            me._observeProspectItems();
            
          });
        });
      }
    );
  }
};

function onClickButton(varFunction) {
  $j('#button').onclick(varFunction);
}