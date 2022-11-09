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

  init: function () {
    Slider.takeImg();
    Slider.renderContainer();
    Slider.buttonEvent();
    Slider.selectEvent();
  },

  takeImg: function () {
    for (let i = 0; i < Slider.GLOBAL.imgCount; i++) {
      imgInfo = {
        img: $(Slider.SELECTORS.img + `[index=${i}]`).attr("src"),
        name: $(Slider.SELECTORS.img + `[index=${i}]`).attr("alt"),
      };

      Slider.GLOBAL.imgArray[i] = imgInfo;
    }
  },

  selectEvent: function () {
    $(Slider.SELECTORS.select_button).on("click", function () {
      let selectIndex = $(this).attr("index");
      if (Number(selectIndex) > Slider.GLOBAL.index) {
        $(
          Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
        ).removeClass("active");
        $(Slider.SELECTORS.select_button + `[index=${selectIndex}]`).addClass(
          "active"
        );
        Slider.goRight(Slider.GLOBAL.index, selectIndex);
      }

      if (Number(selectIndex) < Slider.GLOBAL.index) {
        $(
          Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
        ).removeClass("active");
        $(Slider.SELECTORS.select_button + `[index=${selectIndex}]`).addClass(
          "active"
        );
        Slider.goLeft(Slider.GLOBAL.index, selectIndex);
      }
    });
  },

  buttonEvent: function () {
    $(Slider.SELECTORS.next_button).on("click", function () {
      $(
        Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
      ).removeClass("active");
      Slider.goRight(Slider.GLOBAL.index, Number(Slider.GLOBAL.index) + 1);

      $(
        Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
      ).addClass("active");
    });
    $(Slider.SELECTORS.prev_button).on("click", function () {
      $(
        Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
      ).removeClass("active");
      Slider.goLeft(Slider.GLOBAL.index, Number(Slider.GLOBAL.index) - 1);

      $(
        Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
      ).addClass("active");
    });
  },

  goRight: function (currentIndex, nextIndex) {
    let renderCount = nextIndex - currentIndex;
    leftChange = Number(renderCount) * 748;
    $(Slider.SELECTORS.image_slide_container).animate(
      { left: -Number(leftChange) },
      700,
      function () {
        for (let i = 0; i < renderCount; i++) {
          $(".image-slide-container img:first-child").appendTo(
            $(Slider.SELECTORS.image_slide_container)
          );
          $(Slider.SELECTORS.image_slide_container).css("left", "");
        }
      }
    );
    if (nextIndex >= Number(Slider.GLOBAL.imgCount)) {
      Slider.GLOBAL.index = 0;
    } else Slider.GLOBAL.index = nextIndex;
  },

  goLeft: function (currentIndex, nextIndex) {
    let renderCount = currentIndex - nextIndex;
    leftChange = Number(renderCount) * 748;
    for (let i = 0; i < renderCount; i++) {
      $(".image-slide-container img:last-of-type").prependTo(
        $(Slider.SELECTORS.image_slide_container)
      );
    }
    $(Slider.SELECTORS.image_slide_container).css(
      "left",
      -748 * renderCount + "px"
    );
    $(Slider.SELECTORS.image_slide_container).animate(
      { left: 0 },
      700,
      function () {
        for (let i = 0; i < renderCount; i++) {
          $(Slider.SELECTORS.image_slide_container).css("left", "");
        }
      }
    );
    if (nextIndex < 0) {
      Slider.GLOBAL.index = Number(Slider.GLOBAL.imgCount) - 1;
    } else Slider.GLOBAL.index = nextIndex;
  },

  renderContainer: function () {
    var html = "";
    for (let i = 0; i < Slider.GLOBAL.imgCount; i++) {
      html += `<div class="select-button ${
        i === 0 ? "active" : ""
      }"  index=${i}></div>`;
    }

    $(Slider.SELECTORS.slide_select_container).html(html);
  },
};
$(document).ready(function () {
  Slider.init();
});
