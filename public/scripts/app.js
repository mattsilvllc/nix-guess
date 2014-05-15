$(function () {
  var navigation = responsiveNav(".nav-collapse", {
    animate: true,
    transition: 284,
    customToggle: "toggle",
    closeOnNavClick: false,
    openPos: "relative",
    navClass: "nav-collapse",
    navActiveClass: "js-nav-active",
    jsClass: "js",
    init: function(){},
    open: function(){},
    close: function(){}
  });

  var opts = {
    lines: 13, // The number of lines to draw
    length: 22, // The length of each line
    width: 10, // The line thickness
    radius: 30, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
  };

  toastr.options.closeButton = true;
  toastr.options.positionClass = 'toast-top-full-width';

  $('.answer').click(function(event){
    event.preventDefault();
    $('.answer').attr('disabled','disabled');
    
    var data = {
      answer: parseInt($(this).text(), 10),
      item: $('#upc').val()
    };
    console.log(data);
    var target = $('.spin')[0];
    $('.shadow-container').show();
    var spinner = new Spinner(opts).spin(target);


    $.post('/guess', data)
    .done(function (result) {
      spinner.stop();
      $('.shadow-container').hide();

      if (result.correct) {
        toastr.success('Nice guess! ' + result.answer + ' is the answer. +1 point! Try another...');
      } else {
        toastr.error('Sorry, correct answer is ' + result.answer + ' calories. Try another...');
      }

      setTimeout(function(){
        toastr.clear();
        window.location.href = '/guess';
      },2500);
    })
    .fail(function (data) {
      spinner.stop();
      $('.shadow-container').hide();

      error = data.responseJSON.error;
      console.log('failed, ', error);
    });

  });
});
