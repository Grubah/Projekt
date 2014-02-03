function add_parameter(){
	var parameter = "\
		<li id='"+element_count+"'> \
	        <div class='param'> \
	          <input class='form-control input-sm' type='text' value='Ocena'></input> \
	          <button class='btn btn-success' type='button'>Dodaj</button> \
	          <button id='btn_del_"+element_count+"' class='btn btn-danger' type='button'>Zbriši</button> \
	        </div> \
	        <ul id='"+element_count+"-children'> \
	        </ul> \
	      </li>";

    $("#main").append(parameter);
    $("#btn_del_"+element_count).click(function() {remove_parameter(this.id)} );

	console.log("new parameter with id"+element_count+" added");
	element_count++;
}

function remove_parameter(css_id){
	var id = css_id.substr(8,100);
	$("#"+id).remove();
	console.log("parameter "+id+" removed");
}