<?php
/*
* Plugin Name: Speak Up
* Description: This plugin creates a very customizable easy to use contact form for wordpress.
* Version: 1.0.0
* Author: EastOh.co
* Author URI: https://eastoh.co
*/
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

include(plugin_dir_path( __FILE__ ) . 'speak-up-options.php');

function speak_up_shortcode(){
	return "poop";
}

add_shortcode('speak-up', 'speak_up_shortcode');