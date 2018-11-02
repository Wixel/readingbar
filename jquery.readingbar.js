/*!
 * Readingbar jQuery plugin
 *
 * @author   : http://twitter.com/nicovanzyl
 * @author   : http://twitter.com/wixelhq
 * @url      : https://github.com/Wixel/readingbar.git
 * @copyright: 2016 Wixel
 * @license  : MIT license
 * @version  : 1.1
 */

var extend = function(out) {
  out = out || {};
  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
    }
  }
  return out;
};

(function($) {
  $.fn.viewportOffset = function() {
    var offset = $(this).offset();

    return {
      top: offset.top + $(window).scrollTop()
    };
  };
  $.fn.readingbar = function(options) {
    if (document.body.querySelector(".readingbar-bar") === null) {
      // Default options
      var defaults = {
        backgroundColor: "#50E3C2",
        height: 4,
        counter: true
      };

      // Extend default and custom options
      settings = extend({}, defaults, options);

      // Create bar element
      var barElement = document.createElement("div");

      // Add styles
      barElement.className = "readingbar-bar";
      barElement.style.position = "fixed";
      barElement.style.bottom = "0";
      barElement.style.left = "0";
      barElement.style.width = "0";
      barElement.style.maxWidth = "100%";
      barElement.style.height = settings.height + "px";
      barElement.style.backgroundColor = settings.backgroundColor;

      // Add bar to DOM
      document.body.appendChild(barElement);

      // Create text counter if enabled
      if (settings.counter) {
        // Create text element
        var counterElement = document.createElement("span");

        // Add styles
        counterElement.className = "read-text";
        counterElement.style.position = "fixed";
        counterElement.style.bottom = settings.height + "px";
        counterElement.style.left = "0";
        counterElement.style.width = settings.height * 10 + "px";
        counterElement.style.marginLeft = "-" + settings.height * 10 + "px";
        counterElement.style.textAlign = "right";
        counterElement.style.color = settings.backgroundColor;
        if (settings.height < 5) {
          counterElement.style.fontSize = settings.height * 5 + "px";
        } else {
          counterElement.style.fontSize = settings.height * 2.5 + "px";
        }

        // Add counter text to DOM
        document.body.appendChild(counterElement);
      }
    }
    _ = $(this);

    var readHeight = _.outerHeight();
    var startPoint = _.offset().top * 1.65;
    var currentPos = 0;

    $(document).on("scroll", function() {
      readHeight = _.outerHeight();
      currentPos = ((_.viewportOffset().top - startPoint) / readHeight) * 100;
      $(".readingbar-bar").css("width", currentPos + "%");
      $(".read-text").css("left", currentPos + "%");
      if (currentPos > 100) {
        $(".readingbar-bar, .read-text").css("opacity", "0");
      } else {
        $(".read-text").text(Math.round(currentPos) + "%");
        $(".read-text").css({
          opacity: 1,
          bottom: "0"
        });
        $(".readingbar-bar").css({
          opacity: 1,
          height: settings.height + "px"
        });
        clearTimeout($.data(this, "scrollTimer"));
        $.data(
          this,
          "scrollTimer",
          setTimeout(function() {
            $(".readingbar-bar").animate(
              {
                opacity: 0.8,
                height: settings.height / 2 + "px"
              },
              150
            );
            $(".read-text").animate(
              {
                opacity: 0,
                bottom: "-" + settings.height * 10 + "px"
              },
              140
            );
          }, 250)
        );
      }
    });
  };
})(jQuery);
