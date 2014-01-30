$(document).ready(function() {
	init_page();

	console.log("Page loaded!");
});

function init_page(){
	$("ul.nav li").click(function() { //On click na gumb v navigaciji
		console.log(this.id + " clicked");
		var id = this.id.substring(3);

		// nastavi gumbu active class
		$("ul.nav li").removeClass("active");
		$("#btn"+id).addClass("active");

		// prikaže ustrezno stran
		$(".page").addClass("hidden");
		$("#page" + id).removeClass("hidden");
	})
}