var element_count;

$(document).ready(function() {
	element_count = 0;

	init_page();

	console.log("Page loaded!");
});

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
	});

	//Gumb dodaj v glavnega parrenta
	$("#main-btn").click(function(){
		add_parameter("main");
	});
}