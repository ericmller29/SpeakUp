var SpeakUp = SpeakUp || {};

SpeakUp = (function($){
	'use strict';

	var app = {},
		_this,
		elements = {
			addField: $('#js-add-field')
		};

	app.init = function(){
		_this = this;

		_this.addListeners();
	};

	app.addListeners = function(){
		elements.addField.on('click', _this.addAField);
	};

	app.addAField = function(e){
		alert('Field Added!');

		e.preventDefault();
	};

	return app;

}(jQuery));

jQuery(function(){
	SpeakUp.init();
});