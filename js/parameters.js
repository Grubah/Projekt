function add_parameter(parent){

	// html za nov parameter
	var parameter = " \
		<li id='"+element_count+"' class='parent'> \
	        <div class='param'> \
	          <input class='form-control input-sm' type='text' value='Parameter "+element_count+"' onchange='rename_parameter("+element_count+", this.value)'></input> \
	          <img id='btn_add_"+element_count+"' src='images/add.png' class='button' width='16px' /> \
	          <img id='btn_del_"+element_count+"' src='images/delete.png' class='button' width='16px' /> \
	        </div> \
	        <ul id='"+element_count+"-children' class='children'> \
	        </ul> \
	    </li>";

    $("#"+parent+"-children").append(parameter); //dodamo nov parameter pod starševski element

    // dodan on click gumboma delete in add
    $("#btn_add_"+element_count).click(function() { add_parameter(this.id.substr(8, 18)) });
    $("#btn_del_"+element_count).click(function() { remove_parameter(this.id.substr(8, 18)) });

    new_stock_value(parent, element_count); // dodamo novo zalogo vednosti za sveže pečeni parameter

	//console.log("new parameter with id"+element_count+" added to "+parent+"-children");
	element_count++;

	init_rules();
	render_rules();
}

//funkcija ki se kliče ob izbrisu parametra
function remove_parameter(id){
	$("#"+id).remove();
	remove_stock_value(id);

	init_rules();
	render_rules();

	//console.log("parameter "+id+" removed");
}

//funckija ki se kliče onchange inputa v drevesu - preimenovanju drevesnega elementa
function rename_parameter(id, value) { 
	$("#"+id+"-stock h3.panel-title").text(value);
	
	console.log("rename at "+id+" to " +value);
}