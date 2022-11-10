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
      if (Number(selectIndex) > Slider.GLOBAL.index) {
        Slider.goRight(Slider.GLOBAL.index, selectIndex);
        Slider.dotActive(Slider.GLOBAL.index, selectIndex);
      }
      if (Number(selectIndex) < Slider.GLOBAL.index) {
        Slider.goLeft(Slider.GLOBAL.index, selectIndex);
        Slider.dotActive(Slider.GLOBAL.index, selectIndex);   
      }
    });
  },
  dotActive: function (currentIndex, nextIndex) {
    Slider.GLOBAL.index = nextIndex;
    if(nextIndex >= Slider.GLOBAL.imgCount) Slider.GLOBAL.index = 0
    if(nextIndex < 0) Slider.GLOBAL.index = Slider.GLOBAL.imgCount - 1;
    $(Slider.SELECTORS.select_button + `[index=${currentIndex}]`).removeClass("active");
    $(Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`).addClass("active");
  },
  buttonEvent: function () {
    $(Slider.SELECTORS.next_button).on("click", function () {
      let nextIndex = Number(Slider.GLOBAL.index) + 1;
      Slider.goRight(Slider.GLOBAL.index, nextIndex);
      Slider.dotActive(Slider.GLOBAL.index, nextIndex);
    });
    $(Slider.SELECTORS.prev_button).on("click", function () {
      let nextIndex = Number(Slider.GLOBAL.index) - 1;
      Slider.goLeft(Slider.GLOBAL.index, Number(Slider.GLOBAL.index) - 1);
      Slider.dotActive(Slider.GLOBAL.index, nextIndex);
    });
  },
  goRight: function (currentIndex, nextIndex) {
    let renderCount = nextIndex - currentIndex;
    leftChange = Number(renderCount) * Slider.GLOBAL.imgWidth;
    $(Slider.SELECTORS.image_slide_container).animate({ left: -Number(leftChange) },700,function () {
        for (let i = 0; i < renderCount; i++) $(".image-slide-container img:first-child").appendTo($(Slider.SELECTORS.image_slide_container));
        $(Slider.SELECTORS.image_slide_container).css("left", 0);
      }
    );
  },
  goLeft: function (currentIndex, nextIndex) {
    let renderCount = currentIndex - nextIndex;
    leftChange = Number(renderCount) * Slider.GLOBAL.imgWidth;
    for (let i = 0; i < renderCount; i++) $(".image-slide-container img:last-of-type").prependTo($(Slider.SELECTORS.image_slide_container));
    $(Slider.SELECTORS.image_slide_container).css("left",-Slider.GLOBAL.imgWidth * renderCount + "px");
    $(Slider.SELECTORS.image_slide_container).animate({ left: 0 },700,function () {});
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
