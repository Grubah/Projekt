//nastavi pravila odločitev
function init_rules(){
	var par_name;
	var output;
	var n_rules = {};
	var $parents = $( "#page2 ul li.parent" ); //vsi parametri ki imajo pod parametre

	$parents.each(function( i ) { //za vsak element...
		if( $("#"+i+"-children li").length > 1 ) { //... ki ima vsaj dva otroka
			var temp = {};
			var ids = get_children_ids(i);
			var child = get_compared_children(i);

			$.each(ids, function(j, id) {
				temp[id] = child[j];
			});

			n_rules[i] = temp;
		}
	});

	rules = n_rules;
	//console.dir(rules);
}


// izriše tabelo odločitev
function render_rules(){
	$( "#rules-wrapper" ).empty();

	$.each(rules, function( i, rule ) { //za vsak parameter ki ima odločitvena pravila...
		//console.dir(rule);
		var cells = new Array();
		var len;

		// koda pred tabelo pravil
		output = ' \
			<div class="panel panel-default"> \
				<div class="panel-heading"> \
					<h3 class="panel-title">' + $("#"+i+" .param input").val() + '</h3> \
				</div> \
				<div class="panel-body"> \
					<table>'; 


		// Glava tabele primerjav
		output += ' \
			<thead>';

		$.each(rules[i], function(j, values) {
			output += ' \
				<td>'+$("#"+j+" .param input").val()+'</td>';

			cells.push(j);
			len = values.length;
		});
		
		output += ' \
				<td>Vrednost</td>';

		output += ' \
			</thead>';
		// konec glave tabele
		

		// Vrstice
		for(var a=0; a<len; a++){
			output += ' \
				<tr>';
			$.each(cells, function(k, cell){
				output += ' \
					<td>'+rule[cell][a]+'</td>' ;
			} );
			output += ' \
					<td>'+generate_options(i, a)+'</td>' ;
			output += ' \
				</tr>';
		}
		//  konec vrstic v tabeli

		output += ' \
					</table> \
				</div> \
			</div>';

		$( "#rules-wrapper" ).append(output); // vstavi html za tabelo pravil
	});
}

function get_children_ids(p_id){
	var ids = new Array(); // končna tabela z vsemi zalogami vrednosti
	var $children = $( "#"+p_id+"-children" ).children(); // shrani vse otroke

	$children.each(function(i) {
		ids.push(this.id);
	});

	//console.dir(table);
	
	return ids;
}

// Vrne zalogo vrednosti vseh otrok od navedenega starša
function get_children_values(p_id){
	var table = new Array(); // končna tabela z vsemi zalogami vrednosti
	var $list; // pomni zalogo vrednosti
	var $children = $( "#"+p_id+"-children" ).children(); // shrani vse otroke

	$children.each(function(i) {
		//console.log("id: "+this.id);
		var temp = new Array(); // začasna tabela za hrambo posemezne zaloge vrednosti.

		$list = $("#"+this.id+"-values li text"); // vse vrednosti ene zaloge
		$list.each(function(j) { // napolni temp z ustreznimi vrednostmi
			//console.log($(this).text());
			temp[j] = $(this).text();
		});

		table[i] = temp; // doda zalogo vrednosti v tabelo
	});

	//console.dir(table);
	
	return table;
}

// vrne tabelo s primerjanimi vrednostmi
function get_compared_children(p_id){ 
	var table = get_children_values(p_id);  // hrani vse zaloge vrednosti potrebne za primerjavo
	var total = 1; // število potrebnih primerjav
	var limit = 1; // določa kdaj v tabeli je potrebno začeti zapisovati novo vrednost

	var compared = new Array();

	$.each(table, function(i, values){ // za vsak podparameter
		total *= values.length; // izračuna število potrebnih vrstic da se pokrijejo vse možnosti -> p1*p2*...*pn
	});

	$.each(table, function(i, values){ // za vsak podparameter
		var max = table[i].length; // maksimalni index
		
		var k = 0; // index s katerim se prestavljamo po zalogi vrednosti

		compared[i] = new Array();

		for( var j=0; j < total; j++ ) { // izvaja tako dolgo dokler ne napolne vseh vrstic ki so potrebne za primerjavo vsake z vsakim
			compared[i][j] = table[i][k%max]; // polnjenje tabele

			if( 0 == (j+1)%limit ) // določa kdaj se spremeni vrednost izvorne zaloge
				k++;
		}

		limit *= table[i].length;
	});

	return compared;
}

// pridobi posamezne vrednosti vseh otrok za določenega starša
function get_options(id){
	var options = new Array();
	$( "#"+id+"-values li" ).each(function(i){
		//console.log(i + ": " + $(this).text());
		options.push($(this).text().trim());
	});

	return options;
}


// ustvari kodo za dropdowne za specifičen parameter
function generate_options(id, select_id){
	var options = get_options(id);

	if(select_id == null) {
		var output = ' \
		<select id="'+id+'-eval-select" onchange="evaluate_all('+alts+')"> \
			<option value="unknown">! Nedoločeno !</options>';
	} else {
		var output = ' \
		<select id="'+id+'-'+select_id+'-option"> \
			<option value="unknown">! Nedoločeno !</options>';

	}
	
	$.each(options, function(i, opt) {
		output += ' \
			<option value="'+opt+'">'+opt+'</options>';
	});
	output += ' \
		</select> ';

	return output;
}