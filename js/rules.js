function init_rules(){
	var name;
	var output;
	var $parents = $( "#page2 ul li.parent" ); //vsi parametri ki imajo pod parametre

	$( "#rules-wrapper" ).empty();

	$parents.each(function( i ) { //za vsak element...
		if( $("#"+i+"-children li").length > 1 ) { //... ki ima vsaj dva otroka
			name = $("#"+i+" .param input").val();

			var table = get_compared_children(i);

			output = ' \
				<div class="panel panel-primary"> \
					<div class="panel-heading"> \
						<h3 class="panel-title">' +name+ '</h3> \
					</div> \
					<div class="panel-body"> \
						<table>'; // koda pred tabelo pravil

			// table of comparing
			for(var j=0; j < table[0].length; j++){
				output += ' \
					<tr>';

				$.each(table, function(k, cells) {
					output += ' \
						<td> \
							'+cells[j]+' \
						</td>';
				});

				output += ' \
					</tr>';
			}

			output += ' \
						</table> \
					</div> \
				</div>';

			$( "#rules-wrapper" ).append(output); // koda za tabelo pravil
		}
	});

	get_compared_children(0);
}

// retruns all children with values
function get_children_values(p_id){
	var table = new Array();
	var $list;
	var $children = $( "#"+p_id+"-children" ).children(); // shrani vse otroke

	$children.each(function(i) {
		//console.log("id: "+this.id);
		var temp = new Array(); // začasna tabela za hrambo posemezne vrednosti iz zaloge vrednosti.
		$list = $("#"+this.id+"-values li text");

		$list.each(function(j) {
			//console.log($(this).text());
			temp[j] = $(this).text();
		});

		table[i] = temp;
	});

	//console.dir(table);
	
	return table;
}

function get_compared_children(p_id){
	var table = get_children_values(p_id);  // hrani vse zaloge vrednosti potrebne za primerjavo
	var total = 1; // pomni število potrebnih primerjav -> 1 zaradi *= množenja
	var compared = new Array(); // array ki pomni primerjave formatirane za izpis v html

	$.each(table, function(i, values){ // za vsak podparameter
		total *= values.length; // izračuna število potrebnih vrstic da se pokrijejo vse možnosti -> p1*p2*...*pn
	});

	$.each(table, function(i, values){ // za vsak podparameter
		var max = table[i].length; 
		var k = 0; // index k določa kolikokrat se mora vrednost parametra ponoviti

		compared[i] = new Array();

		for( var j=0; j < total; j++ ) { // za vsako vrednost v parametru
			compared[i][j] = table[i][k%max];

			if( 0 == (j+1)%(i+1) ) // 
				k++;
		}
	});

	return compared;
}


function get_options(id){
	$( "#"+id+"-children li" ).each(function(i){
		console.log(i + ": " + $(this).text());
	});
}