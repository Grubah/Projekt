function init_rules(){
	var name;
	var output;
	var $parents = $( "#page2 ul li.parent" ); //vsi parametri ki imajo pod parametre

	$( "#rules-wrapper" ).empty();

	$parents.each(function( i ) {
		if( $("#"+i+"-children li").length > 0 ) {
			name = $("#"+i+" .param input").val()

			output = ' \
				<div class="panel panel-primary"> \
					<div class="panel-heading"> \
						<h3 class="panel-title">' +name+ '</h3> \
					</div> \
					<div class="panel-body">  \
					</div> \
				</div>';

			$( "#rules-wrapper" ).append(output);
		}
	});

	get_compared_children(0);
}

function get_compared_children(p_id){
	var table = new Array();
	var $children = $( "#"+p_id+"-children li" );

	console.log($children.length);

	return table;
}

function get_options(id){
	$( "#"+id+"-children li" ).each(function(i){
		console.log(i + ": " + $(this).text());
	});
}