var $j = jQuery.noConflict();


/**
	HUGE is the global namespace container
	@namespace
	@requires jQuery.js
*/
var MC = {};

/**
	@class
	@description General page initialization
*/
MC.general = {

	/**
		Initialize the app functions
	*/
	init: function() {
		MC.general.setGlobals();
		MC.general.matchHeights();
		
	},
	
	/**
		Set global functions
	*/
	setGlobals: function() {
		$j('body').addClass('has-js');
		$j('a[rel=external]').attr('target','_blank');
		$j('a[href=#]').click( function(e) {
			e.preventDefault();
		});		
	},
	
	/**
		Height matcher - NR Update 09-10
	*/
	matchHeights: function(set) {
		$j('#layer-base, #layer-top, .exposed, ').matchColumns();
		$j('.col-content').each( function() {
			//$j(this).find('li').matchColumns();
		});

	}

};

/**
	@class
	@description Home slider
*/
MC.homeSlider = {

	processing: false,
	slideAll: false,
	offsetWrapper: 0,
	offsetContent: 0,
	offsetLogo: 0,
	targetLogo: '0px',
	speed: 800,

	init: function() {
		// set defaults
		MC.homeSlider.slideAll = $j('body').hasClass('v2');
		MC.homeSlider.offsetMargin = $j('#layer-top .container').css('marginRight');
		MC.homeSlider.offsetWrapper = $j('#layer-top').css('width');
		MC.homeSlider.offsetWrapper 
		//MC.homeSlider.offsetLogo = $j('#logo').css('marginLeft');
		// set event handler
		$j('.btn-open-close').live('click', function(e) {
			e.preventDefault();
			if ( !MC.homeSlider.processing ){
				
				if ($j('#layer-top').hasClass('open')) {
					MC.homeSlider.close();
					
				}else{
					MC.homeSlider.open();	
					
					var t=setTimeout("MC.homeSlider.processing = false;",2000);
						
				}
				
			}
		});


	},
	
	open: function() {
		
		//createCookie("slider","open");
		
		MC.homeSlider.processing = true;
		$j('#right-content').removeClass('hide-content');
		
		$j('#right-content').addClass('reveal-content');
		
		
		$j('#layer-top').addClass('processing');
		
		$j('#layer-base .container, #homeHero').animate({ opacity: .4 }, 150 , 'easeInOutCubic', function() {
			
			$j('#layer-top .container').animate({ marginRight: 0	}, MC.homeSlider.speed , 'easeInOutCubic', function() {
				
				$j('#layer-top').addClass('open');
				$j('#layer-top').removeClass('processing');
				
				$j('#layer-top .logo').fadeIn();
			
				
				
			});
			
		    //s.linkTrackVars='prop1';
		    //s.prop1="home page slider close";
		    //s.pageName = "mckinsey home close";
		    //s.t();		
			
			
			if( MC.homeSlider.slideAll ) $j(this).animate({ marginLeft: MC.homeSlider.offsetMargin }, MC.homeSlider.speed , 'easeInOutCubic' );	
			
		});
		
		
	},

	
	close: function() {	
		//eraseCookie("slider");
		MC.homeSlider.processing = true;
		$j("#layer-top").removeClass('open');
		MC.homeSlider.processing = true;
		$j('#layer-top').addClass('processing');
		$j('#layer-top .logo').fadeOut( function() {
			$j('#layer-top .container').animate({ marginRight: MC.homeSlider.offsetMargin }, MC.homeSlider.speed, 'easeInOutCubic', function() {
				$j('#layer-base .container, #homeHero').animate({ opacity: 1 }, 450 , 'easeInOutCubic', function() {
					$j('#layer-top').removeClass('processing');
					$j('#right-content').addClass('hide-content');
					$j('#right-content').removeClass('reveal-content');

					MC.homeSlider.processing = false;
					
				});
			});
		});

		if( MC.homeSlider.slideAll ) $j('#layer-base .container').animate({ marginLeft: 0 }, MC.homeSlider.speed , 'easeInOutCubic' );
		
	}
	
}



