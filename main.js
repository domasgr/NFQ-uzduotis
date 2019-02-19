// KINTAMIEJI-----------------------------------------------------------
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
	let reservationWorker;
	let userName = undefined;

	let worker = "Ieva";
	



let table = document.getElementById("weekTable");
let refreshBtn = document.getElementById("refresh");
let dateDisplay = document.getElementById("dateDisplay");

let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");

let months = ["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"]
let days = ["Pirmadienis", "Antradienis", "Treciadienis", "Ketvirtadienis", "Penktadienis", "Sestadienis", "Sekmadienis"]



//PROGRAMOS INICIJACIJA -------------------------------------------------
$("document").ready(function(){
	buildWeek(currentWeekday, currentMonth, currentDate); // Sukuria savaitini kalendoriu
	fillDataFromDB(reservationsData); // Uzpildo kalendoriu rezervaciju informacija
	startTime();// Laikrodzio veikimas
	displayTodayDate();// Rodo šiandienos datą
	nextBtn.addEventListener("click", function(){ // KAlendoriaus navigavcija
		nextWeek(montht, nextWeekDay);
	});

	previousBtn.addEventListener("click", function(){ // Kalendoriaus navigacija
		previousWeek(montht, nextWeekDay);
	});

	$("select").on('change', function(){   // Kirpejos pasirinkimas
		table.innerHTML="";
		worker = this.value;
		montht = currentMonth;
		buildWeek(currentWeekday, currentMonth, currentDate);
		fillDataFromDB(reservationsData);
	});


});

// VISOS FUNKCIJOS -----------------------------------------

function nextWeek(previewedMonth, nextWeekDay){
	const firstWeekdayShowed = 1;
	table.innerHTML="";
	buildWeek(firstWeekdayShowed, previewedMonth, nextWeekDay);
	fillDataFromDB(reservationsData);
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
		
			if(monthF === currentMonth && previousWeekDay <= currentDate){

				buildWeek(currentWeekday, monthF, currentDate);
			} else{
				buildWeek(firstWeekdayShowed, monthF, previousWeekDay);
			}	
		}
		fillDataFromDB(reservationsData);
}

// "Pagamina" savaitini kalendoriu
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

				let thForHours = document.createElement("ul");
				let tr1 = document.createElement("li");
				let tr2 = document.createElement("li");
				thForHours.appendChild(tr1);
				thForHours.appendChild(tr2);
				tr.appendChild(thForHours);
			
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
				slot.onclick = function(){makeReservation(slot.id)}
				slot.appendChild(slotTime);
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
				slot.onclick = function(){makeReservation(slot.id)}
				slot.appendChild(slotTime);
				tr2.appendChild(slot)
			}

			table.appendChild(tr);
		}	
		fillControllerData(montht, montht, monthDay-7, monthDay-1);
	} else{
		let daysFromNextMonth = monthDay+(7-weekDay)-daysInMonth;
		for(let i = weekDay; i<=7; i++, monthDay++){
			let tr = document.createElement("li");
				tr.setAttribute("class", "table-row");
			let day = document.createElement("div");
				day.setAttribute("class", "weekday");
			let date = document.createElement("div");
				date.setAttribute("class", "date");
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

				let thForHours = document.createElement("ul");
				var tr1 = document.createElement("li");
				var tr2 = document.createElement("li");
				thForHours.appendChild(tr1);
				thForHours.appendChild(tr2);
				tr.appendChild(thForHours);
			}else{
				if(i === 7-daysFromNextMonth+1){
					monthDay = monthDay-daysInMonth
				}
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

				let thForHours = document.createElement("ul");
				var tr1 = document.createElement("li");
				var tr2 = document.createElement("li");
				thForHours.appendChild(tr1);
				thForHours.appendChild(tr2);
				tr.appendChild(thForHours);
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
				slot.onclick = function(){makeReservation(slot.id)}
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
				slot.onclick = function(){makeReservation(slot.id)}
				slot.appendChild(slotTime);
				tr2.appendChild(slot);
			}

			table.appendChild(tr);
		}
		fillControllerData(montht, montht+1,daysInMonth-(7-monthDay), monthDay-1);
		montht++;		
	}
	nextWeekDay = monthDay;
}

