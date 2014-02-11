function add_alternative() {
	var parameters = get_params(false);
	var evaluvations = get_params(true);
	
	draw_alternative(parameters, evaluvations);

	alts ++;

	//console.log("add new alt");
	//console.dir(parameters);
	//console.dir(evaluvations);
}

function draw_alternative(params, evals) {
	var output = ' \
		<div id="'+alts+'-alt"  class="panel panel-default"> \
			<div class="panel-heading"> \
				<input class="form-control input narrow" type="text" placeholder="Neimenovana alternativa"></input> \
				<button class="btn btn-warning" type="button" onclick="remove_alt('+alts+')">Izbriši</button> \
			</div> \
			<div class="panel-body"> \
				<h3>Parametri</h3>';

	$.each(params, function(i, id) { // parametri brez podparametrov <span class="label label-info">Info</span>
		output += ' \
			<label> '+$("#"+id+" .param input").val()+' </label> \
			'+generate_options(id)+ ' | ';
	});

	output += ' \
		<h3>Ocene</h3> \
		<table>';

	$.each(evals, function(i, id) { // parametri brez podparametrov
		output += ' \
			<tr> \
				<td>\
					'+$("#"+id+" .param input").val()+' \
				</td> \
				<td > \
					<span id="'+id+'-result" class="label label-info">Ocene ni mogoče določiti</span> \
				</td> \
			</tr>';
	});

	output += ' \
				</table> \
			</div> \
		</div>';

	$("#alts").append(output);
}


function remove_alt(id) {
	$("#"+id+"-alt").remove();
}


function evaluate_all(alt_id) {
	var evaluations = get_params(true);

	console.log(get_evaluation(1, alt_id));;

	/*$.each(evaluations, function(id) {
		get_evaluation(id, eval_id);
	});*/

	console.log("Evaluation on "+alt_id+" complete");
}


// vrne onceno zahtevanega idja v zahtevani alternativi
function get_evaluation(parent_id, alt_id) {
	var values = new Array(); // parametri za ocenitev
	var lines = new Array(); // vse vrstice kjer smo našli element
	var line; // vrstica z nastavljeno oceno
	var score;

	$("#"+parent_id+"-children").children().each(function() { // vsak podparameter
		var select_id = $(this).attr('id'); // dobimo id parametra
		var $element = $("#"+alt_id+"-alt #"+select_id+"-eval-select"); // pridobimo element iz določene alternative
		
		console.log(select_id);

		if ( $element.length  != 0 ) { // če element obstaja/imamo določeno vrednost na strani

			if( $element.val().trim() == "! Nedoločeno !" ) // če je še nedoločen
				score = "!error:Parameter še ni določen!";
			else // če je določen
				par_id = $element.attr('id').split("-")[0];
				//console.log(par_id + " PARAM ID");
				values[par_id] = $element.val().trim();

		} else { // če element ne obstaja / nimamo določene vrednosti na strani
			console.log("check for children");
			if( $(this).children().length > 1 ) { // če ima dovolj parametrov pridobi njegovo oceno...
				console.log("rekurziri");
			} else { // če ima premalo parametrov -> ERROR!
				score = "!error:Premalo podparametrov!";
			}
		}
	});

	$.each(rules[parent_id], function(i, row) {
		$.each(row, function(j, val, a) {
			console.log(val+" "+a);
			if( val == values[i] ) {
				lines.push(j);
				//console.log("line: " + j)
			}
		});
	});

	line = get_most_rep(lines);

	if( $("#"+parent_id+"-"+line+"-option").length > 0)
		alert( $("#"+parent_id+"-"+line+"-option").val().trim() );

	//console.log(values);
	console.log("--");

	return score;
}


function get_params(parents) {
	var temp = new Array();

	var $parents = $( "#page2 ul li.parent" ); //vsi parametri ki imajo pod parametre
	$parents.each(function( i ) { //za vsak element...
		length = $("#"+i+"-children li").length;
		if( length == 0 && parents == false ) { //... ki nima podparametrov
			temp.push(i);
		} else if (length > 1 && parents == true) {
			temp.push(i);
		}
	});

	return temp;
}

function get_children_id_for(parentid) {
	var children = new Array();
	$("#"+parentid+"-children").children().each(function() {
		children.push($(this).attr('id'));
	});

	//console.dir(children);
	console.dir(rules);
}

function get_most_rep(arr) {
	var result  = {};
	var max     = 0;
	var res;

	for( var i = 0, total = arr.length; i < total; ++i ) {
		var val = arr[i],
		inc = ( result[val] || 0 ) + 1;

		result[val] = inc;

		if( inc > max ) { 
		    max = inc;
		    res = val;
		}
	}

	//alert(res);
	return res;
}