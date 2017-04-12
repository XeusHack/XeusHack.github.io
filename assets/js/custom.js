 window.onscroll = function() {
 	var gototop = document.getElementById('go-top');
 	//if (typeof(element) != 'undefined' && element != null)
 	
 	if (pageYOffset >= 1000) {
 		gototop.style.display = "block";
 	} else {
 		gototop.style.display = "none";

 	}
 };

 // post
 $(window).on('load', function() {
  $('.post-module').hover(function() {
    $(this).find('.post_description').stop().animate({
       height: "toggle",
     // opacity: "toggle"
    }, 300);
  });
});