function fillDataFromDB(x){
	let data =  x.reservations;
	for(let i = 0; i < data.length; i++){
		let reservation = document.getElementById(data[i].time);	
		if(reservation !== null && data[i].worker === worker){
			if(reservation.id === madeReservation){
				reservation.classList.add("reservation");
			}else{
				reservation.classList.add("reserved");
				reservation.onclick = function(){unavailableReservation()};
			}				
		}
	}
}

function makeReservation(id){
	if(!madeReservation){
		const dateArr = id.split("-"); // date information splited to array
		$('#confirmWorker').text("Kirpėja : "+ worker)
		$('#confirmDate').html("<i class='far fa-calendar-alt'></i>"+dateArr[0] + " " + dateArr[1])
		$('#confirmTime').html("<i class='far fa-clock'></i>"+dateArr[2]+":"+dateArr[3])
		$('#exampleModal').modal();
			reservationConfirmation(function(confirm){
			  if(confirm){
				let reservationDay = document.getElementById(id);
				let confirmName = $('#confirm-name').val();
				reservationDay.classList.toggle("reservation");
				madeReservation = reservationDay.id;
				reservationWorker = worker;
				userName = confirmName;

				reservationsData.reservations.push({"time":id, "worker": worker})
				$("#exampleModal").modal('hide');
				$('.accept-btn').unbind('click');

				updateReservationInfo(madeReservation, userName); // update information display info		   
			  }else{

			  }
			  $('.accept-btn').unbind('click');
			  $("#exampleModal").unbind("on")
			});			
	}
	else if(madeReservation === id && worker === reservationWorker){
		const dateArr = id.split("-"); // date information splited to array
		$('#workerInfo').text("Kirpėja : "+reservationWorker);
		$('#nameInfo').html("<i class='fas fa-signature'></i>"+userName);
		$('#dateInfo').html("<i class='far fa-calendar-alt'></i>"+dateArr[0] + " " + dateArr[1]);
		$('#timeInfo').html("<i class='far fa-clock'></i>"+dateArr[2]+":"+dateArr[3]);
		$("#cancelModal").modal("show");
		cancelConfirmation(function(confirm){
			if(confirm){
				let reservationDay = document.getElementById(id);
				reservationDay.classList.toggle("reservation");
				madeReservation = false;
				reservationsData.reservations.pop();
				$("#cancelModal").modal("hide");

				const userInfo = document.getElementById("reservationInfo"); // update user info

				updateReservationInfo(madeReservation, userName); // update information display info
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




function reservationConfirmation(callback){			// accepting or canceling reservation trough confirm modal
 $('.accept-btn').click(function(){
 	const nameInput = $('#confirm-name').val();
 	if(nameInput.length < 2){						 //handling reservation without name

 	} else{
 		callback(true);
 	}
    
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
	setTimeout(function(){	
		alert.classList.add("display-none");
	}, 3000)
}

function fillControllerData(month1, month2, monthDay1, monthDay2){
	let dateDisplay = document.getElementById("dateDisplay");
	dateDisplay.innerHTML = "";

	let monthFromText = document.createTextNode(months[month1] + " " + monthDay1);
	let monthToText = document.createTextNode(months[month2] + " " + monthDay2);

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

function startTime(){ // clock
	let today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
 	let s = today.getSeconds();
 	m = checkTime(m);
 	s = checkTime(s)
 	document.getElementById("informationDisplayClock").innerHTML = h+":"+m+"<span>:"+s+"</span>";
 	var t = setTimeout(startTime, 500)
}

function checkTime(x){ // add zero in front of numbers < 10
	if(x < 10){
		x = "0" + x;
	}
	return x;
}

function displayTodayDate(){
	let date = document.getElementById("informationDisplayDate");
	date.innerHTML = months[currentMonth]+" "+currentDate+", "+days[currentWeekday-1];
}

function updateReservationInfo(dateInfo, name){
	if(dateInfo){
		const dateArr = dateInfo.split("-");

		$("#noReservationAlert").attr("class", "display-none");
		$("#myReservation").removeClass("display-none");
		
		$("#informationWorker").text("Kirpėja : "+reservationWorker)
		$("#informationName").text("Jūs : "+name)
		$("#informationDate").html("<i class='far fa-calendar-alt'></i>"+dateArr[0] + " " + dateArr[1])
		$("#informationTime").html("<i class='far fa-clock'></i>"+dateArr[2]+":"+dateArr[3])
	} else if(!dateInfo){
		$("#noReservationAlert").removeClass("display-none");
		$("#myReservation").attr("class", "display-none");

		$("#informationWorker").text("");
		$("#informationName").text("");
		$("#informationDate").html("");
		$("#informationTime").html("");
	}
}

const reservationsData = {
	"reservations" : [
			{
				"time": "Vasario-22-14-15",
				"worker": "Simona",
				"customer": "Romas"
			},
			{
				"time": "Vasario-21-18-30",
				"worker": "Simona",
				"customer": "Linas"
			},
			{
				"time": "Vasario-21-10-15",
				"worker": "Simona",
				"customer": "Domantas"
			},
			{
				"time": "Vasario-21-11-15",
				"worker": "Simona",
				"customer": "Renaldas"
			},
			{
				"time": "Vasario-21-12-15",
				"worker": "Simona",
				"customer": "Antanas"
			},
			{
				"time": "Vasario-22-14-30",
				"worker": "Simona",
				"customer": "Petras"
			},
			{
				"time": "Vasario-22-14-45",
				"worker": "Simona",
				"customer": "Liepa"
			},
			
			{
				"time": "Vasario-22-16-15",
				"worker": "Simona",
				"customer": "Anele"
			},
			{
				"time": "Vasario-23-14-15",
				"worker": "Simona",
				"customer": "Rokas"
			},
			{
				"time": "Vasario-20-14-15",
				"worker": "Simona",
				"customer": "Kazys"
			},
			{
				"time": "Vasario-21-19-15",
				"worker": "Simona",
				"customer": "Jurgita"
			},
			{
				"time": "Vasario-23-16-15",
				"worker": "Ieva",
				"customer": "Nikas"
			},
			
			{
				"time": "Kovo-10-11-15",
				"worker": "",
				"customer": "Ona"
			},






			{
				"time": "Vasario-20-14-15",
				"worker": "Simona",
				"customer": "Romas"
			},
			{
				"time": "Vasario-20-18-30",
				"worker": "Simona",
				"customer": "Linas"
			},
			{
				"time": "Vasario-20-10-15",
				"worker": "Simona",
				"customer": "Domantas"
			},
			{
				"time": "Vasario-20-11-15",
				"worker": "Simona",
				"customer": "Renaldas"
			},
			{
				"time": "Vasario-20-12-15",
				"worker": "Simona",
				"customer": "Antanas"
			},
			{
				"time": "Vasario-20-16-30",
				"worker": "Simona",
				"customer": "Petras"
			},
			{
				"time": "Vasario-20-14-45",
				"worker": "Simona",
				"customer": "Liepa"
			},
			
			{
				"time": "Vasario-20-10-45",
				"worker": "Simona",
				"customer": "Anele"
			},
			{
				"time": "Vasario-20-15-15",
				"worker": "Simona",
				"customer": "Rokas"
			},
			{
				"time": "Vasario-20-17-15",
				"worker": "Simona",
				"customer": "Kazys"
			},
			{
				"time": "Vasario-20-19-15",
				"worker": "Simona",
				"customer": "Jurgita"
			},
			{
				"time": "Vasario-20-19-30",
				"worker": "Ieva",
				"customer": "Nikas"
			},
			
			{
				"time": "Vasario-20-11-30",
				"worker": "",
				"customer": "Ona"
			},






			{
				"time": "Vasario-22-14-15",
				"worker": "Ieva",
				"customer": "Romas"
			},
			{
				"time": "Vasario-21-18-30",
				"worker": "Ieva",
				"customer": "Linas"
			},
			{
				"time": "Vasario-21-10-15",
				"worker": "Ieva",
				"customer": "Domantas"
			},
			{
				"time": "Vasario-21-19-30",
				"worker": "Ieva",
				"customer": "Renaldas"
			},
			{
				"time": "Vasario-21-19-15",
				"worker": "Ieva",
				"customer": "Antanas"
			},
			{
				"time": "Vasario-22-17-30",
				"worker": "Ieva",
				"customer": "Petras"
			},
			{
				"time": "Vasario-22-18-45",
				"worker": "Ieva",
				"customer": "Liepa"
			},
			
			{
				"time": "Vasario-22-16-00",
				"worker": "Ieva",
				"customer": "Anele"
			},
			{
				"time": "Vasario-23-14-00",
				"worker": "Ieva",
				"customer": "Rokas"
			},
			{
				"time": "Vasario-20-14-30",
				"worker": "Ieva",
				"customer": "Kazys"
			},
			{
				"time": "Vasario-21-19-45",
				"worker": "Ieva",
				"customer": "Jurgita"
			},
			
			{
				"time": "Vasario-24-10-15",
				"worker": "Ieva",
				"customer": "Jonas"
			},
			{
				"time": "Kovo-16-11-15",
				"worker": "Ieva",
				"customer": "Gediminas"
			},
			{
				"time": "Balandžio-16-11-15",
				"worker": "Ieva",
				"customer": "Domas"
			},
			{
				"time": "Balandžio-16-11-30",
				"worker": "Simona",
				"customer": "Idilija"
			},
			{
				"time": "Balandžio-16-11-45",
				"worker": "Simona",
				"customer": "Lina"
			},
			{
				"time": "Balandžio-10-11-15",
				"worker": "",
				"customer": "Ona"
			},




			{
				"time": "Vasario-25-14-15",
				"worker": "Ieva",
				"customer": "Romas"
			},
			{
				"time": "Vasario-25-18-30",
				"worker": "Ieva",
				"customer": "Linas"
			},
			{
				"time": "Vasario-25-10-30",
				"worker": "Ieva",
				"customer": "Domantas"
			},
			{
				"time": "Vasario-25-19-30",
				"worker": "Ieva",
				"customer": "Renaldas"
			},
			{
				"time": "Vasario-25-19-15",
				"worker": "Ieva",
				"customer": "Antanas"
			},
			{
				"time": "Vasario-25-17-30",
				"worker": "Ieva",
				"customer": "Petras"
			},
			{
				"time": "Vasario-25-18-45",
				"worker": "Ieva",
				"customer": "Liepa"
			},
			{
				"time": "Vasario-25-16-45",
				"worker": "Ieva",
				"customer": "Airida"
			},
			{
				"time": "Vasario-25-16-00",
				"worker": "Ieva",
				"customer": "Anele"
			},
			{
				"time": "Vasario-25-14-00",
				"worker": "Ieva",
				"customer": "Rokas"
			},
			{
				"time": "Vasario-25-14-30",
				"worker": "Ieva",
				"customer": "Kazys"
			},
			{
				"time": "Vasario-25-19-45",
				"worker": "Ieva",
				"customer": "Jurgita"
			},
			{
				"time": "Vasario-25-16-15",
				"worker": "Ieva",
				"customer": "Nikas"
			},
			{
				"time": "Vasario-25-14-15",
				"worker": "Ieva",
				"customer": "Dzekas"
			},
			{
				"time": "Vasario-25-10-15",
				"worker": "Ieva",
				"customer": "Jonas"
			},
			{
				"time": "Vasario-16-15-15",
				"worker": "Ieva",
				"customer": "Gediminas"
			},
			{
				"time": "Vasario-25-11-15",
				"worker": "Ieva",
				"customer": "Domas"
			},
			{
				"time": "Vasario-25-11-30",
				"worker": "Simona",
				"customer": "Idilija"
			},
			{
				"time": "Vasario-25-11-45",
				"worker": "Simona",
				"customer": "Lina"
			},
			{
				"time": "Vasario-25-11-15",
				"worker": "",
				"customer": "Ona"
			}

		]
}