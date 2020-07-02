$(document).ready(function(){
	
    $('select').material_select();
  
	$('#recipes .owl-carousel').owlCarousel({

		margin: 20,
		responsiveClass:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        575:{
	            items:2
	        },
	        767:{
	            items:3
	        },
	        1199:{
	            items:4,
	            loop:true
	        }
	    },
		loop: true,
		nav:true,
		navText: ['',''],
		dots: false,
		lazyLoad: false,
		autoplay: false,
		navSpeed: 500
	});
	
	$('#menus .owl-carousel').owlCarousel({

		margin: 20,
		responsiveClass:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        575:{
	            items:2
	        },
	        767:{
	            items:3
	        },
	        1199:{
	            items:4,
	            loop:true
	        }
	    },
		loop: true,
		nav:true,
		navText: ['',''],
		dots: false,
		lazyLoad: false,
		autoplay: false,
		navSpeed: 500
	});



});