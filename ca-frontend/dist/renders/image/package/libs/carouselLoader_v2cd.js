// ===========================================
//  Carousel Builder v2.1 PB June 25th
// ===========================================

  if(!dfs) {
    var dfs = {};
  }

  dfs.HPSlider = {
    visualID: $('.js_banner_wrap').data('visualid'),
    isROI: $('.js_banner_wrap').data('roi'),
    maxSlides: $('.js_banner_wrap').data('maxslides') || 5
  }

    var cacheBuster = Math.random().toString(36).substr(2, 12),
        dfsSliderID = dfs.HPSlider.visualID;

    console.log('Fetching: contentID:', dfsSliderID);

    var masterDeliveryUrl = '//c1.adis.ws/cms/content/query?fullBodyObject=true&query=%7B"sys.iri"%3A"http%3A%2F%2Fcontent.cms.amplience.com%2F'+ dfsSliderID +'"%7D&scope=tree&store=dfs&cacheBuster=' + cacheBuster;

    // create and issue the content delivery request
      var masterRequest = $.ajax({
        url: masterDeliveryUrl,
      });

      masterRequest
      .done(function(data){
        console.log('Ajax Request Data Fetch : Done', dfsSliderID);
        renderContent(data);

      })
      .fail(function(){
        console.log('Failed To Get Master ID Data');
        showErrorMessage();
      }).always(function(){
        console.log('AJAX Has Completed', dfsSliderID);
      });

function renderContent(data) {
// use the Amplience CMS JavaScript SDK to manipulate the JSON-LD into a content tree
var contentTree = amp.inlineContent(data)[0];
  console.log('CTS',contentTree.slides);
  if(contentTree.slides.length > dfs.HPSlider.maxSlides) {
    contentTree.slides.length = dfs.HPSlider.maxSlides;
  }
    contentTree.spec = {"roiPrices": dfs.HPSlider.isROI, "testDate" : contentTree.testDate};

if (contentTree) {
  renderCarousel(contentTree);
  }
}

function renderCarousel(contentTree) {
  var template = Handlebars.template(AmpCa.templates.bannerMulti);
  document.querySelectorAll(".js_banner_wrap")[0].innerHTML = template(contentTree);
}


function showErrorMessage(err) {
  console.log('Delivery API Request Failure', err);
  $(document.body).append('<div class="error">An error occurred retrieving your content.<br/><br/>Please ensure that it is published.<br/><br/>Details of the error have been saved to the browser console.</div>');
}


// Carousel Functions
if(!dfs){
  var dfs = {};
}
dfs.countdownv2 = {
  timerID: [],
  isMobile: function(){
    if(window.location.origin.indexOf('https://m.dfs') > -1 ) {
      return true;
    }
    return false;
  },
  init: function(){
    if(document.getElementsByClassName('countdown_v2').length) {
      this.addCountdown();

    }
  },
  convertDate: function(xdate) {
    var dateArray= xdate.split(' ');
    var dx = dateArray[0].split('/');
    var formattedDate = dx[1] + '/' + dx[0] + '/' + dx[2];
      if(dateArray[1] != undefined){
        formattedDate += ' ' + dateArray[1];
      }
    return new Date(formattedDate);
  },
  updateTestDate: function(testDate){
    var time = new Date();
        testDate.setHours(time.getHours());
        testDate.setMinutes(time.getMinutes());
        testDate.setSeconds(time.getSeconds());
    return testDate;
  },
  timeRemaining: function (deadline, testDate) {
      if(testDate instanceof Date) {
        testDate = dfs.countdownv2.updateTestDate(testDate);
        var dateTime = new Date(testDate);
      } else {
        var dateTime = new Date();
      }
      var t = Date.parse(deadline) - dateTime,
          seconds = Math.floor((t / 1000) % 60),
          minutes = Math.floor((t / 1000 / 60) % 60),
          hours = Math.floor((t / (1000 * 60 * 60)) % 24),
          days = Math.floor(t / (1000 * 60 * 60 * 24));

      return { 'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds }
  },
  checkDateRange: function(startDate, endDate, testDate) {
      var stDate = Date.parse(startDate),
          enDate = Date.parse(endDate);
          if(testDate instanceof Date) {
            testDate = dfs.countdownv2.updateTestDate(testDate);
            var now = Date.parse(new Date(testDate));
          } else {
            var now = Date.parse(new Date());
          }

      return (now > stDate && now < enDate);
  },
  addCountdown: function() {
    $('div.countdown_v2').each(function (index, value) {
      var _this = this,
          data = $(_this).data(),
          startDays = data.startdays,
          deadline = data.deadline;

          if(data.testdate) {
            var testDate = dfs.countdownv2.convertDate(data.testdate);
          } else {
            var testDate = "";
          }
          dfs.countdownv2.timerID[index] = setInterval(function () {

            //process Dynamic header/footer

            for (var i in data) {
                // check date ranges

                if (i.indexOf('daterange') > -1 && data[i] !== "") {
                  //process daterange
                  var thisDateRange = data[i].split(',');
                  // 0 = startDate / 1 = endDate / 2 = headerText / 3 = footerText
                  var startDate = dfs.countdownv2.convertDate(thisDateRange[0].trim()),
                      endDate = dfs.countdownv2.convertDate(thisDateRange[1].trim());
                      endDate.setHours(23,59,59);
                      var headText = thisDateRange[2].trim(),
                      footText = thisDateRange[3].trim();

                  if(dfs.countdownv2.checkDateRange(startDate, endDate, testDate)) {
                    $(_this).children('h6.cdHeader').html(headText);
                    $(_this).children('h6.cdFooter').html(footText);
                  }

                }

            }


            // process countdown
            var jdate = dfs.countdownv2.convertDate(deadline);
            var timer = dfs.countdownv2.timeRemaining(jdate, testDate);
            if(startDays >= timer.days) {
              var timerHtml = "<p><span class=\"cdDays\">" + timer.days + "</span> Days</p><p><span class=\"cdHours\">" + timer.hours + "</span> Hours</p><p><span class=\"cdMinutes\">" + timer.minutes + "</span> Minutes</p><p><span class=\"seconds\">" + timer.seconds + "</span> Seconds</p><div class=\"clearfix\"></div>";
              if(timer.days < 0) {
                dfs.countdownv2.stopTimer(index);
                $(_this).css('display','none');
              }
              $(_this).children('section').html(timerHtml);
              if( timer.days == 0 && !dfs.countdownv2.isMobile() ){
                //show ending footer if last day and desktop
                $(_this).next('div').css('display','block');
              }
            } else {
              // // no countdown text
              $(_this).children('section').html('');
            }
          }
            ,1000);
    });
  },
  stopTimer:function(id){
    // id is the timerID array key ie. 0 for the first countdown etc..
    clearInterval(this.timerID[id]);
  },
  previewDate: function(newDate){
    $('.countdown_v2').each(function(index){
      $(this).data().testdate = newDate;
        console.log('TimerID:' + index, 'Showing new date: ' + newDate);
        // clear existing countdowns
        clearInterval(dfs.countdownv2.timerID[index]);

    });

    this.init();
  }

};

dfs.updateElement = function(){
  var test4Element = $('#myCarousel');
    if(test4Element.length) {
          $('#myCarousel').carousel({ interval: 6000});
          $('#myCarousel').carousel('pause');
        clearInterval(PollElement);
        console.log('Carousel Ready and Initiated : ' + PollElement);
        // start Countdowns
          dfs.countdownv2.init();

    }
}

// start carousel if loaded..
var PollElement = setInterval(dfs.updateElement, 500);
