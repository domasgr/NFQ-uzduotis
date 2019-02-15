
// x = JSON.stringify(test1)
// var x = JSON.parse(test1.reservations)

// Dabartines datos informacija
const today = new Date();

const currentWeekday = today.getDay();
const currentDate = today.getDate();
const currentMonth = today.getMonth();


// STATES
	// Savaites dienos, menesio dienos ir menesio "State'ai", kurie seka kokia data yra siuo metu rodoma
	let weekday = currentWeekday;
	let monthDay = currentDate;
	let montht = currentMonth;
	//
	let nextWeekDay="test";
	let madeReservation = false;
	// let previewedMonth = month;



let table = document.getElementById("weekTable");
let refreshBtn = document.getElementById("refresh");
let dateDisplay = document.getElementById("dateDisplay");

let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
// let currentMonth = today.getMonth();
// let currentYear = today.getFullYear();
let months = ["Sausis", "Vasaris", "Kovas", "Balandis", "Geguze", "Birzelis", "Liepa", "Rugpjutis", "Rugsejis", "Spalis", "Lapkritis", "Gruodis"]
let days = ["Pirmadienis", "Antradienis", "Treciadienis", "Ketvirtadienis", "Penktadienis", "Sestadienis", "Sekmadienis"]









function nextWeek(previewedMonth, nextWeekDay){
	const firstWeekdayShowed = 1;
	table.innerHTML="";
	buildWeek(firstWeekdayShowed, previewedMonth, nextWeekDay);
	fillDataFromDB(test1);
}
function previousWeek(previewedMonthF, nextWeekDay){
	table.innerHTML="";
	const firstWeekdayShowed = 1;
		if(nextWeekDay-14 > 0){
			let previousWeekDay = nextWeekDay - 14;
			if(previewedMonthF === currentMonth && previousWeekDay < currentDate){
				buildWeek(currentWeekday, currentMonth, currentDate);
			}else{
				buildWeek(firstWeekdayShowed, previewedMonthF, previousWeekDay);
			}
			
		} else {
			let daysOfLastMonth = 14 - nextWeekDay;
			let monthF = previewedMonthF-1;
			montht--;
			let daysInMonth = 32 - new Date(2019, monthF, 32).getDate();
			let previousWeekDay = daysInMonth - daysOfLastMonth;
			if(monthF === currentMonth && previousWeekDay <= currentWeekday){
				buildWeek(currentWeekday, monthF, currentDate);
			} else{
				buildWeek(firstWeekdayShowed, monthF, previousWeekDay);
			}
			
		}
		fillDataFromDB(test1);
	
	
}
function buildWeek(weekDay, month, monthD){
	let monthDay = monthD;
	let daysInMonth = 32 - new Date(2019, month, 32).getDate();

	if(monthDay+(7-weekDay) <= daysInMonth){
		for(let i = weekDay; i<=7; i++, monthDay++){
			let tr = document.createElement("tr");
			let day = document.createElement("th");
			let date = document.createElement("th");
			
			let dayText = document.createTextNode(days[i-1]);
			
			let dateText = document.createTextNode(months[month]+" "+monthDay);	
			let reservationId = months[month]+"-"+monthDay; //new
			day.appendChild(dayText);
			date.appendChild(dateText);
			tr.appendChild(day);
			tr.appendChild(date);

			
			for(let j = 0, mins = 0, hour = 10; j < 41; j++, mins+=15){
				if(j%4 === 0 && j!==0){
					mins = 0;
					hour++;
				}
				let slot = document.createElement("th");
				
					if(mins === 0){
						var slotText = document.createTextNode(hour+":00");
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+"00";
					}else{
						var slotText = document.createTextNode(hour+":"+mins);	
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+mins.toString();
					}
				// console.log(reservationIdt)
				slot.id = reservationIdFinal;
				slot.onclick = function(){makeReservation(slot.id)}
				slot.appendChild(slotText);
				tr.appendChild(slot);
			}

			table.appendChild(tr);
		}
	} else{
		let daysFromNextMonth = monthDay+(7-weekDay)-daysInMonth;
		for(let i = weekDay; i<=7; i++, monthDay++){
			let tr = document.createElement("tr");
			let day = document.createElement("th");
			let date = document.createElement("th");
			if(i <= 7 - daysFromNextMonth){
				let dayText = document.createTextNode(days[i-1])
				let dateText = document.createTextNode(months[month]+" "+monthDay);
				var reservationId = months[month]+"-"+monthDay; //new	
				day.appendChild(dayText);
				date.appendChild(dateText);
				tr.appendChild(day);
				tr.appendChild(date);
			}
			else{
				if(i === 7-daysFromNextMonth+1){
					monthDay = monthDay-daysInMonth
				}
				
				let dayText = document.createTextNode(days[i-1])
				let dateText = document.createTextNode(months[month+1]+" "+(monthDay));
				var reservationId = months[month+1]+"-"+monthDay; //new	
				day.appendChild(dayText);
				date.appendChild(dateText);
				tr.appendChild(day);
				tr.appendChild(date);

			}			
			
			for(let j = 0, mins = 0, hour = 10; j < 41; j++, mins+=15){
				if(j%4 === 0 && j!==0){
					mins = 0;
					hour++;
				}
				let slot = document.createElement("th");
				
					if(mins === 0){
						var slotText = document.createTextNode(hour+":00");
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+"00";
					}else{
						var slotText = document.createTextNode(hour+":"+mins);
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+mins.toString();	
					}
				slot.id = reservationIdFinal;
				slot.appendChild(slotText);
				tr.appendChild(slot);
			}

			table.appendChild(tr);
		}
		montht++;		
	}
	
	nextWeekDay = monthDay;


}

