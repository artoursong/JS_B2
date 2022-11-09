var Slider = {
    GLOBAL: {
        imgCount: $(".image-slide-container img").length,
        index: 0,
        imgArray: [],
    },

    CONSTS: {},

    SELECTORS: {
        image_slide_container: ".image-slide-container",
        prev_button: ".prev-button",
        next_button: ".next-button",
        img: ".image-slide-container img",
        slide_select_container: ".slide-select-container",
        select_button: ".slide-select-container .select-button",
    },

    init: function() {
        Slider.takeImg();
        Slider.renderContainer();
        Slider.buttonEvent();
    },

    takeImg: function() {
        for (let i = 0; i < Slider.GLOBAL.imgCount; i++) {
            imgInfo = {img:$(Slider.SELECTORS.img + `[index=${i}]`).attr("src"),
                    name:$(Slider.SELECTORS.img + `[index=${i}]`).attr("alt")};

            Slider.GLOBAL.imgArray[i] = imgInfo;
        }
    },

    buttonEvent: function() {
        $(Slider.SELECTORS.next_button).on("click", function() {
            Slider.goRight(Slider.GLOBAL.index, Number(Slider.GLOBAL.index)+1)
        });
        $(Slider.SELECTORS.prev_button).on("click", function() {
            Slider.goLeft(Slider.GLOBAL.index, Number(Slider.GLOBAL.index)-1)
        });
    },

    goRight: function(currentIndex, nextIndex) {
        let renderCount = nextIndex - currentIndex;
        leftChange = Number(renderCount)*748;
        $(Slider.SELECTORS.image_slide_container).animate({left: - Number(leftChange)},700, function() {
                $(".image-slide-container img:first-child").appendTo($(Slider.SELECTORS.image_slide_container));
                $(Slider.SELECTORS.image_slide_container).css("left","");
        })
        if (nextIndex >= Number(Slider.GLOBAL.imgCount) - 1) {
            Slider.GLOBAL.index = 0;
        }
        else Slider.GLOBAL.index = nextIndex;
    },

    goLeft: function(currentIndex, nextIndex) {
        let renderCount = currentIndex - nextIndex;
        leftChange = Number(renderCount)*748;
        $(Slider.SELECTORS.image_slide_container).animate({left: + Number(leftChange)},700, function() {
                $(".image-slide-container img:last-child").prependTo($(Slider.SELECTORS.image_slide_container));
                $(Slider.SELECTORS.image_slide_container).css("left","");
        })
    },

    renderContainer: function () {
        var html = "";
        for(let i = 0; i < Slider.GLOBAL.imgCount; i++) {
            html += `<div class="select-button ${i===0 ? "active" : ""}"  index=${i}></div>`;
        }

        $(Slider.SELECTORS.slide_select_container).html(html);
    }

}
$(document).ready(function() {
    Slider.init();
});