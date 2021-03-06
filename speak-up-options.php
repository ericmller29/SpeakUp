<?php defined( 'ABSPATH' ) or die( 'No script kiddies please!' );


//add admin options menu item
add_action('admin_menu', 'add_speak_up_admin');
add_action('admin_init', 'speak_up_init');
add_action('admin_enqueue_scripts', 'speak_up_assets');


function add_speak_up_admin(){
	add_options_page('Speak Up', 'Speak Up', 'manage_options', 'speak-up', 'speak_up_options_page');
}

function speak_up_assets(){
	wp_enqueue_style('speak-up', plugin_dir_url( __FILE__ ) . 'css/speak_up.css');
	wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');

	wp_enqueue_script('speak-up', plugin_dir_url( __FILE__ ) . 'js/SpeakUp.admin.js', array(), false, true);
}

function speak_up_init(){
	register_setting('speak_up_options', 'speak_up_options', 'speak_up_options_validate');

	add_settings_section('speak_up_main', '', 'speak_up_form_fields', 'speak-up');

	// add_settings_field('speak_up_fields', '', 'speak_up_setting_fields', 'speak-up', 'speak_up_main');
}

function speak_up_form_fields(){ ?>
	
	<?php $options = get_option('speak_up_options'); ?>
	<textarea id="speak_up_fields" name="speak_up_options[fields]" style="display: none;"><?php echo $options['fields']; ?></textarea>
	<div class="options-container">
		<div class="postbox-container subject-line">		
			<div class="postbox">
				<h3 class="hndle">Subject Line</h3>
				<input type="text" name="speak_up_options[subject_line]" value="<?php echo (isset($options['subject_line'])) ? $options['subject_line'] : 'You received a message from %first_name% %last_name <%email%> - Speak Up'; ?>">
			</div>
		</div>

		<div class="postbox-container form-fields">		
			<div class="postbox">
				<h3 class="hndle">Form Fields</h3>

				<p class="no-fields" id="js-no-fields">
					You have not created any fields yet!
				</p>
				<ul class="forms-list" id="js-fields-list"></ul>

				<?php
					$fields = json_decode($options['fields'])->fields;
				?>
				<?php if(count($fields) > 0): ?>
<!-- 				<ul class="forms-list" id="js-fields-list">
					<?php foreach($fields as $field): ?>
						<li>
							<a href="#" alt="Open the options for the <?php echo $field->label; ?> field" title="Open the options for the <?php echo $field->label; ?> field" id="js-toggle-options">
								<h4><?php echo $field->label; ?></h4>

								<i class="fa fa-caret-down"></i>
							</a>
							<div class="options">
								<form class="options-form">
									<div class="grid">
										<div class="half">
											<label for="field_name">Field Name:</label>
											<input type="text" name="field_name" id="field_name" placeholder="Field Name" value="<?php echo $field->name; ?>">
										</div>
										<div class="half right">
											<label for="placeholder">Placeholder:</label>
											<input type="text" name="placeholder" id="placeholder" placeholder="Placeholder" value="<?php echo $field->placeholder; ?>">
										</div>
										<div class="half">
											<label for="field_id">Field ID:</label>
											<input type="text" name="field_id" id="field_id" placeholder="Field ID" value="<?php echo $field->field_id; ?>">
										</div>
										<div class="half right">
											<label for="container_class">Container Class:</label>
											<input type="text" name="container_class" id="container_class" placeholder=".col-md-6" value="<?php echo $field->container_class; ?>">
										</div>

										<div class="full">
											<label for="js-field-required-<?php echo $field->name; ?>">
												<input type="checkbox" name="is_required" id="js-field-required"<?php echo ($field->required) ? ' checked="checked"' : ''; ?>>
												Is this field required?
											</label>
										</div>
									</div>
									<ul class="actions">
										<li><a href="#" id="js-delete-field" alt="Delete this field" title="Delete this field" class="delete">Delete</a></li>
										<li><button type="submit" id="js-save-field" alt="Save this field" title="Save this field">Save</button></li>
									</ul>
								</form>
							</div>
						</li>
					<?php endforeach; ?>
				</ul>
				<?php else: ?>
				<p class="no-fields" id="js-no-fields">
					You have not created any fields yet!
				</p>
				<?php endif; ?> -->
			</div>
		</div>

		<div class="postbox-container users">		
			<div class="postbox">
				<h3 class="hndle">
					Recipients
					<a href="#" alt="Add a recipient" title="Add a recipient" class="add-recipient" id="js-add-recipient">
						<i class="fa fa-plus-circle"></i>
					</a>
				</h3>
				<p class="no-fields" id="js-no-recipients">
					You have not added any recipients yet!
				</p>
				<ul class="recipients-list" id="js-recipients-list"></ul>
			</div>
		</div>

		<div class="postbox-container add-more">
			<div class="postbox">
				<h3 class="hndle">Add a new field</h3>
				<table class="form-table">
					<tbody>
						<tr>
							<td>
								<select id="js-field-type">
									<option>Field Type</option>
									<option value="text">Text Box</option>
									<option value="email">Email</option>
									<option value="textarea">Text Area</option>
									<option value="select">Select Box</option>
								</select>
							</td>
							<td>
								<input type="text" name="field_label" placeholder="Field Label" id="js-field-label">
							</td>
							<td>
							<input type="text" name="field_name" placeholder="field_name" id="js-field-name" disabled="disabled">
							</td>
							<td>
								<label for="js-field-required">
									<input type="checkbox" name="is_required" id="js-field-required-add">
									Is this field required?
								</label>
							</td>
						</tr>
						<tr>
							<td colspan="3">
								<button class="button button-secondary" type="submit" id="js-add-field">Add A Field</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

<?php }

function speak_up_options_validate($input){

	return $input;
}

function speak_up_options_page(){ ?>
	
	<div class="wrap">
		<h2>Speak Up Options</h2>

		<form action="options.php" method="post" name="speak_up_options">
			<?php settings_fields('speak_up_options'); ?>
			
			<?php do_settings_sections('speak-up'); ?>

			<input name="Submit" type="submit" class="button button-primary" value="<?php esc_attr_e('Save Changes'); ?>" />
		</form>
	</div>

<?php }
