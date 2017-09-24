"use strict";
(function() {
	document.addEventListener("DOMContentLoaded",function(){
		let timeshow=document.getElementById("time");
		let clock = document.getElementsByClassName("main-clock")[0];
		let clockLights = document.getElementsByClassName("clock-lights")[0];

		let textClock = document.createElement("div");
		let time=getTime();

		let textNode = addTextClockHtml(clock, textClock,time.binaryH+time.binaryM);
		let textNode2 = addTextClockHtml(clock, textClock,time.binaryS);

		let clockText=false;
		let lightArr=getaccessToClockLight();
		/*let state={
			oldHours: time.binaryArrH,
			oldMinutes: time.binaryArrM

		};*/
		console.log(`Wynik testów ${testConversion()}`);


		timeshow.firstChild.nodeValue=time.normal;
		clock.addEventListener("click", function () {
			if (clockText) {
				clock.removeChild(textClock);
				clockText = false;
				clockLights.style.display="block";

			}
			else {
				clock.appendChild(textClock);
				clockLights.style.display="none";
				clockText=true;
			}
		});

		let timeChangeText=function(time){
			timeshow.firstChild.nodeValue=time;
		};
		let timeChangeClockText=function(time){
			textNode2.nodeValue=time.binaryS;
			textNode.nodeValue=time.binaryH+time.binaryM;
		};

		let timeChangeLightClock = function (time) {
			
			time.binaryArrH.forEach((val, id) => {
				changeLight(Number(val)===1,lightArr.hours[id]);
			});
			time.binaryArrM.forEach((val, id) => {
				changeLight(Number(val)===1,lightArr.minutes[id]);
			});



		};
		let setTime=(()=>{
			let time=getTime();
			timeChangeText(time.normal);
			timeChangeClockText(time);
			timeChangeLightClock(time);
		});
		setTime();

		let interval=window.setInterval(setTime, 1000);
		console.log(interval);






	});

	function getaccessToClockLight() {
		let hoursArr = new Array(6).fill(0).map((val, id) => { 
			let hour=document.getElementById("hour" + id);
			hour.classList.add("closed"); 
			return  hour; 
		});
		let minutesArr = new Array(7).fill(0).map((val, id) => { 
			let minutes= document.getElementById("minutes" + id); 
			minutes.classList.add("closed"); 
			return  minutes; 
		});
		
		return {
			hours: hoursArr,
			minutes: minutesArr

		};


	}

	function addTextClockHtml(clock, container, time){
		let div=document.createElement("div");
		let span=document.createElement("span");
		let textNode=document.createTextNode(time);
		container.classList.add("binary-text-container");
		span.classList.add("binary-text");
		div.classList.add("half-clock");
		//clock.appendChild(container);
		container.appendChild(div);
		div.appendChild(span);
		span.appendChild(textNode);
		return textNode;
	}

	function changeLight(condition, where) {
		if (condition) {
			where.classList.add("open");
			where.classList.remove("closed");

		}
		else {

			where.classList.remove("open");
			where.classList.add("closed");
		}
	}

	function getTime(){
		let now = new Date();
		let h = now.getHours();
		let m = now.getMinutes();
		let s = now.getSeconds();
		let normal=`${h} : ${m} : ${s}`;
		//let binary=` H: ${addNullOnBeginning(converseToBinary(h))} , M: ${addNullOnBeginning(converseToBinary(m))} , S: ${addNullOnBeginning(converseToBinary(s))}`;
		return {
			"normal": normal,
			"binaryH": ` H: ${addNullOnBeginning(converseToBinary(h)).slice(1)} `,
			"binaryM": ` M: ${addNullOnBeginning(converseToBinary(m))} `,
			"binaryS": ` S: ${addNullOnBeginning(converseToBinary(s))} `,
			"binaryArrH": addNullOnBeginning(converseToBinary(h)).slice(1).split(""),
			"binaryArrM": addNullOnBeginning(converseToBinary(m)).split("")

		};
	}

	function converseToBinary(num){
		let number=num;
		let arr=[];

		while(number>=1	){
			arr.push(number%2);
			number=Math.floor(number/2);

		}
		if(arr.length===0) {arr.push(0);}



		return  arr.reverse().join("");


	}

	function addNullOnBeginning(text){
		let repeat = 0;
		if (7 -text.length  >= 0) { repeat = 7 -text.length ; }
		
		return ("0".repeat(repeat)).concat(text);
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