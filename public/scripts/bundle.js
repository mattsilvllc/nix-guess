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
    var ans = $('#ans').val();
    if(ans != "248") {
      $(this).attr('action','alert2.html');
    }
  });
});
