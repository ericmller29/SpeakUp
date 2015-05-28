var SpeakUp = SpeakUp || {};

SpeakUp = (function($){
	'use strict';

	var app = {},
		_this,
		saveValue = [],
		elements = {
			addField: $('#js-add-field'),
			addRecipient: $('#js-add-recipient'),
			fieldLabel: $('#js-field-label'),
			fieldName: $('#js-field-name')
		};

	app.init = function(){
		_this = this;

		_this.addListeners();
	};

	app.addListeners = function(){
		elements.addField.on('click', _this.addAField);
		elements.addRecipient.on('click', _this.addARecipient);

		elements.fieldLabel.on('keyup', _this.generateName);
	};

	app.addAField = function(e){
		var field = {
			name: elements.fieldName.val(),
			label: elements.fieldLabel.val(),
			required: $('#js-field-required').is(':checked')
		};

		if($('#js-no-fields').is(':visible')){
			$('#js-no-fields').hide();
		}

		if(!$('#js-fields-list').is(':visible')){
			$('#js-fields-list').show();
		}

		$('#js-fields-list').append(generateFieldHtml(field));

		e.preventDefault();
	};

	app.addARecipient = function(e){
		alert('Recipient Added');

		e.preventDefault();
	};

	app.generateName = function(){
		var name = elements.fieldLabel.val();

		/*
		* Disallow special characters
		*/
		name = name.replace(/[^a-zA-Z0-9 ]/g, "");

		/*
		* Replace spaces with underscores
		*/
		name = name.replace(/ /g,"_");

		/*
		* Make it all lowercase
		*/
		name = name.toLowerCase();

		/*
		* Send it to the name field!
		*/
		elements.fieldName.val(name);
	};


	function generateFieldHtml(field){
		var html = '';

		html += '<li>';

			html += '<h4>' + field.label + '</h4>';

			html += '<a href="#" alt="Remove the ' + field.label + '" title="Remove the ' + field.label + '">';
				html += '<i class="fa fa-times-circle"></i>';
			html += '</a>';

		html += '</li>';

		//Append the field to the input to save to wordpress
		saveValue.push(field);
		$('#speak_up_fields').val(JSON.stringify(saveValue));

		return html;
	};

	return app;

}(jQuery));

jQuery(function(){
	SpeakUp.init();
});