function displayDateInController(){

}






function test(){
	table.innerHTML= "";
}
refreshBtn.addEventListener("click", test)

nextBtn.addEventListener("click", function(){
	nextWeek(montht, nextWeekDay);
})
previousBtn.addEventListener("click", function(){
	previousWeek(montht, nextWeekDay);
})

// Initiate
buildWeek(weekday, montht, monthDay);

// let daysInMonth = 32 - new Date(2019, 4, 32).getDate();





















// const firstDay = (new Date(currentYear, currentMonth)).getDay();
// console.log(firstDay);

// console.log(today.getDate())


// let daysInMonth =new Date(2019, 1).getDay();
// console.log(daysInMonth)

const test1 = {
	"reservations" : [
			{
				"year": "Vasaris-15-14-15",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Vasaris-16-14-15",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Vasaris-20-14-15",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Vasaris-14-19-15",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Vasaris-23-16-15",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Vasaris-24-14-15",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Vasaris-24-10-15",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Kovas-16-11-15",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Balandis-16-11-15",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Kovas-16-11-30",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Kovas-16-11-45",
				"barber": "",
				"custumer": "Antanas"
			},
			{
				"year": "Kovas-10-11-15",
				"barber": "",
				"custumer": "Antanas"
			}

		]
}
function fillDataFromDB(x){
	let data =  x.reservations;
	console.log(data)
	for(let i = 0; i < data.length; i++){
		let reservation = document.getElementById(data[i].year);
		
		if(reservation !== null){
			console.log(reservation.hasOwnProperty("style"))
				if(reservation.id === madeReservation){
					reservation.classList.add("reservation");
				} else{
					reservation.style.backgroundColor = "red";
					reservation.onclick = function(){unavailableReservation()};
				}				
		}
		

	}
}
function makeReservation(id){
	// const reservationId = id;
	if(!madeReservation){
		$('#exampleModal').modal();
			reservationConfirmation(function(confirm){
				console.log("funkcija veikia")
			  if(confirm){
			  	console.log(id)
				let reservationDay = document.getElementById(id);
				let confirmName = $('#confirm-name').val();
				console.log(confirmName)
				reservationDay.classList.toggle("reservation");
				madeReservation = reservationDay.id;
				test1.reservations.push({"year":id})
				console.log(test1)
				$("#exampleModal").modal('hide');
				$('.accept-btn').unbind('click');

				const userInfo = document.getElementById("reservationInfo"); // update user info
				userInfo.innerText = id;		   
			  }else{

			  }
			  $('.accept-btn').unbind('click');
			  $("#exampleModal").unbind("on")
			});			
	}
	else if(madeReservation === id){
		$("#cancelModal").modal("show");
		cancelConfirmation(function(confirm){
			if(confirm){
				let reservationDay = document.getElementById(id);
				reservationDay.classList.toggle("reservation");
				madeReservation = false;
				test1.reservations.pop();
				$("#cancelModal").modal("hide");

				const userInfo = document.getElementById("reservationInfo"); // update user info
				userInfo.innerText = "Jūs dar neužsirezervavote";
			}
		})
		
	}
	else{
		const alert =  document.getElementById("reservationDone");
		alert.classList.remove("display-none")
		setTimeout(function(){
			alert.classList.add("display-none")
		}, 3000)
	}
}

fillDataFromDB(test1);


function reservationConfirmation(callback){			// accepting or canceling reservation trough confirm modal
 $('.accept-btn').click(function(){
 	const nameInput = $('#confirm-name').val();
 	if(nameInput.length < 2){						 //handling reservation without name

 	} else{
 		callback(true);
 	}
 	console.log(nameInput.length)
    
  });
  $("#exampleModal").on("hidden.bs.modal", function(){
  	 $('.accept-btn').unbind('click');
  })
};

function cancelConfirmation(callback){
 	$('#cancelConfirmation').click(function(){
 		callback(true)
 	});
 	$('#cancelModal').on('hidden.bs.modal', function(){
 		$('#cancelConfirmation').unbind("click")
 	})
 }

function unavailableReservation(){
	const alert = document.getElementById("reservationAlert")
	alert.classList.remove("display-none")
	console.log(alert)
	setTimeout(function(){
	console.log(alert.classList)	
		alert.classList.add("display-none");
	}, 3000)
}

