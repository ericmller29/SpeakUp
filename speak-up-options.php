<?php


//add admin options menu item
add_action('admin_menu', 'add_speak_up_admin');
add_action('admin_init', 'speak_up_init');


function add_speak_up_admin(){
	add_options_page('Speak Up', 'Speak Up', 'manage_options', 'speak-up', 'speak_up_options_page');
}

function speak_up_init(){
	wp_register_style('speak-up', plugin_dir_url( __FILE__ ) . 'css/speak_up.css');
	wp_register_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');
	wp_enqueue_style('speak-up');
	wp_enqueue_style('font-awesome');

	register_setting('speak_up_options', 'speak_up_options', 'speak_up_options_validate');

	add_settings_section('speak_up_fields', '', 'speak_up_form_fields', 'speak-up');
}

function speak_up_form_fields(){ ?>
	<div class="options-container">
		<div class="postbox-container form-fields">		
			<div class="postbox">
				<h3 class="hndle">Form Fields</h3>

				<p class="no-fields">
					You have not created any fields yet!
				</p>
				<!-- <ul class="forms-list">
					<li>
						<h4>Text Box</h4>
						<a href="#" alt="Remove the text box" title="Remove the text box">
							<i class="fa fa-times-circle"></i>
						</a>
					</li>
					<li>
						<h4>Text Box</h4>
						<a href="#" alt="Remove the text box" title="Remove the text box">
							<i class="fa fa-times-circle"></i>
						</a>
					</li>
				</ul> -->
			</div>
		</div>

		<div class="postbox-container users">		
			<div class="postbox">
				<h3 class="hndle">Recipients</h3>
				<p class="no-fields">
					You have not added any recipients yet!
				</p>
			</div>
		</div>

		<div class="postbox-container add-more">
			<div class="postbox">
				<h3 class="hndle">Add a new field</h3>
				<table class="form-table">
					<tbody>
						<tr>
							<td>
								<select>
									<option>Field Type</option>
									<option value="text">Text Box</option>
									<option value="text">Text Box</option>
									<option value="text">Text Box</option>
								</select>
							</td>
							<td>
								<input type="text" name="field_label" placeholder="Field Label">
							</td>
							<td>
							<input type="text" name="field_name" placeholder="field_name" disabled="disabled">
							</td>
							<td>
								<label for="is_required">
									<input type="checkbox" name="is_required" id="is_required">
									Is this field required?
								</label>
							</td>
						</tr>
						<tr>
							<td colspan="3">
								<button class="button button-secondary" type="submit">Add A Field</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

<?php }

function speak_up_options_page(){ ?>
	
	<div class="wrap">
		<h2>Speak Up Options</h2>

		<form action="options.php" method="post">
			<?php settings_fields('speak_up_options'); ?>
			
			<?php do_settings_sections('speak-up'); ?>

			<input name="Submit" type="submit" class="button button-primary" value="<?php esc_attr_e('Save Changes'); ?>" />
		</form>
	</div>

<?php }
