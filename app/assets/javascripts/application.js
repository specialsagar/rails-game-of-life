// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require jquery_ujs
//= require_tree .




// initialize global vars
var timer,load = true,cells = [],count = 0;

$(function(){
	function loadNextGen() {
		// show generation count
		count ++;
		$('#generation_count').text(count);

		if (load) {
			loadCells();
		}

		$.ajax({
			url: "/start_game",
			method: "POST",
			data: {'rows': rows, 'cols': cols, 'load': load, 'cells': cells},
		});
		load = false;
	}

	// create mapping of all live cells
	function loadCells() {
		$('.active').each(function(){
			var col = parseInt($(this).data('col'));
			var row = parseInt($(this).data('row'));
			cells.push([row,col]);
		});
	}

	$(document).on('click', '#start', function(e){
		$(this).addClass('hidden');
		$('#stop').removeClass('hidden');
		$('#next').addClass('hidden');
		// repeat process every 1s
	    timer = setInterval(loadNextGen, 1000);
	});

	$(document).on('click', '.cell', function(){
		// allow updating cells only first time
		if (load) {
			if(!$(this).hasClass("active")) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}
		}
	});

	$(document).on('click', '#stop', function(e){
		$('#start').removeClass('hidden');
		$('#next').removeClass('hidden');
		clearInterval(timer);
	});

	$(document).on('click', '#next', function(e){
		loadNextGen();
	});
});
