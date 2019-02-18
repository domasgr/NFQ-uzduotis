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

let table = document.getElementById("weekTable");
let refreshBtn = document.getElementById("refresh");
let dateDisplay = document.getElementById("dateDisplay");

let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
// let currentMonth = today.getMonth();
// let currentYear = today.getFullYear();
let months = ["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]
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
	if(weekDay === 0){ // Pakeiciam sekmadienio indeksa i 7, kad butu aiskiau.
		weekDay = 7;
	}
	let daysInMonth = 32 - new Date(2019, month, 32).getDate();

	if(monthDay+(7-weekDay) <= daysInMonth){
	
		for(let i = weekDay; i<=7; i++, monthDay++){
			
			let tr = document.createElement("li");
				tr.setAttribute("class", "table-row");
			let day = document.createElement("div");
				day.setAttribute("class", "weekday");
			let date = document.createElement("div");
				date.setAttribute("class", "date");
			
			let dayText = document.createTextNode(days[i-1]);
			
			let dateMonth = document.createElement("p");
			let dateDay = document.createElement("span");
			let dateMonthText = document.createTextNode(months[month]);
			let dateDayText = document.createTextNode(monthDay);
			dateMonth.appendChild(dateMonthText);
			dateDay.appendChild(dateDayText);

			let reservationId = months[month]+"-"+monthDay; //new
			day.appendChild(dayText);
			date.appendChild(dateMonth);
			date.appendChild(dateDay);
			tr.appendChild(day);
			tr.appendChild(date);

			//test
				let thForHours = document.createElement("ul");
				let tr1 = document.createElement("li");
				let tr2 = document.createElement("li");
				thForHours.appendChild(tr1);
				thForHours.appendChild(tr2);
				tr.appendChild(thForHours);

			//


			
			for(let j = 0, mins = 0, hour = 10; j < 20; j++, mins+=15){
				if(j%4 === 0 && j!==0){
					mins = 0;
					hour++;
				}
				let slot = document.createElement("div");
				
					if(mins === 0){
						var slotTime = document.createElement("p");
						var slotTimeText = document.createTextNode(hour+":00");
						slotTime.appendChild(slotTimeText);
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+"00";
					}else{
						var slotTime = document.createElement("p");
						var slotTimeText = document.createTextNode(hour+":"+mins);	
						slotTime.appendChild(slotTimeText);
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+mins.toString();
					}
				
				slot.id = reservationIdFinal;
				slot.onclick = function(){addReservation(slot.id)}
				slot.appendChild(slotTime);
				//tr.appendChild(slot);
				tr1.appendChild(slot)
			}
			for(let j = 0, mins = 0, hour = 15; j < 20; j++, mins+=15){
				if(j%4 === 0 && j!==0){
					mins = 0;
					hour++;
				}
				let slot = document.createElement("div");
				
					if(mins === 0){
						var slotTime = document.createElement("p");
						var slotTimeText = document.createTextNode(hour+":00");
						slotTime.appendChild(slotTimeText);
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+"00";
					}else{
						var slotTime = document.createElement("p");
						var slotTimeText = document.createTextNode(hour+":"+mins);	
						slotTime.appendChild(slotTimeText);
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+mins.toString();
					}
			
				slot.id = reservationIdFinal;
				slot.onclick = function(){addReservation(slot.id)}
				slot.appendChild(slotTime);
				//tr.appendChild(slot);
				tr2.appendChild(slot)
			}

			table.appendChild(tr);
		}
		
		fillControllerData(montht, montht, monthDay-7, monthDay-1);
	} else{
		let daysFromNextMonth = monthDay+(7-weekDay)-daysInMonth;
		for(let i = weekDay; i<=7; i++, monthDay++){
			console.log(monthDay)
			let tr = document.createElement("li");
				tr.setAttribute("class", "table-row");
			let day = document.createElement("div");
				day.setAttribute("class", "weekday");
			let date = document.createElement("div");
				date.setAttribute("class", "date");
			console.log(daysFromNextMonth)
			if(i <= 7 - daysFromNextMonth){

			let dayText = document.createTextNode(days[i-1]);
			
			let dateMonth = document.createElement("p");
			let dateDay = document.createElement("span");
			let dateMonthText = document.createTextNode(months[month]);
			let dateDayText = document.createTextNode(monthDay);
			dateMonth.appendChild(dateMonthText);
			dateDay.appendChild(dateDayText);

			var reservationId = months[month]+"-"+monthDay; //new
			day.appendChild(dayText);
			date.appendChild(dateMonth);
			date.appendChild(dateDay);
			tr.appendChild(day);
			tr.appendChild(date);

			//test
				let thForHours = document.createElement("ul");
				var tr1 = document.createElement("li");
				var tr2 = document.createElement("li");
				thForHours.appendChild(tr1);
				thForHours.appendChild(tr2);
				tr.appendChild(thForHours);

			//
			}else{
				if(i === 7-daysFromNextMonth+1){
					monthDay = monthDay-daysInMonth
				}
		console.log(monthDay)
			let dayText = document.createTextNode(days[i-1]);
			
			let dateMonth = document.createElement("p");
			let dateDay = document.createElement("span");
			let dateMonthText = document.createTextNode(months[month+1]);
			let dateDayText = document.createTextNode(monthDay);
			dateMonth.appendChild(dateMonthText);
			dateDay.appendChild(dateDayText);

			var reservationId = months[month+1]+"-"+monthDay; //new
			day.appendChild(dayText);
			date.appendChild(dateMonth);
			date.appendChild(dateDay);
			tr.appendChild(day);
			tr.appendChild(date);

			//test
				let thForHours = document.createElement("ul");
				var tr1 = document.createElement("li");
				var tr2 = document.createElement("li");
				thForHours.appendChild(tr1);
				thForHours.appendChild(tr2);
				tr.appendChild(thForHours);

			//

			}			
			
			for(let j = 0, mins = 0, hour = 10; j < 20; j++, mins+=15){
				if(j%4 === 0 && j!==0){
					mins = 0;
					hour++;
				}
				let slot = document.createElement("div");
				
					if(mins === 0){
						var slotTime = document.createElement("p");
						var slotTimeText = document.createTextNode(hour+":00");
						slotTime.appendChild(slotTimeText);
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+"00";
					}else{
						var slotTime = document.createElement("p");
						var slotTimeText = document.createTextNode(hour+":"+mins);	
						slotTime.appendChild(slotTimeText);
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+mins.toString();
					}
				slot.id = reservationIdFinal;
				slot.onclick = function(){addReservation(slot.id)}
				slot.appendChild(slotTime);
				tr1.appendChild(slot);
			}
			for(let j = 0, mins = 0, hour = 15; j < 20; j++, mins+=15){
				if(j%4 === 0 && j!==0){
					mins = 0;
					hour++;
				}
				let slot = document.createElement("div");
				
					if(mins === 0){
						var slotTime = document.createElement("p");
						var slotTimeText = document.createTextNode(hour+":00");
						slotTime.appendChild(slotTimeText);
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+"00";
					}else{
						var slotTime = document.createElement("p");
						var slotTimeText = document.createTextNode(hour+":"+mins);	
						slotTime.appendChild(slotTimeText);
						var reservationIdFinal = reservationId + "-"+hour.toString()+"-"+mins.toString();
					}
				slot.id = reservationIdFinal;
				slot.onclick = function(){addReservation(slot.id)}
				slot.appendChild(slotTime);
				tr2.appendChild(slot);
			}

			table.appendChild(tr);
		}
		console.log(monthDay)
		fillControllerData(montht, montht+1,daysInMonth-(7-monthDay), monthDay-1);
		montht++;		
	}
	nextWeekDay = monthDay;
}



