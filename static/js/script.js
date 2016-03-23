$(document).ready(function(){

	// resize
	function modalHeight() {
		videoHeight = $(window).height();
		$('.video-modal').css('height', videoHeight - 50);
	};
	modalHeight();

	$(window).resize(function() {
		modalHeight();
	});


	if ($(window).width() >= 768) {  
		function setHeight() {
			windowHeight = $(window).height();
			$('#main_Content').css('min-height', windowHeight);
			$('.right_viewArea').css('min-height', windowHeight + 20);
			$('.leftPanel').css('min-height', windowHeight);
			$('.left-panel-scroll').css('height', windowHeight - 200);
		};
		setHeight();

		$(window).resize(function() {
			setHeight();
		});



		$('.leftPanel ul li').click(function(event){
			event.preventDefault();
			$('#leftView').addClass('mob-none');
			$('#rightView').removeClass('mob-none');
			$('.leftPanel ul li').removeClass('active');
			//$('.deletePrompt').hide();
			$(this).addClass('active');
			//alert('clicked')
		});
		$('.video-thumbnails.large ul li a').click(function(event){
			event.preventDefault();
			$('.video-thumbnails.large ul li a').removeClass('active');
			$(this).addClass('active');
		});
		$('.video-thumbnails.small ul li a').click(function(event){
			event.preventDefault();
			$('.video-thumbnails.small ul li a').removeClass('active');
			$(this).addClass('active');
		});

		$(".leftPanel").sticky({topSpacing:80});

		// Nice scroll
		$(".left-panel-scroll").niceScroll();


		function sticky_relocate() {
			var window_top = $(window).scrollTop();
			var div_top = $('#sticky-anchor').offset().top;
			var targetOffset = $("#anchor-point").offset().top;

			if (window_top > div_top) {
				$('.leftPanel').addClass('stick');
				$('.header-midMenu').removeClass('hide');
				$('.nav-categories').addClass('hide');
			} else {
				$('.leftPanel').removeClass('stick');
				$('.header-midMenu').addClass('hide');
				$('.nav-categories').removeClass('hide');
			}
		}

		$(function () {
			$(window).scroll(sticky_relocate);
			sticky_relocate();
		});
	}  

	$( ".close-progress" ).click(function() {
		$( this ).parent().slideUp("slow")
	});   

	// Media tabs upload

	$(".icn").click(function(event) {
		//event.preventDefault();
		//$('.icn').hide();
		//$(this).show();
	});

	// Delete prompt
	$('.deleteTrash').on('click', function(e){
		e.preventDefault();
		$(this).closest('li').find('.deletePrompt').removeClass('hide');
		e.stopPropagation();
	});


	// Video modal open
	$('.pl_thumbHolder .thumbnail').click(function(){
		$('body').css('overflow', 'hidden');
		$('.video-modal').fadeIn();
		$('.body-overlay').fadeIn();
	});
	$('.btn-done').click(function(){
		$('body').css('overflow', 'visible');
		$('.video-modal').fadeOut();
		$('.body-overlay').fadeOut();
	});
});


