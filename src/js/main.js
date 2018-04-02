 FontAwesomeConfig = { searchPseudoElements: true };
$(function() {
  $(".nav-toggle").on("click", function() {
    var that = $(this);    
    if (that.hasClass("is-open")) {
      that.removeClass("is-open").addClass("is-closed");
      $('.header').removeClass('header--active');     
      $('body').removeClass('nav-active');     
    } else {
      that.removeClass("is-closed").addClass("is-open");    
       $('.header').addClass('header--active'); 
       $('body').addClass('nav-active'); 
    }    
  });
});    