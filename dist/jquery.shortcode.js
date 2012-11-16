// Generated by CoffeeScript 1.3.3

/*
  Shortcode.js 1.0
  Replace Wordpress style shortcodes with HTML on the fly
  by Nic Aitch @nicinabox
*/


(function() {

  $.fn.shortcode = function(services) {
    var run;
    services = $.extend({}, services);
    run = function(code, options, el) {
      return services[code](options, el);
    };
    return this.each(function() {
      var html, replace_with,
        _this = this;
      html = $(this).html();
      replace_with = '';
      $.each(services, function(shortcode) {
        var crude_options, match, options, regex;
        regex = new RegExp("\\[" + shortcode + "(.*?)?\\]", "g");
        options = {};
        match = regex.exec(html);
        if (match[1]) {
          crude_options = $.trim(match[1]).split(' ');
          $.each(crude_options, function(i) {
            var opts;
            opts = crude_options[i].split("=");
            return options[opts[0]] = opts[1].replace(/"/g, '');
          });
        }
        replace_with = run(shortcode, options, _this);
        if (replace_with.jquery) {
          replace_with = replace_with[0].outerHTML;
        } else if (typeof replace_with === "object") {
          html = replace_with.html;
          replace_with = replace_with.replacement;
        }
        if (replace_with) {
          return html = html.replace(regex, replace_with);
        }
      });
      return $(this).html(html);
    });
  };

}).call(this);