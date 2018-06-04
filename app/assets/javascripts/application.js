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





$(function(){
	$(document.body).on('click', '#start', function(e){
		var load = true;
		var count = 1;

		var cells = [];
		// create mapping of all live cells
		$('.active').each(function(){
			var col = parseInt($(this).data('col'));
			var row = parseInt($(this).data('row'));
			cells.push([row,col]);
		});

		// refresh map 0.6s
		(function loop() {
			e.preventDefault();	
			// show generation count
			$('#start').remove();
			$('#generation_count').text(count);
			count ++;

			$.ajax({
				url: "/start_game",
				method: "POST",
				data: {load: load, rows: rows, cols: cols, cells: cells},
			});

			// repeat process
			setTimeout(function(){
				load = false;
				loop();
			}, 1000);	
		}());
	});
});

$(function(){
	$(document.body).on('click', '.cell', function(){
		if(!$(this).hasClass("active")) {
			$(this).addClass("active");
		} else {
			$(this).removeClass("active");
		}
	});
});
