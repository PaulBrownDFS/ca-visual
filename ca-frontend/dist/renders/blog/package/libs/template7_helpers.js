if (typeof Template7 !== 'undefined') {
    Template7.registerHelper('escapeUrl', function (url) {
        if (!url || url.length < 1) {
            return '';
        }
        return encodeURIComponent(url);
    });

    Template7.registerHelper('dynamicTemplate', function (id, renderTypes, context) {
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
                matchedTemplate = Template7.partials[name].length
                    ? Template7.partials[name]
                    : Template7.template(Template7.partials[name]);
                break;
            }
        }
        if (!matchedTemplate) {
            return "Template matching id: " + id + ' not found';
        }

        return new Template7.SafeString(matchedTemplate(context));
    });

    Template7.registerHelper('bannerConfig',function (opts) {
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

    Template7.registerHelper('roundelConfig', function (roundel) {
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

    Template7.registerHelper('splitBlock', function (index, split) {
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

    Template7.registerHelper('iff', function (a, operator, b, opts) {
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

    Template7.registerHelper('roundelProperties', function (opts) {
        if (this.roundel && this.roundel[0] && this.roundel[0].roundel && this.roundel[0].roundelPosition && this.roundel[0].roundelRatio) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });

    Template7.registerHelper('showdown', function (text) {
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

        return new Template7.SafeString(converter.makeHtml(text));
    });

    Template7.registerHelper('ampCaVideo', function () {
        var s = ' data-is-firefox=';
        s += +!!(window.navigator.userAgent.indexOf('Firefox') >= 0);

        var dataElement = '<script type="text/plain" class="video-settings"' + s + ' ></script>';
        return new Template7.SafeString(dataElement);
    });

    Template7.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        accum += block.fn(this);
    }
        return accum;
    });

    Template7.registerHelper("inc", function(value, options) {
        return parseInt(value) + 1;
    });
}

else {
    console.warn('Template7 is not defined, please make sure you included Template7 library');
}
