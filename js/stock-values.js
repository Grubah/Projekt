// doda nov element pod zalogo vrednosti
function new_stock_value(parent_id, param_id){
	var name= $("#"+param_id+" div input").val(); //Pridobimo ime drevesnega elementa

	// Koda za nov element v zalogi vrednosti
	var output = ' \
		<div id="'+param_id+'-stock" class="panel panel-primary"> \
			<div class="panel-heading"> \
				<h3 class="panel-title"> \
					'+name+' \
				</h3> \
			</div> \
			<div class="panel-body"> \
				<input id="'+param_id+'-nvalue" class="form-control input-sm narrow" type="text" placeholder="vrednost"></input> \
				<button class="btn btn-primary btn-sm" type="submit" onclick="add_value('+param_id+');">dodaj vrednost</button> \
			</div> \
			<div class="panel-body">  \
				<ul id="'+param_id+'-values" class="sortable"> \
				</ul> \
			</div> \
		</div>';

		$("#"+parent_id+"-stock").after(output); //vedno dodamo za starša
}

// doda vrednost v elementu zaloge vrednosti
function add_value(param_id){
	var value =  $("#"+param_id+"-nvalue").val(); //pridobi vrednost inputa
	var output;

	if(value != ""){ //če input ni prazen...
		//... se doda vrednost v zalogo vrednosti
		output =" \
			<li> \
				<text>"+value+"</text> \
				<img src='images/delete.png' class='button' width='16px' onclick='$(this).parent().remove()' /> \
			</li>"; 

		$("#"+param_id+"-values").append(output);
	} else { //... drugače izpišemo error
		output = '\
		<div class="alert alert-dismissable alert-danger"> \
			<button class="close" data-dismiss="alert" type="button"> \
				x \
			</button> \
			Vnesti morate vrednost! \
		</div>';

		$("#"+param_id+"-values").before(output);
	}

	//console.log("added new stock value with the name " + value + ", to " + param_id);
}

//izbriše celotno zalogo vrednosti
function remove_stock_value(id){
	$("#"+id+"-stock").remove();
}