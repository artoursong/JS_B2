var Slider = {
    GLOBAL: {

        index: 0,

    },
    CONSTS: {},
    SELECTORS: {
        image_slide_container: ".image-slide-container",
        prev_button: ".prev-button",
        next_button: ".next-button"
        
    },
    init: function () {
        // Slider.renderImgContainer();
        Slider.setUpEvent();
    },
  
    setUpEvent: function () {
        $(Slider.SELECTORS.prev_button).on("click", function() {
            $(Slider.SELECTORS.image_slide_container).animate({left: + 748},700, function() {
                $(".image-slide-container img:last-child").prependTo($(Slider.SELECTORS.image_slide_container));
                $(Slider.SELECTORS.image_slide_container).css("left","");
            })
        });

        $(Slider.SELECTORS.next_button).on("click", function() {
            $(Slider.SELECTORS.image_slide_container).animate({left: - 748},700, function() {
                $(".image-slide-container img:first-child").appendTo($(Slider.SELECTORS.image_slide_container));
                $(Slider.SELECTORS.image_slide_container).css("left","");
            })
        });
    },
  
    // renderImgContainer: function () {
    //   var html = "";

    //   for(let i = 0; i < Slider.GLOBAL.img.length; i++) {
    //     html += `<img src="${Slider.GLOBAL.img[i]}" index="${i}">`
    //   };
    //   $(Slider.SELECTORS.image_slide_container).html(html);
    // },
  };
  
  $(document).ready(function () {
    Slider.init();
  });