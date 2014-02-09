var element_count;
var rules;

$(document).ready(function() {
	element_count = 1; //Število elementov v drevesu
	rules = new Array(); // odločitvena pravila

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

	$("#btn4").click(function() {
		init_rules();
		render_rules();
	});
}

//nastavi testne vrednosti
function test1(){
	//Ocena
	add_value(0, "Zelo slaba");
	add_value(0, "Slaba");
	add_value(0, "Povprečna");
	add_value(0, "Dobra");
	add_value(0, "Zelo dobra");

	//prvi parameter
	add_parameter(0);
	rename_parameter(1, "Hardware");
	$("#1 .param input").val("Hardware");
	add_value(1, "Slab");
	add_value(1, "Povprečen");
	add_value(1, "Dober")
	

	//drugi parameter
	add_parameter(0);
	rename_parameter(2, "Price");
	$("#2 .param input").val("Price");
	add_value(2, "Nesprejemljiva");
	add_value(2, "Draga");
	add_value(2, "Normalna");
	add_value(2, "Poceni");

	// prvi parameter - prvi podparameter
	add_parameter(1);
	rename_parameter(3, "Processor");
	$("#3 .param input").val("Processor");
	add_value(3, "Počasen");
	add_value(3, "Povprečen");
	add_value(3, "Hiter");

	// prvi parameter - drugi podparameter
	add_parameter(1);
	rename_parameter(4, "Ram");
	$("#4 .param input").val("Ram");
	add_value(4, "Slab");
	add_value(4, "Povprečen");
	add_value(4, "Dober");

	// prvi parameter - tretji podparameter
	add_parameter(1);
	rename_parameter(5, "Hard Drive");
	$("#5 .param input").val("Hard Drive");
	add_value(5, "Majhen");
	add_value(5, "Povprečen");
	add_value(5, "Velik");
}