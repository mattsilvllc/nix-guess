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

  $('#form-q').submit(function(event){
    event.preventDefault();
    var data = {
      answer: $('#ans').val(),
      item: $('#upc').val()
    };
    
    NProgress.start();

    $.post('/guess', data)
    .done(function (result) {
      var $alert = result.correct ? $('#alert-correct') : $('#alert-incorrect')
      $alert.find('.answer').text(result.answer).end().fadeIn();

      NProgress.done();

      setTimeout(function(){
        $alert.alert('close');
        window.location.href = '/guess';
      },4000);
    })
    .fail(function (data) {
      error = data.responseJSON.error;
      console.log('failed, ', error);
    });

  });
});
