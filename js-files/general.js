"use strict";
document.addEventListener("DOMContentLoaded",function(){

	let sideNav=document.getElementById("side-nav");
	sideNav.addEventListener("click",sideNavClick);
});

function sideNavClick(){
	

	this.classList.toggle("no-hover");

	

}