function add_alternative() {
	var parameters = get_params(false);
	var evaluvations = get_params(true);
	
	draw_alternative(parameters, evaluvations);

	alts ++;

	//console.log("add new alt");
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
		<button class="btn btn-primary btn-sm" type="button" onclick="evaluate_all('+alts+')">Izračunaj oceno</button> \
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
	var score = new Array();
	var params = get_params(true);

	console.dir(evaluations);

	$.each(evaluations, function(id) {
		score[id] = get_evaluation(evaluations[id], alt_id);
		console.log(id + " eval for id")
	});
	console.log("score");
	console.dir(score);

	for(var i=0; i < params.length; i++) {
		var label;
		if(score[i] == "!error:Parameter še ni določen!") {
			label = "Ni izpoljnenih dovolj atributov alternative!";
		} else if(score[i] == "unknown") {
			label = "Nesustrezno definirna odločitvena pravila!";
		} else  {
			label = score[i];
		}

		$("#"+alt_id+"-alt #"+params[i]+"-result").text(label);
	}

	console.log("Evaluation on "+alt_id+" complete");
}


// vrne onceno zahtevanega idja v zahtevani alternativi
function get_evaluation(parent_id, alt_id) {
	console.log("get_evaluation "+parent_id+" "+alt_id)
	var values = new Array(); // parametri za ocenitev
	var lines = new Array(); // vse vrstice kjer smo našli element
	var line; // vrstica z nastavljeno oceno
	var par_id;
	var score;
	

	$("#"+parent_id+"-children").children().each(function() { // vsak podparameter
		var select_id = $(this).attr('id'); // dobimo id parametra
		var $element = $("#"+alt_id+"-alt #"+select_id+"-eval-select"); // pridobimo element iz določene alternative
		
		console.log(select_id + " select_id");

		if ( $element.length  != 0 ) { // če element obstaja/imamo določeno vrednost na strani
			console.log("element exists");
			if( $element.val().trim() == "unknown" ) // če je še nedoločen
				score = "!error:Parameter še ni določen!";
			else // če je določen
				par_id = $element.attr('id').split("-")[0];
				//console.log(par_id + " PARAM ID");
				values[par_id] = $element.val().trim();

		} else { // če element ne obstaja / nimamo določene vrednosti na strani
			console.log("check for children");

			//$(this).children().length > 1
			if( $("#"+select_id+"-children").children().length > 1 ) { // če ima dovolj parametrov pridobi njegovo oceno...
				console.log("rekurziri " + select_id);
				values[select_id] = get_evaluation(select_id, alt_id); //REKURZIVEN klic
			} else { // če ima premalo parametrov -> ERROR!
				score = "!error:Premalo podparametrov!";
			}
		}
	});
	
	// preveri pravila*
	if(rules[parent_id] != null){
		$.each(rules[parent_id], function(i, row) { // za vsako vrstico v pravilih za določen parameter
			$.each(row, function(j, val) { // za vsako celico v vrstici
				if( val == values[i] ) { // če se parametra (določen v alternativi in v celici) ujemata
					lines.push(j); // dodaj število vrstice
					//console.log("line: " + j)
				}
			});
		});
	}

	line = get_most_rep(lines); //pridobimo vrstico z najvišjim številom ujemanj v pravilih

	if(line != null) // če imamo določeno vrstico
		if( $("#"+parent_id+"-"+line+"-option").length > 0) // če imamo definirano vrednost za to primerjavo v odločitvenih pravilih
			score = $("#"+parent_id+"-"+line+"-option").val().trim(); // pridobimo vrednost ocene

	//console.log(values);
	console.log("--");

	return score; // vrne oceno za nevedenega starša iz določene alternative
}


function get_params(parents) {
	var temp = new Array();

	var $parents = $( "#page2 ul li.parent" ); //vsi parametri ki imajo pod parametre
	$parents.each(function( i ) { //za vsak element...
		length = $("#"+$(this).attr('id')+"-children li").length;
		if( length == 0 && parents == false ) { //... ki nima podparametrov
			temp.push($(this).attr('id'));
		} else if (length > 1 && parents == true) {
			temp.push($(this).attr('id'));
		}
	});

	/*console.log("params parents: "+parents);
	console.dir(temp);*/

	return temp;
}

function get_children_id_for(parentid) {
	var children = new Array();
	$("#"+parentid+"-children").children().each(function() {
		children.push($(this).attr('id'));
	});

	//console.dir(children);
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

	return res;
}