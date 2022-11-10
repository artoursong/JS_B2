var Slider = {
  GLOBAL: {
    imgCount: $(".image-slide-container img").length,
    index: 0,
    imgWidth: 748,
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
  init: function () {
    Slider.renderDot();
    Slider.buttonEvent();
    Slider.dotEvent();
  },
  dotEvent: function () {
    $(Slider.SELECTORS.select_button).on("click", function () {
      let selectIndex = $(this).attr("index");
      if (Number(selectIndex) > Slider.GLOBAL.index) Slider.moveImg(Slider.GLOBAL.index, selectIndex);
      if (Number(selectIndex) < Slider.GLOBAL.index) Slider.moveImg(Slider.GLOBAL.index, selectIndex);  
    });
  },
  dotActive: function (currentIndex, nextIndex) {
    Slider.GLOBAL.index = nextIndex >= Slider.GLOBAL.imgCount ? 0 : nextIndex < 0 ? Slider.GLOBAL.imgCount - 1 : nextIndex;
    $(Slider.SELECTORS.select_button + `[index=${currentIndex}]`).removeClass("active");
    $(Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`).addClass("active");
  },
  buttonEvent: function () {
    $(Slider.SELECTORS.next_button).on("click", function () {
      Slider.moveImg(Slider.GLOBAL.index, Number(Slider.GLOBAL.index) + 1);
    });
    $(Slider.SELECTORS.prev_button).on("click", function () {
      Slider.moveImg(Slider.GLOBAL.index, Number(Slider.GLOBAL.index) - 1);;
    });
  },
  moveImg: function (currentIndex, nextIndex) {
    let renderCount = nextIndex - currentIndex;
    leftChange = Number(renderCount) * Slider.GLOBAL.imgWidth;
    if (renderCount > 0) {
      $(Slider.SELECTORS.image_slide_container).animate({ left: -Number(leftChange) },700,function () {
        for (let i = 0; i < renderCount; i++) $(".image-slide-container img:first-of-type").appendTo($(Slider.SELECTORS.image_slide_container));
        $(Slider.SELECTORS.image_slide_container).css("left", 0);
      });
    }
    if (renderCount <0) {
      for (let i = 0; i < -renderCount; i++) $(".image-slide-container img:last-of-type").prependTo($(Slider.SELECTORS.image_slide_container));
      $(Slider.SELECTORS.image_slide_container).css("left",Slider.GLOBAL.imgWidth * renderCount + "px");
      $(Slider.SELECTORS.image_slide_container).animate({ left: 0 },700,function () {});
    }
    Slider.dotActive(Slider.GLOBAL.index, nextIndex);
  },
  renderDot: function () {
    var html = "";
    for (let i = 0; i < Slider.GLOBAL.imgCount; i++) html += `<div class="select-button ${i === 0 ? "active" : ""}"  index=${i}></div>`;
    $(Slider.SELECTORS.slide_select_container).html(html);
  },
};
$(document).ready(function () {
  Slider.init();
});