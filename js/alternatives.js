function add_alternative() {
	var parameters = new Array();
	var evaluvations = new Array();

	var $parents = $( "#page2 ul li.parent" ); //vsi parametri ki imajo pod parametre

	$parents.each(function( i ) { //za vsak element...
		length = $("#"+i+"-children li").length;
		if( length == 0 ) { //... ki nima podparametrov
			parameters.push(i);
		} else if (length > 1) {
			evaluvations.push(i);
		}
	});

	draw_alternative(parameters, evaluvations);

	alts ++;

	console.log("add new alt");
	console.dir(parameters);
	console.dir(evaluvations);


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

	$.each(params, function(i, id) { // parametri brez podparametrov
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
				<td> <label> \
					'+$("#"+id+" .param input").val()+' \
				</label> </td> \
				<td> \
					Ocena \
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