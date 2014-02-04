function add_parameter(parent){
	// html za nov parameter
	var parameter = "\
		<li id='"+element_count+"'> \
	        <div class='param'> \
	          <input class='form-control input-sm' type='text' value='Parameter'></input> \
	          <img id='btn_add_"+element_count+"' src='images/add.png' class='button' width='16px' /> \
	          <img id='btn_del_"+element_count+"' src='images/delete.png' width='16px' /> \
	        </div> \
	        <ul id='"+element_count+"-children'> \
	        </ul> \
	      </li>";

    $("#"+parent).append(parameter);

    // dodan on click gumboma delete in add
    $("#btn_add_"+element_count).click(function() {add_parameter(this.id.substr(8, 18)+"-children")} );
    $("#btn_del_"+element_count).click(function() {remove_parameter(this.id.substr(8, 18))} );

	console.log("new parameter with id"+element_count+" added to "+parent);
	element_count++;
}

function remove_parameter(id){
	$("#"+id).remove();
	console.log("parameter "+id+" removed");
}