nextBtn.addEventListener("click", function(){
	nextWeek(montht, nextWeekDay);
})
previousBtn.addEventListener("click", function(){
	previousWeek(montht, nextWeekDay);
})

// Initiate
buildWeek(weekday, montht, monthDay);

const test1 = {
	"reservations" : [
			{
				"year": "Vasario-15-14-15",
				"barber": "",
				"customer": "Antanas"
			},
			{
				"year": "Vasario-16-14-15",
				"barber": "",
				"customer": "Rokas"
			},
			{
				"year": "Vasario-20-14-15",
				"barber": "",
				"customer": "Kazelis"
			},
			{
				"year": "Vasario-14-19-15",
				"barber": "",
				"customer": "Jurgita"
			},
			{
				"year": "Vasario-23-16-15",
				"barber": "",
				"customer": "Nikas"
			},
			{
				"year": "Vasario-24-14-15",
				"barber": "",
				"customer": "Dzekas"
			},
			{
				"year": "Vasario-24-10-15",
				"barber": "",
				"customer": "Jonas"
			},
			{
				"year": "Kovo-16-11-15",
				"barber": "",
				"customer": "Antanas"
			},
			{
				"year": "Balandžio-16-11-15",
				"barber": "",
				"customer": "Antanas"
			},
			{
				"year": "Kovo-16-11-30",
				"barber": "",
				"customer": "Antanas"
			},
			{
				"year": "Kovo-16-11-45",
				"barber": "",
				"customer": "Antanas"
			},
			{
				"year": "Kovo-10-11-15",
				"barber": "",
				"customer": "Antanas"
			}

		]
}

