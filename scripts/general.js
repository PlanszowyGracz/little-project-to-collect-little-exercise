
"use strict";
(function() {
	document.addEventListener("DOMContentLoaded",function(){

		let sideNav=document.getElementById("side-nav-id");
		sideNav.addEventListener("click",sideNavClick);
		sideNav.classList.add("no-hover");
	});

	function sideNavClick(){
		

		this.classList.toggle("no-hover");

		

	}
})();
