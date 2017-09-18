"use strict";
(function() {
	document.addEventListener("DOMContentLoaded",function(){
		let timeshow=document.getElementById("time");
		let clock = document.getElementsByClassName("main-clock")[0];
		let textNode=document.createTextNode(getTime().binary);
		clock.appendChild(textNode);
		console.log(`Wynik testów ${testConversion()}`);
		
		

		let timeChangeText=function(time){
			console.log(`time: ${time}`); 
			timeshow.firstChild.nodeValue=time;
		};
		let timeChangeClock=function(time){
			console.log(`time: ${time}`); 
			textNode.nodeValue=time;
		};
		let interval=window.setInterval(()=>{
			let time=getTime();
			timeChangeText(time.normal);
			timeChangeClock(time.binary); }, 1000);
		console.log(interval);

	

		
	});

	

	function getTime(){
		let now = new Date();
		let h = now.getHours();
		let m = now.getMinutes();
		let s = now.getSeconds();
		let normal=`${h} : ${m} : ${s}`;
		let binary=`${converseToBinary(h)} \n : ${converseToBinary(m)} \n : ${converseToBinary(s)}`;
		return {
			"normal": normal,
			"binary": binary
		};
	}

	function converseToBinary(num){
		let number=num;
		let arr=[];
		
		while(number>=1	){
			arr.push(number%2);
			number=Math.floor(number/2);
			
		}
		if(arr.length===0) arr.push(0);
		
		return arr.reverse().join("");


	}
	
	function testConversion() {
		let table = [
			createTest(0, 0),
			createTest(1, 1),
			createTest(10, 2),
			createTest(11, 3),
			createTest(100, 4),
			createTest(101, 5),
			createTest(110, 6),
			createTest(111, 7)];
		return table.every((el) => { return el; });

	}


	function createTest(trueResult, tested) {
		let  testedResult=Number(converseToBinary(tested));
		console.log("");
		if ( trueResult ===  testedResult) {
			console.log(` good result, result  ${testedResult} is right, because  ${tested} is equal to binary ${trueResult}`);
			return true;
		}
		else {
			console.log(` false resutl, result  ${testedResult} is false!!!, because  ${tested} is not equal to  binary ${trueResult}`);
			return false;
		}
	}
})();