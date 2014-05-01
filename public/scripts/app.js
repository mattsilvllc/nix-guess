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

  toastr.options.closeButton = true;
  toastr.options.positionClass = 'toast-top-full-width';

  $('#form-q').submit(function(event){
    event.preventDefault();
    var data = {
      answer: $('#ans').val(),
      item: $('#upc').val()
    };
    

    $.post('/guess', data)
    .done(function (result) {
      if (result.correct) {
        toastr.success('Nice guess! ' + result.answer + ' is the answer. +1 point! Try another...');
      } else {
        toastr.error('Sorry, correct answer is ' + result.answer + ' calories. Try another...');
      }

      setTimeout(function(){
        toastr.clear();
        window.location.href = '/guess';
      },4000);
    })
    .fail(function (data) {
      error = data.responseJSON.error;
      console.log('failed, ', error);
    });

  });
});
