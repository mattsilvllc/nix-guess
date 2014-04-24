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
    
    $.post('/guess', data)
    .done(function (result) {
      console.log('result: ', result);
    })
    .fail(function (data) {
      error = data.responseJSON.error;
      console.log('failed, ', error);
    });

  });
});
