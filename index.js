var Slider = {
  GLOBAL: {
    imgCount: $(".image-slide-container img").length,
    index: 0,
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
    Slider.renderContainer();
    Slider.setUpEvent();
    Slider.selectButtonEvent();
  },

  selectButtonEvent: function () {
    $(Slider.SELECTORS.select_button).on("click", function () {
      let selectIndex = $(this).attr("index");
      if (selectIndex > Slider.GLOBAL.index) {
        let subIndex = Number(selectIndex) - Number(Slider.GLOBAL.index);
        for (let i = 0; i < subIndex; i++) {
          $(Slider.SELECTORS.image_slide_container).animate(
            { left: -748 },
            70,
            function () {
              $(".image-slide-container img:first-child").appendTo(
                $(Slider.SELECTORS.image_slide_container)
              );
              $(Slider.SELECTORS.image_slide_container).css("left", "");
            }
          );
          $(".image-slide-container img:first-child").appendTo(
            $(Slider.SELECTORS.image_slide_container)
          );
          $(
            Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
          ).removeClass("active");
          Slider.GLOBAL.index =
            Slider.GLOBAL.index >= Number(Slider.GLOBAL.imgCount) - 1
              ? 0
              : Number(Slider.GLOBAL.index) + 1;
          $(
            Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
          ).addClass("active");
        }
      }
      if (selectIndex < Slider.GLOBAL.index) {
        let subIndex = Number(Slider.GLOBAL.index) - Number(selectIndex);
        for (let i = 0; i < subIndex; i++) {
          $(Slider.SELECTORS.image_slide_container).animate(
            { left: +748 },
            70,
            function () {
              $(".image-slide-container img:last-child").prependTo(
                $(Slider.SELECTORS.image_slide_container)
              );
              $(Slider.SELECTORS.image_slide_container).css("left", "");
            }
          );
          $(
            Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
          ).removeClass("active");
          Slider.GLOBAL.index =
            Slider.GLOBAL.index <= 0
              ? Number(Slider.GLOBAL.imgCount) - 1
              : Number(Slider.GLOBAL.index) - 1;
          $(
            Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
          ).addClass("active");
        }
      }
    });
  },

  setUpEvent: function () {
    $(Slider.SELECTORS.prev_button).on("click", function () {
      $(Slider.SELECTORS.image_slide_container).animate(
        { left: +748 },
        700,
        function () {
          $(".image-slide-container img:last-child").prependTo(
            $(Slider.SELECTORS.image_slide_container)
          );
          $(Slider.SELECTORS.image_slide_container).css("left", "");
        }
      );
      $(
        Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
      ).removeClass("active");
      Slider.GLOBAL.index =
        Slider.GLOBAL.index <= 0
          ? Number(Slider.GLOBAL.imgCount) - 1
          : Number(Slider.GLOBAL.index) - 1;
      $(
        Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
      ).addClass("active");
    });

    $(Slider.SELECTORS.next_button).on("click", function () {
      $(Slider.SELECTORS.image_slide_container).animate(
        { left: -748 },
        700,
        function () {
          $(".image-slide-container img:first-child").appendTo(
            $(Slider.SELECTORS.image_slide_container)
          );
          $(Slider.SELECTORS.image_slide_container).css("left", "");
        }
      );
      $(
        Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
      ).removeClass("active");
      Slider.GLOBAL.index =
        Slider.GLOBAL.index >= Number(Slider.GLOBAL.imgCount) - 1
          ? 0
          : Number(Slider.GLOBAL.index) + 1;
      $(
        Slider.SELECTORS.select_button + `[index=${Slider.GLOBAL.index}]`
      ).addClass("active");
    });
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