function fillDataFromDB(x){
	let data = x.reservations;
	for(let i = 0; i < data.length; i++){
		let reservation = document.getElementById(data[i].year);
		let customerName = document.createElement("span");

		let customerNameText = document.createTextNode(data[i].customer);
	
		customerName.appendChild(customerNameText);


		if(reservation !== null){
			reservation.style.backgroundColor = "red";
			reservation.onclick = function(){editReservation(reservation.id)};
			reservation.appendChild(customerName);
		}
	}
}
fillDataFromDB(test1);









function addReservation(id){
		const dateArr = id.split("-"); // date information splited to array
		$('#confirm-date').html("<i class='far fa-calendar-alt'></i>"+dateArr[0] + " " + dateArr[1]);
		$('#confirm-time').html("<i class='far fa-clock'></i>"+dateArr[2]+" : "+dateArr[3])
		$('#exampleModal').modal();

			reservationConfirmation(function(confirm){
			  if(confirm){
				let reservationDay = document.getElementById(id);
				let confirmName = document.createElement("span");
				let confirmNameText = document.createTextNode($('#confirm-name').val());
				confirmName.appendChild(confirmNameText);
				
				// reservationDay.classList.toggle("reservation");
				// madeReservation = reservationDay.id;
				test1.reservations.push({"year":id, "customer": $('#confirm-name').val()})
				// reser
				$("#exampleModal").modal('hide');
				$('.accept-btn').unbind('click');
				reservationDay.appendChild(confirmName);
				reservationDay.style.backgroundColor = "red";
				reservationDay.onclick = function(){editReservation(reservationDay.id)};
				const userInfo = document.getElementById("reservationInfo"); // update user info
				userInfo.innerText = id;		   
			  }else{

			  }
			  $('.accept-btn').unbind('click');
			  $("#exampleModal").unbind("on")
			});	
		
}

function editReservation(id){
	const dateArr = id.split("-"); // date information splited to array
	const reservationToDelete = document.getElementById(id);
	const reservationName = document.querySelector("#"+id+" span");


	var idd = id;
	

	$('#edit-title').text("Rezervacijos informacija");
	$('#nameInfo').html("<i class='fas fa-signature'></i>"+$('#'+id+' span').text())
	$('#dateInfo').html("<i class='far fa-calendar-alt'></i>"+dateArr[0] + " " + dateArr[1])
	$('#timeInfo').html("<i class='far fa-clock'></i>"+dateArr[2]+":"+dateArr[3])

	$('#editReservation').modal();
	$('#deleteReservation').click(function(){
		deleteReservation(test1, idd)
		reservationToDelete.style.backgroundColor = "";
		reservationName.remove();
		reservationToDelete.onclick = function(){addReservation(reservationToDelete.id)}
		$('#editReservation').modal("hide");

	})
	$('#editReservation').on("hidden.bs.modal", function(){  
		$("#deleteReservation").unbind("click");
	})


}



function reservationConfirmation(callback){			// accepting or canceling reservation trough confirm modal
 $('.accept-btn').click(function(){
 	const nameInput = $('#confirm-name').val();
 	if(nameInput.length > 2){						 //handling reservation without name
 		callback(true);
 	}
    
  });
  $("#exampleModal").on("hidden.bs.modal", function(){
  	 $('.accept-btn').unbind('click');
  })
};

function deleteReservation(data, id){
	const newArr = data.reservations.filter(reservation => reservation.year !== id)
	test1.reservations = newArr;
	$("#deleteReservation").unbind("click");
	$("#exampleModal").modal("hide");
}
function fillControllerData(month1, month2, monthDay1, monthDay2){
	let dateDisplay = document.getElementById("dateDisplay");
	dateDisplay.innerHTML = "";

	//Information needed
	let monthFromText = document.createTextNode(months[month1] + " " + monthDay1);
	let monthToText = document.createTextNode(months[month2] + " " + monthDay2);
	// if(month1 === month2){

	// }
	if(monthDay1 === 32){
		monthFromText = document.createTextNode(months[(month1+1)] + " " + 1);
		monthToText = document.createTextNode(months[month2] + " " + monthDay2);
	}

	let monthFrom = document.createElement("p");
	let span = document.createElement("span");
	let spanText = document.createTextNode("-");
		span.appendChild(spanText);
	let monthTo = document.createElement("p");

	monthFrom.appendChild(monthFromText);
	monthTo.appendChild(monthToText);

	dateDisplay.appendChild(monthFrom);
	dateDisplay.appendChild(span);
	dateDisplay.appendChild(monthTo);



}