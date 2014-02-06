var element_count;

$(document).ready(function() {
	element_count = 1; //Število elementov v drevesu

	init_page(); // Nastavi funckije in lastnosti kot morajo biti na začetku

	test1(); // naloži testni primer

	console.log("Page loaded!");
});

// Nastavi funckije in lastnosti kot morajo biti na začetku
function init_page(){ 
	// Gumbi v navigaciji
	$("ul.nav li").click(function() { 
		console.log(this.id + " clicked");
		var id = this.id.substring(3);

		// nastavi gumbu active class
		$("ul.nav li").removeClass("active");
		$("#btn"+id).addClass("active");

		// prikaže ustrezno stran
		$(".page").addClass("hidden");
		$("#page" + id).removeClass("hidden");

		//On change preimenuje vse povezane elemente
		$("#0 .param input").change(function(){
			rename_parameter(0, $("#0 .param input").val());
		});
	});

	//Gumb dodaj v glavnega parrenta
	$("#main-btn").click(function(){
		add_parameter(0);
	});
}

function test1(){
	add_parameter(0);
	rename_parameter(1, "Hardware");

	add_parameter(0);
	rename_parameter(3, "Price");

	add_parameter(1);
	add_parameter(1);
	add_parameter(1);
}