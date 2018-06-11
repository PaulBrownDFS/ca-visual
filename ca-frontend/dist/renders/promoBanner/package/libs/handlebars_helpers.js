if (typeof Handlebars !== 'undefined') {
    Handlebars.registerHelper('escapeUrl', function (url) {
        if (!url || url.length < 1) {
            return '';
        }
        return encodeURIComponent(url);
    });

    Handlebars.registerHelper('dynamicTemplate', function (id, renderTypes, context) {
        if (id === false) {
            id = context['@type'];
        }

        if (renderTypes) {
            context.renderTypes = renderTypes;
        }

        else {
            renderTypes = context.renderTypes;
        }

        var parsedId = id.substring(id.lastIndexOf('/') + 1, id.length);
        var matchedTemplate;
        for (var name in renderTypes) {
            if (parsedId === renderTypes[name]) {
                matchedTemplate = Handlebars.partials[name].length
                    ? Handlebars.partials[name]
                    : Handlebars.template(Handlebars.partials[name]);
                break;
            }
        }
        if (!matchedTemplate) {
            return "Template matching id: " + id + ' not found';
        }

        return new Handlebars.SafeString(matchedTemplate(context));
    });

    Handlebars.registerHelper('bannerConfig',function (opts) {
        hex = this.bannerColor || '#fff';
        alpha = this.bannerOpacity || 1;
        hex   = hex.replace('#', '');
        var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
        var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
        var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
        if ( alpha ) {
            return 'background-color:rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + '); ';
        }
        else {
            return 'background-color:rgb(' + r + ', ' + g + ', ' + b + '); ';
        }
    });

    Handlebars.registerHelper('roundelConfig', function (roundel) {
        if (roundel && roundel[0] && roundel[0].roundel && roundel[0].roundel.name) {
            var resultPosition = '';
            switch (roundel[0].roundelPosition) {
                case 'Bottom Right':
                    resultPosition = 'p1_img=';
                    break;
                case 'Bottom Left':
                    resultPosition = 'p2_img=';
                    break;
                case 'Top Left':
                    resultPosition = 'p3_img=';
                    break;
                case 'Top Right':
                    resultPosition = 'p4_img=';
                    break;
            }
            var roundelRatio = roundel[0].roundelRatio;
            return resultPosition + roundel[0].roundel.name + (roundelRatio ? ('&roundelRatio=' + roundelRatio) : '');
        } else {
            return '';
        }
    });

    Handlebars.registerHelper('splitBlock', function (index, split) {
        if (typeof split === 'undefined') {
            return ''
        }
        var id = parseInt(index, 10);
        var splitter = split.split('/');
        if (id === 0) {
            return 'amp-ca-size-' + splitter[0];
        }

        return 'amp-ca-size-' + splitter[1];
    });

    Handlebars.registerHelper('iff', function (a, operator, b, opts) {
        var bool = false;
        switch (operator) {
            case '==':
                bool = a == b;
                break;
            case '>':
                bool = a > b;
                break;
            case '<':
                bool = a < b;
                break;
            default:
                throw "Unknown operator " + operator;
        }

        if (bool) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });

    Handlebars.registerHelper('roundelProperties', function (opts) {
        if (this.roundel && this.roundel[0] && this.roundel[0].roundel && this.roundel[0].roundelPosition && this.roundel[0].roundelRatio) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });

    Handlebars.registerHelper('showdown', function (text) {
        if (typeof showdown === 'undefined') {
            return 'Showdown text fromatting plugin is not initialized';
        }
        var converter = new showdown.Converter({
            noHeaderId: true,
            simpleLineBreaks: true
        });

        var text = converter.makeHtml(text);

        if (typeof text === 'undefined') {
            text = '';
        }

        return new Handlebars.SafeString(converter.makeHtml(text));
    });

    Handlebars.registerHelper('ampCaVideo', function () {
        var s = ' data-is-firefox=';
        s += +!!(window.navigator.userAgent.indexOf('Firefox') >= 0);

        var dataElement = '<script type="text/plain" class="video-settings"' + s + ' ></script>';
        return new Handlebars.SafeString(dataElement);
    });

    // Additional Handlbars Helpers

    Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    });

    Handlebars.registerHelper("csv", function(str, device) {
      var colors = str.split(',');
          if(device === 'M') {
            if(colors[1] !== undefined && colors[1] != false) {
              return colors[1];
            } else {
              if(colors[0] !== undefined && colors[0] != false) {
                return colors[0];
              } else {
                return '000000';
              }

            }
          }

      if(device === 'D') {
        if(colors[0] !== undefined && colors[0] != false) {
          return colors[0];
        } else {
          return '000000';
        }
      }
      // No Matches Return Default Black
      return '000000';
    });

    Handlebars.registerHelper("finance", function(price, local) {
      var this_price = price.match(/([1-9])+/g);
      if(local === 'UK') {
        return '&pound;' + Math.floor(parseFloat((this_price[0]) / 48) * 100) / 100 + ' a month for 4 years';
      } else {
        return '&euro;' + Math.floor(parseFloat((this_price[0]) / 36) * 100) / 100 + ' a month for 3 years';
      }

    });


    Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        accum += block.fn(this);
    }
        return accum;
    });

    Handlebars.registerHelper("inc", function(value, options) {
        return parseInt(value) + 1;
    });

    Handlebars.registerHelper("getWidth", function(card_type, device) {

      if(card_type === 'Type_A') {

        switch (device) {
          case "M":
          return '255';

          case "D4":
          return '213';

          case "D6":
          return '291';
        }
      }

      if(card_type === 'Type_B') {

        switch (device) {
          case "M":
          return '255';

          case "D4":
          return '294';

          case "D6":
          return '401';
        }

      }

      if(card_type === 'Type_C' || card_type === 'Type_D') {

        switch (device) {
          case "M":
          return '540';

          case "D4":
          return '456';

          case "D6":
          return '622';
        }

      }

      if(card_type === 'Type_E') {
        switch (device) {
          case "M":
          return '151';

          case "D4":
          return '151';

          case "D6":
          return '151';
        }
      }

    });
}

else {
    console.warn('Handlebars is not defined, please make sure you included Handlebars library');
}
