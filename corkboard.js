/* -*- coding: utf-8 -*-
* ----------------------------------------------------------------------------
* Copyright (c) 2017 - Chris Kirby
*
* Distributed under the terms of the Modified BSD License.
*
* An IPython notebook extension to drag inputs and prompts for presentation.
* -----------------------------------------------------------------------------
*/

define([
'jquery',
'notebook/js/celltoolbar'
], 
function ($, celltoolbar){
	"use strict";

	var ctb = celltoolbar.CellToolbar;

	$('#notebook-container').sortable({
		// connectWith: ".cell"
	});

	function width_getter(cell){
		var cb = cell.metadata.corkboard;
		adjust(cell);
		return (cb == undefined)? undefined: cb.width
	}

	function width_setter(cell, value){
		if (cell.metadata.corkboard == undefined){cell.metadata.corkboard = {}}
		cell.metadata.corkboard.width = value;
		adjust(cell);
		// console.log(value);
	}

	function horizontal_getter(cell){
		var cb = cell.metadata.corkboard;
		adjust(cell);
		return (cb == undefined)? undefined: cb.horizontal
	}

	function horizontal_setter(cell, value){
		if (cell.metadata.corkboard == undefined){cell.metadata.corkboard = {}}
		cell.metadata.corkboard.horizontal = value;
		adjust(cell);
		// console.log(value);
	}

	function adjust(cell){
		var cb = cell.metadata.corkboard;
		if(cb && cb.width){
			$(cell.element).css('width', cb.width);
			$(cell.element).css('float', cb.horizontal );
		}
	}

	var sizes = [['100%', '100%'], ['66%', '66%'], ['50%', '50%'], ['33%', '33%'], ['25%', '25%']];
	var horizontal = [['Left','left'], ['Center', ''], ['Right', 'right']];

	var width_select = ctb.utils.select_ui_generator(sizes, width_setter, width_getter);
	var horitonal_select = ctb.utils.select_ui_generator(horizontal, horizontal_setter, horizontal_getter);

	function load_ipython_extension(){
		ctb.register_callback('corkboard.width', width_select);
		ctb.register_callback('corkboard.horizontal', horizontal_select)
		ctb.register_preset('Corkboard', ['corkboard.width', 'corkboard.horizontal']);

		$.each(Jupyter.notebook.get_cells(), function(index, cell){
	    	adjust(cell);
	    });

		console.log('Corkboard setup complete.');
	}

	return { load_ipython_extension: load_ipython_extension }
});

