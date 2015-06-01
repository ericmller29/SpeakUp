var SpeakUp = SpeakUp || {};

SpeakUp = (function($){
	'use strict';

	var app = {},
		_this,
		saveValue = {
			fields: [],
			recipients: []
		},
		elements = {
			addField: $('#js-add-field'),
			addRecipient: $('#js-add-recipient'),
			fieldLabel: $('#js-field-label'),
			fieldName: $('#js-field-name')
		};

	app.init = function(){
		_this = this;

		_this.checkForValues();
		_this.addListeners();
	};

	app.addListeners = function(){
		elements.addField.on('click', _this.addAField);
		elements.addRecipient.on('click', _this.addARecipient);

		elements.fieldLabel.on('keyup', _this.generateName);

		// elements.deleteBtn.on('click', deleteField);
		$('body').on('click', '#js-delete-field', deleteField);
		$('body').on('click', '#js-toggle-options', toggleOptions);

		$('body').on('click', '#js-save-field', saveTheField);
	};

	app.checkForValues = function(){
		if($('#speak_up_fields').val() === ''){
			return true;
		}

		var currentfields = JSON.parse($('#speak_up_fields').val()),
			fields = currentfields.fields;

		if(fields.length === 0){
			$('#js-fields-list').hide();

			return true;
		}

		if(fields.length > 0){
			$('#js-no-fields').hide();
		}

		for(var i = 0; i <= fields.length-1; i++){
			$('#js-fields-list').append(generateFieldHtml(fields[i]));
		}
	};

	app.addAField = function(e){
		var field = {
			name: elements.fieldName.val(),
			label: elements.fieldLabel.val(),
			type: $('#js-field-type').val(),
			required: $('#js-field-required-add').is(':checked'),
			placeholder: "",
			field_id: "",
			container_class: ""	
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
		
		if($('#js-no-recipients').is(':visible')){
			$('#js-no-recipients').hide();
		}

		if(!$('#js-recipients-list').is(':visible')){
			$('#js-recipients-list').show();
		}

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

	function toggleOptions(e){

		if($(this).parent().hasClass('active')){

			$(this).parent().removeClass('active');

		}else{
			$(this).parent().parent().find('.active').find('.options').slideUp('fast');
			$(this).parent().parent().find('.active').removeClass('active');

			$(this).parent().addClass('active');
		}

		$(this).next().slideToggle('fast');

		e.preventDefault();
	}

	function deleteField(e){
		/*
		* this is annoying. It just goes up the tree
		* Start: a.delete
		* Up one: ul.actions li
		* Up two: ul.actions
		* Up three: div.options
		* Up four: li (correct parent)
		*/
		var index = $(this).parent().parent().parent().parent().parent().index(),
			prompt = window.confirm('Are you sure you want to delete this field?');

		if(prompt){
			// Remove the field from the save value.
			saveValue.fields.splice(index, 1);
			$('#speak_up_fields').val(JSON.stringify(saveValue));

			// Remove the field from the list
			$('#js-fields-list > li').eq(index).remove();

			if(saveValue.fields.length === 0){
				$('#js-no-fields').show();
				$('#js-fields-list').hide();
			}
		}

		e.preventDefault();
	}

	function saveTheField(e){
		/*
		* this is annoying. It just goes up the tree
		* Start: a.delete
		* Up one: ul.actions li
		* Up two: ul.actions
		* Up three: div.options
		* Up four: li (correct parent)
		*/
		var index = $(this).parent().parent().parent().parent().parent().index(),
			values = $(this).parent().parent().parent(),
			field = saveValue.fields[index],
			placeholder = values.find('#placeholder').val(),
			field_name = values.find('#field_name').val(),
			field_id = values.find('#field_id').val(),
			container_class = values.find('#container_class').val(),
			field_required = values.find('#js-field-required').is(':checked');

		field.placeholder = placeholder;
		field.name = field_name;
		field.field_id = field_id;
		field.container_class = container_class;
		field.required = field_required;

		$('#speak_up_fields').val(JSON.stringify(saveValue));

		$(this).parent().parent().parent().parent().parent().find('.options').slideUp('fast');
		$(this).parent().parent().parent().parent().parent().removeClass('active');

		save();

		e.preventDefault();
	}

	function generateFieldHtml(field){
		var html = '';

		html += '<li>';

			html += '<a href="#" alt="Open the options for the ' + field.label + ' field" title="Open the options for the ' + field.label + ' field" id="js-toggle-options">';
				html += '<h4>' + field.label + '</h4>';

				html += '<i class="fa fa-caret-down"></i>';
			html += '</a>';
			html += '<div class="options">';
				html += '<form class="options-form">';

				switch(field.type){
					case "text":
						html += '<div class="grid">';
							html += '<div class="half">';
								html += '<label for="field_name">Field Name:</label>';
								html += '<input type="text" name="field_name" id="field_name" placeholder="Field Name" value="' + field.name + '">';
							html += '</div>';
							html += '<div class="half right">';
								html += '<label for="placeholder">Placeholder:</label>';
								html += '<input type="text" name="placeholder" id="placeholder" placeholder="Placeholder" value="' + field.placeholder + '">';
							html += '</div>';
							html += '<div class="half">';
								html += '<label for="field_id">Field ID:</label>';
								html += '<input type="text" name="field_id" id="field_id" placeholder="Field ID" value="' + field.field_id + '">';
							html += '</div>';
							html += '<div class="half right">';
								html += '<label for="container_class">Container Class:</label>';
								html += '<input type="text" name="container_class" id="container_class" placeholder=".col-md-6" value="' + field.container_class + '">';
							html += '</div>';

							html += '<div class="full">';
								html += '<label for="js-field-required-' + field.name + '">';
									html += '<input type="checkbox" name="is_required" id="js-field-required"' + ((field.required) ? ' checked="checked"' : '') + '>';
									html += 'Is this field required?';
								html += '</label>';
							html += '</div>';
						html += '</div>';
					break;
				}

				html += '<ul class="actions">';
					html += '<li><a href="#" id="js-delete-field" alt="Delete this field" title="Delete this field" class="delete">Delete</a></li>';
					html += '<li><button type="submit" id="js-save-field" alt="Save this field" title="Save this field">Save</button></li>';
				html += '</ul>';
				html += '</form>';
			html += '</div>';

		html += '</li>';

		//Append the field to the input to save to wordpress
		saveValue.fields.push(field);
		$('#speak_up_fields').val(JSON.stringify(saveValue));

		return html;
	};

	function save(){
		var formData = $('form[name="speak_up_options"]').serialize();

		$.post('options.php', formData);
	}

	return app;

}(jQuery));

jQuery(function(){
	SpeakUp.init();
});