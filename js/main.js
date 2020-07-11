$(document).ready(function(){
	
	// initialize select for materialize framework
    $('select').material_select();
    
    // grabbing geolocation; can remove console.log or make something pop up
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log("Geolocation is not supported by this browser.");
	}
	
	// making these global variables so they aren't just what they are within the function
	var currentLatitude;
	var currentLongitude;
	
	// grabbing geolocation and turning them into our variables
	function showPosition(position) {
		console.log(position);
		currentLatitude = position.coords.latitude;
		currentLongitude = position.coords.longitude;
	}
    
    // smooth scroll to anchor function
    function scrollTo(id) {
	    $('html,body').animate({scrollTop: $('#' + id).offset().top},'fast');
	}
    
    // info for restrictions
    var restrictions = {
/*
		'Dairy-Free': {
			name: 'Dairy-Free',
			icon: '<i class="fas fa-cheese-swiss"></i>',
			recipe: '&health=dairy-free',
			menu: '&intolerances=dairy'
		},
		'Egg-Free': {
			name: 'Egg-Free',
			icon: '<i class="fas fa-egg"></i>',
			recipe: '&health=egg-free',
			menu: '&intolerances=egg'
		},
		'Gluten-Free': {
			name: 'Gluten-Free',
			icon: '<i class="fas fa-bread-loaf"></i>',
			recipe: '&health=gluten-free',
			menu: '&intolerances=gluten'
		},
		'Keto': {
			name: 'Keto',
			icon: '<i class="fas fa-meat"></i>',
			recipe: '&health=keto-friendly',
			menu: '&diet=ketogenic'
		},
		'Paleo': {
			name: 'Paleo',
			icon: '<i class="fas fa-apple-alt"></i>',
			recipe: '&health=paleo',
			menu: '&diet=paleo'
		},
		'Pescatarian': {
			name: 'Pescatarian',
			icon: '<i class="fas fa-fish-cooked"></i>',
			recipe: '&health=pescatarian',
			menu: '&diet=pescetarian'
		},
		'Pork-Free': {
			name: 'Pork-Free',
			icon: '<i class="fas fa-pig"></i>',
			recipe: '&health=pork-free',
			menu: '&diet=vegetarian'
		},
		'Red Meat-Free': {
			name: 'Red Meat-Free',
			icon: '<i class="fas fa-steak"></i>',
			recipe: '&health=red-meat-free',
			menu: '&diet=vegetarian'
		},
		'Shellfish-Free': {
			name: 'Shellfish-Free',
			icon: '<i class="fas fa-fish"></i>',
			recipe: '&health=shellfish-free',
			menu: '&intolerances=shellfish'
		},
		'Soy-Free': {
			name: 'Soy-Free',
			icon: '<i class="fas fa-seedling"></i>',
			recipe: '&health=soy-free',
			menu: '&intolerances=soy'
		},
		'Wheat-Free': {
			name: 'Wheat-Free',
			icon: '<i class="fas fa-wheat"></i>',
			recipe: '&health=wheat-free',
			menu: '&intolerances=wheat'
		},
*/
		'Peanut-Free': {
			name: 'Peanut-Free',
			icon: '<i class="fas fa-acorn"></i>',
			recipe: '&health=peanut-free',
			menu: '&intolerances=peanut'
		},
		'Tree-Nut-Free': {
			name: 'Tree-Nut-Free',
			icon: '<i class="fas fa-tree-alt"></i>',
			recipe: '&health=tree-nut-free',
			menu: '&intolerances=tree-nut'
		},
		'Vegan': {
			name: 'Vegan',
			icon: '<i class="fas fa-carrot"></i>',
			recipe: '&health=vegan',
			menu: '&diet=vegan'
		},
		'Vegetarian': {
			name: 'Vegetarian',
			icon: '<i class="fas fa-salad"></i>',
			recipe: '&health=vegetarian',
			menu: '&diet=vegetarian'
		}
    };
    
    // create content section   
	var content = $('<section>').attr('id', 'content');
	var contentContainer = $('<div>').addClass('container');
	
	// create map container
	var map = $('<section>').attr('id', 'map');	
    
    // create footer   
	var footer = $('<footer>').attr('id', 'container');
	footer.html('<div class="row"><div class="col s12"><h2>Didn’t find what you’re looking for?</h2><a href="#hero" class="btn-large deep-orange lighten-2">Search Again</a></div></div>');
	
/*	
	// pull food joke API
	var jokeURL = "https://api.spoonacular.com/food/trivia/random?apiKey=e0a3536a362b46d38d50a5b045964f5a";

	$.ajax({
	  url: jokeURL,
	  method: "GET"
	}).then(function(response) {
		console.log('Food Joke API Response: ', response.text);
	});
*/

	
	// on form submit...
	$('#hero form').on('submit', function(event) {
		event.preventDefault();	 
		
		// clear html each time to prevent multiple populating
		$('#content .container').html('');
		
		// only run if search has a value, otherwise show alert
		if ($('#food-type').val() === '') {
			$('div#hero-content .alert').html('Search field cannot be blank.');
			return;
		}
		
		// hide alert once it runs
		$('div#hero-content .alert').html('&nbsp;');
		
		// pull food type value
		var foodType = $('#food-type').val();
		
		// create empty strings to fill in for loop
		var iconString = ''
		var recipeQueryString = '';
		var menuQueryString = '';		
			
		// pull choices and create an array from it
		var restrictionChoices = $('#restrictions input').val();
		var restrictionArray = restrictionChoices.split(', ');
		
		// if restrictions aren't blank, update strings
		if (restrictionChoices !== 'Dietary Restrictions') {
			// for each form option selected, add elements to strings
			restrictionArray.forEach(function(i) {			
				iconString = iconString.concat(restrictions[i].icon);
				recipeQueryString = recipeQueryString.concat(restrictions[i].recipe);
				menuQueryString = menuQueryString.concat(restrictions[i].menu);			
			});
		}

		// pull recipe API
	    var recipeURL = 'https://api.edamam.com/search?app_id=d544ae9f&app_key=c5ad09c117643ee56f64724e79d6a318&to=12' + '&q=' + foodType;	    
	    if (recipeQueryString !== '') {
		    recipeURL = 'https://api.edamam.com/search?app_id=d544ae9f&app_key=c5ad09c117643ee56f64724e79d6a318&to=12' + '&q=' + foodType + recipeQueryString;
	    }	    
	    var recipeRequest = $.ajax({
		  url: recipeURL,
		  method: "GET"
		});
		
		// pull menu API
		var menuURL = 'https://api.spoonacular.com/food/menuItems/search?apiKey=e0a3536a362b46d38d50a5b045964f5a&number=12' + '&query=' + foodType;		
		if (menuQueryString !== '') {
		    menuURL = 'https://api.spoonacular.com/food/menuItems/search?apiKey=e0a3536a362b46d38d50a5b045964f5a&number=12' + '&query=' + foodType + menuQueryString;
	    }	
		var menuRequest = $.ajax({
		  url: menuURL,
		  method: "GET"
		});
		
		$.when(recipeRequest, menuRequest).done(function(responseRecipe, responseMenu) {
			
			// create recipe section
		    var recipes = $('<section>').attr('id', 'recipes').addClass('row');
		    var recipeHeading = $('<div>').addClass('col s12').html('<h2>In the Kitchen</h2>');
		    var recipeCarousel = $('<div>').addClass('owl-carousel owl-theme col s12');
			
			responseRecipe[0].hits.forEach(function(i) {
				
				// create card
				var recipeCard = $('<div>').addClass('card');
				
				// create card image items
				var recipeImageContainer = $('<div>').addClass('card-image');
				var recipeImage = $('<div>').addClass('image');
				recipeImage.attr('style', 'background-image: url(' + i.recipe.image + ')');		
				var recipeButton = $('<a>').addClass('btn-floating btn-large halfway-fab deep-orange lighten-2');
				recipeButton.attr('target', '_blank').attr('href', i.recipe.shareAs);
				recipeButton.html('<i class="fal fa-clipboard-list"></i>');
				
				// create card content items
				var recipeContent = $('<div>').addClass('card-content');		
				var recipeSource = $('<p>').attr('id', 'recipe-source');
				recipeSource.text(i.recipe.source);		
				var recipeName = $('<h3>').attr('id', 'recipe-name');
				recipeName.text(i.recipe.label);		
				var recipeIcons = $('<div>').attr('id', 'icons');
				recipeIcons.html(iconString);		
		
				// append all card items
				recipeImageContainer.append(recipeImage, recipeButton);
				recipeContent.append(recipeSource, recipeName, recipeIcons);
				recipeCard.append(recipeImageContainer, recipeContent);		
				recipeCarousel.append(recipeCard);
				
			});
	
			// append recipe section
			recipes.append(recipeHeading, recipeCarousel);
			contentContainer.append(recipes);
		
			// recipe API carousel
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
			
			// create menus section
		    var menus = $('<section>').attr('id', 'menus').addClass('row');
		    var menusHeading = $('<div>').addClass('col s12').html('<h2>Venture Out</h2>');
		    var menusCarousel = $('<div>').addClass('owl-carousel owl-theme col s12');
		    
		    responseMenu[0].menuItems.forEach(function(i) {
				
				// create card
				var menusCard = $('<div>').addClass('card');
				
				// create card image items
				var menusImageContainer = $('<div>').addClass('card-image');
				var menusImage = $('<div>').addClass('image');
				menusImage.attr('style', 'background-image: url(' + i.image + ')');		
				var menusButton = $('<a>').addClass('btn-floating btn-large halfway-fab cyan');
				// update this when you update restaurant name from restaurant api
				menusButton.attr("data-restaurant-name", i.restaurantChain);
				menusButton.html('<i class="fal fa-map-marker-alt"></i>');
				
				// create card content items
				var menusContent = $('<div>').addClass('card-content');		
				var menusRestaurant = $('<p>').attr('id', 'restaurant');
				menusRestaurant.text(i.restaurantChain);		
				var menusName = $('<h3>').attr('id', 'menu-name');
				menusName.text(i.title);		
				var menusIcons = $('<div>').attr('id', 'icons');
				menusIcons.html(iconString);		
		
				// append all card items
				menusImageContainer.append(menusImage, menusButton);
				menusContent.append(menusRestaurant, menusName, menusIcons);
				menusCard.append(menusImageContainer, menusContent);		
				menusCarousel.append(menusCard);
				
				// on menu item button click...
				menusButton.on("click", function (event) {
					window.location.href="https://www.google.com/maps/search/?api=1&query=" + i.restaurantChain;

					event.preventDefault();
					$("#map").attr("style", "display: block");
					
					var restaurantMap = $(this).attr("data-restaurant-name");
					console.log({ restaurantMap });
	
					var mapURL =
					  "https://api.tomtom.com/search/2/search/" +
					  restaurantMap +
					  ".json?key=gAoUziAVGJqNlbKWdEdy63iT9N34AHHX&lat=" +
					  currentLatitude +
					  "&lon=" +
					  currentLongitude +
					  "&radius=40233";
	
					$.ajax({
					  url: mapURL,
					  method: "GET",
					}).then(function (response) {
					  console.log("Map API Response", response);
					});
	
				});
				
			});
			
			// append menus section
			menus.append(menusHeading, menusCarousel);
			contentContainer.append(menus);
			
			// menu API carousel
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

		// append content section
		content.append(contentContainer);
		$('body').append(content);
		
		$('body').append(map, footer);	
		$('#map').attr('style', 'display: none');    
	       
		scrollTo('content'); 
		
		// on footer button click...
	    $('footer a.btn-large').on('click', function(event) {
		   event.preventDefault();
		   scrollTo('hero');
	    });
	    
    });

});
