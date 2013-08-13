$(function() {
	/*
	number of fieldsets
	*/
	var fieldsetCount = $('#formElem').children().length;
	
	/*
	current position of fieldset / navigation link
	*/
	var current 	= 1;
    
	/*
	sum and save the widths of each one of the fieldsets
	set the final sum as the total width of the steps element
	*/
	var stepsWidth	= 0;
    var widths 		= new Array();
	$('#steps .step').each(function(i){
        var $step 		= $(this);
		widths[i]  		= stepsWidth;
        stepsWidth	 	+= $step.width();
    });
	$('#steps').width(stepsWidth);
	
	/*
	to avoid problems in IE, focus the first input of the form
	*/
	$('#formElem').children(':first').find(':input:first').focus();	
	
	/*
	show the navigation bar
	*/
	$('#navigation').show();
	
	/*
	when clicking on a navigation link, the form slides to the corresponding fieldset
	*/
    $('#navigation a').bind('click',function(e){
		var $this	= $(this);
		var prev	= current;
		$this.closest('ul').find('li').removeClass('selected');
        $this.parent().addClass('selected');
		/*
		we store the position of the link in the current variable	
		*/
		current = $this.parent().index() + 1;
		/*
		animate or slide to the next or to the corresponding fieldset. 
		The order of the links in the navigation is the order of the fieldsets.
		Also, after sliding, we trigger the focus on the first input element of the new fieldset
		If we clicked on the last link (confirmation), then we validate all the fieldsets, otherwise we validate the previous one before the form slided
		*/
        $('#steps').stop().animate({
            marginLeft: '-' + widths[current-1] + 'px'
        },500);
        e.preventDefault();
    });
	/*
	on hover, conjures a tooltip
	http://jsfiddle.net/gilly3/b3PjW/
	*/
	$(function() {
		$(".tooltip").hover(function() {
			var tooltip = $("> div", this).show();
			var pos = tooltip.offset();
			tooltip.hide();
			var right = pos.left + tooltip.width();
			var pageWidth = $(document).width();
			if (pos.left < 0) {
				tooltip.css("marginLeft", "+=" + (-pos.left) + "px");
			}
			else if (right > pageWidth) {
				tooltip.css("marginLeft", "-=" + (right - pageWidth));
			}
			tooltip.fadeIn('slow');
		}, function() {
			$("> div", this).fadeOut('slow', function() {$(this).css("marginLeft", "");});
		});
	});
	
	/*
		another tooltip
		appropriated from: http://css-tricks.com/bubble-point-tooltips-with-css3-jquery/
	*/
	
	// IIFE to ensure safe use of $
	(function( $ ) {

	// Create plugin
	$.fn.tooltips = function(el) {

		var $tooltip,
		  $body = $('body'),
		  $el;

		// Ensure chaining works
		return this.each(function(i, el) {

		  $el = $(el).attr("data-tooltip", i);

		  // Make DIV and append to page 
		  var $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('title') + '<div class="arrow"></div></div>').appendTo("body");

		  // Position right away, so first appearance is smooth
		  var linkPosition = $el.position();

		  $tooltip.css({
			top: linkPosition.top - $tooltip.outerHeight() - 13,
			left: linkPosition.left - ($tooltip.width()/2)
		  });

		  $el
		  // Get rid of yellow box popup
		  .removeAttr("title")

		  // Mouseenter
		  .hover(function() {

			$el = $(this);

			$tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');

			// Reposition tooltip, in case of page movement e.g. screen resize                        
			var linkPosition = $el.position();

			$tooltip.css({
			  top: linkPosition.top - $tooltip.outerHeight() - 13,
			  left: linkPosition.left - ($tooltip.width()/2)
			});

			// Adding class handles animation through CSS
			$tooltip.addClass("active");

			// Mouseleave
		  }, function() {

			$el = $(this);

			// Temporary class for same-direction fadeout
			$tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");

			// Remove all classes
			setTimeout(function() {
			  $tooltip.removeClass("active").removeClass("out");
			  }, 300);

			});

		  });

		}

	});
});