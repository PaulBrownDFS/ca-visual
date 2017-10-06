/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

// ===========================================
//  Carousel  Builder v1.0 PB
// ===========================================
var slideData = {};
    slideData.slides = [];

var slideIDs = [
                  '57986e66-debe-40ca-8481-01338f415429',
                  'e47ea56d-8019-43b9-8eca-2c4a171f5332',
                  '8ce65349-10d0-43da-a667-c9e2c3db29ea',
                  '52a15fec-513c-4d63-880d-d63dcc38ff92',
                  '9f1d1e72-085d-4731-a910-f5c82a325755'
                ];

var cacheBuster = Math.random().toString(36).substr(2, 12);

// build data into an object from array of IDs, via ajax
for(i=0; i < slideIDs.length; i++) {
// the content delivery api url for `BannerIMtest1`
var contentDeliveryUrl = '//c1.adis.ws/cms/content/query?fullBodyObject=true&query=%7B"sys.iri"%3A"http%3A%2F%2Fcontent.cms.amplience.com%2F'+ slideIDs[i] + '"%7D&scope=tree&store=dfs&cacheBuster=' + cacheBuster;

// create and issue the content delivery request
 $.ajax({
  url: contentDeliveryUrl,
  async: false
}) // render the content or display error response
.done(renderContent)
.fail(showErrorMessage);
}

if (slideData){
  renderCarousel();
}

function renderContent(data) {

// use the Amplience CMS JavaScript SDK to manipulate the JSON-LD into a content tree
var contentTree = amp.inlineContent(data)[0];


    slideData.slides.push(contentTree);

// fetch the Handlebars template from the DOM
// var templateSource = $('#handlebars-template').html();
// var template = Handlebars.compile(templateSource);
}

function renderCarousel() {
  var template = document.getElementById('dfsTemplate').innerHTML;
  // document.querySelectorAll(".js_banner_wrap")[0].innerHTML = template(slideData);
  var compiled = Template7(template).compile();
  console.log(compiled);
  var compiledRendered = compiled(slideData);
  // Insert rendered template
  document.getElementById('jsHPCarousel_wrap').innerHTML = compiledRendered;
}


function showErrorMessage(err) {
  console.log('Delivery API Request Failure', err);
  $(document.body).append('<div class="error">An error occurred retrieving your content.<br/><br/>Please ensure that it is published.<br/><br/>Details of the error have been saved to the browser console.</div>');
}


// Carousel Functions
if(!dfs) {
  var dfs = {};
}
dfs.carouselText = function(target, text){
  var el = $('.' + target);
  el.text(text);
  if(el.length){
    return '.' + target + ' updated to ' + text;
  } else {
    return 'Error Updating Carousel, Element Not Found! :(';
  }
}

  // Countdowns

    if(!dfs){
      var dfs = {};
    }
    dfs.carCountdown = {
        init: function(){
          console.log('Countdown Init!');
          if($('.bannerTextContainer.carCountdown').length>0) {
            this.addCountDown();
          }
      },
        addCountDown: function(){
          $('.bannerTextContainer.carCountdown').each(function() {
            var _this = this,
            data = $(_this).data(),
            deadline = data.countdown,
            daysStart = data.startdays,
            messageID = data.messageid.replace('slide_', '');
            console.log(deadline + ' , ' + daysStart + ' , ' + messageID);
            var countDownOBj = getTimeRemaining(deadline);
            console.log('Days: ' + countDownOBj.days);
            console.log('Hours: ' + countDownOBj.hours);
            console.log('Mins: ' + countDownOBj.minutes);
            console.log('Seconds: ' + countDownOBj.seconds);
            if( countDownOBj.total > 0 && countDownOBj.days < daysStart) {
              console.log('Show Countdown on Slide: ' + messageID );

              $('h2.message'+ messageID + 'b, h2.message'+ messageID + 'a').addClass('cdText');

              dayOrDays = countDownOBj.days > 1 ? "DAYS" : "DAY";
              var updateCountdown = setInterval(function(){
                    var countDownOBj = getTimeRemaining(deadline);

                    if(countDownOBj.hours < 10 ){
                      countDownOBj.hours = '0' + countDownOBj.hours;
                    }
                    if(countDownOBj.mins < 10 ){
                      countDownOBj.mins = '0' + countDownOBj.mins;
                    }
                    if(countDownOBj.seconds < 10 ){
                      countDownOBj.seconds = '0' + countDownOBj.seconds;
                    }

                    var line1 = "FINAL " + countDownOBj.days + " " + dayOrDays,
                    line2 = countDownOBj.hours + " Hrs " + countDownOBj.minutes + " Mins " + countDownOBj.seconds + " Secs",
                    line3 = countDownOBj.days === 1 ? "order direct until midnight" : "";

                    dfs.carouselText('message' + messageID + "a", line1);
                    dfs.carouselText('message' + messageID + "b", line2);
                    dfs.carouselText('message' + messageID + "c", line3);


              }, 1000);
            } else {
              console.log('show text');
            }
        });
      }
    }

  function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function updateElement(){
  var test4Element = $('#myCarousel');
    if(test4Element.length) {
          $('#myCarousel').carousel({ interval: 6000, cycle: true });
          $("#myCarousel").swiperight(function() {
              $(this).carousel('prev');
          });
          $("#myCarousel").swipeleft(function() {
              $(this).carousel('next');
          });
        clearInterval(PollElement);
        console.log('Carousel Ready and Initiated : ' + PollElement);
        dfs.carCountdown.init();

    }
}

// start carousel if loaded..
var PollElement = setInterval(updateElement, 500);
