window.onload = ()=>{
	let span = document.getElementsByClassName("close")[0];


	let currencyToConvert = document.getElementById('myselect');
	let convertToCurrency = document.getElementById('myconvert');
	let amount = document.getElementById("amount");
	let submit = document.getElementById("submit");
	let info = document.getElementById("write");
	let modal = document.getElementById('myModal');

	let currencyConverter = (a,b,c)=>{
		let naira = {"dollar":0.0032,"euro":0.0028,"yen":0.36,"pounds":0.0024,"naira":1}
		let dollar = {"naira":315.25,"euro":0.88,'yen':112.04,"pounds":0.77,"dollar":1}
		let pounds = {"yen":145.36,"euro":1.14,"dollar":1.30,"naira":409.10,"pounds":1}
		let euro = {"yen":127.73,"pounds":0.88,"dollar":1.14,"naira":359.48,"euro":1}
		let yen = {"pounds":0.0069,"dollar":0.0089,"naira":2.82,"euro":0.0078,"yen":1}

		if(a === "naira"){
			return naira[b] * parseFloat(c)
		}
		else if(a === "dollar"){
			return dollar[b] * parseFloat(c)
		}
		else if(a === "pounds"){
			return pounds[b] * parseFloat(c)
		}
		else if (a === "euro"){
			return euro[b] * parseFloat(c)
		}
		else{
			return yen[b] * parseFloat(c)
		}
	}

	span.onclick = ()=> {
    	modal.style.display = "none";
	}

	
	submit.onclick = ()=>{
		modal.style.display = "block";
		info.innerHTML += currencyConverter(currencyToConvert.value,convertToCurrency.value,amount.value)+""+currencyToConvert.value;
	};
}