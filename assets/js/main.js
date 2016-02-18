jQuery(function(){
  //dropdownMenu();
  mobileMenuButton();
  setUp();
  searchInput();
  initScrollMagic();
  initSlick();
});



function mobileMenuButton() {
	$(".mobile-menu-btn").click(function(e){
		e.preventDefault();
		$(this).next(".pac-menu").children(".menu-container").slideToggle();
		$('.child-menu').slideUp();
	});
}


function setUp() {
	var options = $('.menu-item').toArray().map(
  	function(menuOption){
    	var optn = {
      	isClosed: true,
        open: function(){
        	$(menuOption).children('.child-menu').slideDown();
          hideOthers(optn);
          hideSiblings(optn);
          optn.isClosed = false;
        },
        close: function() {
        	$(menuOption).children('.child-menu').slideUp();
          showSiblings();
          optn.isClosed = true;
        },
        toggle: function() {
        	if (optn.isClosed) { optn.open(); }
          else { optn.close();}
        },
        hideSibling: function() {
        	$(menuOption).hide();
        },
        showSibling: function() {
        	$(menuOption).show();
        }
      };
      $(menuOption).children('.menu-btn').click(function(e){
        if($(menuOption).children('.child-menu').length > 0){
            e.preventDefault();
            optn.toggle();
        }
      });   
      return optn;
    }
  );
	
  function hideOthers(optn) {
  options.forEach(function (opt) {
    	if(opt !== optn) {
        opt.close();
      }
    });
  }
  function hideSiblings(optn) {
  if ($( window ).width() >= 640) { return; }
  options.forEach(function (opt) {
    	if(opt !== optn) {
        opt.hideSibling();
      }
    });
  }
  function showSiblings() {
  if ($( window ).width() >= 640) { return; }
  options.forEach(function (opt) {
        opt.showSibling();
    });
  }
}



function searchInput() {
	if ($( window ).width() >= 1040) {
		$(".search-form").hide();
		$(".show-search-btn").click(function(e){
			$(this).toggleClass("active");
			$(".search-form").animate({width: 'toggle'});
		});
	}

	
}

// ======== PLUGINS ========

//ScrollMagic
function initScrollMagic() {
	// init controller
	var controller = new ScrollMagic.Controller();
	// Fix-menu Handler
	var fixMenu = new ScrollMagic.Scene({
		triggerElement: ".menu-wrapper", 
		triggerHook: 0,
		reverse: true 
	})
	.setPin(".menu-wrapper")
	.addTo(controller)

	if ($( window ).width() >= 1040) {
	var fixSideBar = new ScrollMagic.Scene({
		triggerElement: ".fixed-side-section", 
		triggerHook: 0,
		offset: -67,
		reverse: true 
	})
	.setPin(".fixed-side-section")
	.addTo(controller)
	}
	
}

//SlickSlider
function initSlick() {	
	if(($(".pac-slider").length > 0)){
			
			var $status = $('.pagingInfo');
			var $slickElement = $('.pac-slider');

			$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			    var i = (currentSlide ? currentSlide : 0) + 1;
			    $status.text(i + '/' + slick.slideCount);
			});

			$slickElement.slick({
				slide:'.slide-item',
				slidesToShow: 1,
				adaptiveHeight: false,
				//slidesToScroll: 1,
				 //variableWidth: true,
				arrows: true,
				dots: false,
				// centerMode: true,
				//centerPadding: 10,
				// slide: 'item',
				//focusOnSelect: true,
				autoplay: false,
				//autoplaySpeed: 3000
				//adaptiveHeight: true
				//variableWidth: true,
				//adaptiveHeight: true
				infinite: false,
				responsive: [
				{
				  breakpoint: 414,
				  settings: {
				    arrows: false
				  }
				}
				]
			});
	}
	
	
}









