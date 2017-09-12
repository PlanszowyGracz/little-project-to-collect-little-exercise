"use strict";
document.addEventListener("DOMContentLoaded",function(){
	//let timeshow=document.getElementById("time");
	let now = new Date();
	let h = now.getHours();
	let m = now.getMinutes();
	console.log("time: "+ h + " " + m + " " + converseToBinary(4).join(""));
	testConversion();

	
});

function converseToBinary(num){
	let number=num;
	let arr=[];
	
	while(number>=1	){
		arr.push(number%2);
		number=Math.floor(number/2);
		console.log(" hmm" + number%2 + " " +number/2);
	}
	if(arr.length===0) arr.push(0);
	
	return arr.reverse();


}

function testConversion(){
	createTest(0,0);
	createTest(1,1);
	createTest(10,2);
	createTest(11,3);
	createTest(100,4);
	createTest(101,5);


}


function createTest(trueResult, tested) {
	let  testedResult=Number(converseToBinary(tested).join(""));
	console.log("");
	if ( trueResult ===  testedResult) {
		console.log(` good result, result  ${testedResult} is right, because  ${tested} is equal to binary ${trueResult}`);
	}
	else {
		console.log(` false resutl, result  ${testedResult} is false!!!, because  ${tested} is not equal to  binary ${trueResult}`);
	}
}