/**
	@class
	@description Home world map
*/
MC.homeMap = {

	init: function() {
		// set defaults
		$j('.finder-container').css('display','none');
		
		//on click of the button in the map
		$j("#mck-map li").click(function(){
			var eId = $j(this).attr('id')+'-offices'; //get the button id
			$j("#"+eId).show().children('.clearfix').show(); 
			$j("#"+eId).siblings('div').hide(); //hide all of the other flyouts with the countries
		});
		
		//on click of the blue close button on the country flyouts
		$j(".close").click(function(){
			$j(this).parent().hide();//hide the flyout
		});

		
	}
	
}


function makeInputSearch(){
 	//search for the input box on the global nav when
	//the magnifying glass is clicked
	$j(".magniGlass").click(function(){
	    var str = $j("#TextBoxSearch").val();
	    // Munesh Veloor To be launched as part of the disallowed chars fix
	    //str = str.replace(/[@|^|*|?|<|>|=|#|%|{|}|\[|\]|\:|\;|\/]/g, "");
		str = str.replace(/[@|^|*|?|<|>|=|#|{|}|\[|\]|\;\/]/g,"");
		str = str.replace(/&/g,"%26");
		
		if (str !== '') {
			window.location = "/Search.aspx?q=" + str;
		}else{
		}
		
	});	
	
	//search for the input box in the globa nav
	//when the user left clicks
	$j("#TextBoxSearch").click(function(){
		var searchFor = $j(this).val();
		if(searchFor ==="Search"){
			
			$j(this).val('');
		}
	});	

	$j("#TextBoxSearch").keypress(function(e){
		var str = $j(this).val();
		if(str.length !==0){
			if(e.keyCode==13){
				
				if(str==''){
					return false;
	} else {
	            // Munesh Veloor - To be launched as part of the disallowed chars fix
	            str = str.replace(/[@|^|*|?|<|>|=|#|{|}|\[|\]|\;|\/]/g, "");
	            //str = str.replace(/[@|'|^|*|?|<|>|=|#|%|{|}|\[|\]|\;|(|)|$\/]/g, "");
					str = str.replace(/&/g,"%26");
					str = str.replace(/ /g,"%20");
					window.location = "/Search.aspx?q=" + str;
					return false;
				}
				
			}
		}
	});
 }


/**
	On document ready
*/
$j(document).ready(function() {
	/*MC.noConflict();*/
	MC.general.init();
	MC.homeSlider.init();
	MC.homeMap.init();
	$j(window).resize(function() {
	  $j('#layer-base, #layer-top, .exposed, ').matchColumns();
	});	
	
	makeInputSearch();
	
});

/*This function controlls the hover state of the global nav. It adds a slow delay ~1000 ms and sets the background color of the hovered element accordingly*/
$j(function() {
    hiConfig = {
        sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)
        interval: 100, // number = milliseconds for onMouseOver polling interval
        timeout: 0, // number = milliseconds delay before onMouseOut
        over: function() {
            $j(this).children('.flyout-container').show();
			//$j(this).children('.parent').css('backgroundColor','#00adef');
        }, // function = onMouseOver callback (REQUIRED)
        out: function() { 
			$j(this).children('.flyout-container').hide();
			//$j(this).children('.parent').css('backgroundColor','');
		}
    }
   $j("#nav li").hoverIntent(hiConfig)
});
/**
 	PLUGINS
*/

$j.fn.matchColumns = function(){
	

	var height_tar = $j(document).height();

	
	$j(this).css({"height": (height_tar ) + "px"});
}; // matchColumns

function PreloadSlider() {

	
}


 var textboxvalue
 function doClear(obj) 
 {
    obj.value = "";
 }

 function ImageButton_Click() {
     if (document.getElementById("<%=TextBoxSearch.ClientID%>").value == "" || document.getElementById("<%=TextBoxSearch.ClientID%>").value == "Search") {
         alert("Please enter one or more search terms");
         document.getElementById("<%=TextBoxSearch.ClientID%>").focus();
         return false;
     }
 return true;
 }
 
 
 
