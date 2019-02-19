// Dabartines datos informacija
const today = new Date();

const currentWeekday = today.getDay();
const currentDate = today.getDate();
const currentMonth = today.getMonth();
const currentHour = today.getHours();
const currentMinute =  today.getMinutes();

// STATES
	// Savaites dienos, menesio dienos ir menesio "State'ai", kurie seka kokia data yra siuo metu rodoma
	let weekday = currentWeekday;
	let monthDay = currentDate;
	let montht = currentMonth;
	//
	let nextWeekDay="test";
	let worker = "Ieva";

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
			if(monthF === currentMonth && previousWeekDay <= currentDate){
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
$("select").on('change', function(){
	table.innerHTML="";
	worker = this.value;
	montht = currentMonth;
	buildWeek(currentWeekday, currentMonth, currentDate);
	fillDataFromDB(test1);
	fillClientsList(test1);

})
// Initiate
buildWeek(weekday, montht, monthDay);

const test1 = {
	"reservations" : [
			{
				"time": "Vasario-15-14-15",
				"worker": "Simona",
				"customer": "Antanas"
			},
			{
				"time": "Vasario-16-14-15",
				"worker": "Simona",
				"customer": "Rokas"
			},
			{
				"time": "Vasario-20-14-15",
				"worker": "Simona",
				"customer": "Kazelis"
			},
			{
				"time": "Vasario-14-19-15",
				"worker": "Simona",
				"customer": "Jurgita"
			},
			{
				"time": "Vasario-23-16-15",
				"worker": "Ieva",
				"customer": "Nikas"
			},
			{
				"time": "Vasario-24-14-15",
				"worker": "Ieva",
				"customer": "Dzekas"
			},
			{
				"time": "Vasario-24-10-15",
				"worker": "Ieva",
				"customer": "Jonas"
			},
			{
				"time": "Kovo-16-11-15",
				"worker": "Ieva",
				"customer": "Antanas"
			},
			{
				"time": "Balandžio-16-11-15",
				"worker": "Ieva",
				"customer": "Antanas"
			},
			{
				"time": "Kovo-16-11-30",
				"worker": "Simona",
				"customer": "Antanas"
			},
			{
				"time": "Kovo-16-11-45",
				"worker": "Simona",
				"customer": "Antanas"
			},
			{
				"time": "Kovo-10-11-15",
				"worker": "",
				"customer": "Antanas"
			}

		]
}

function fillDataFromDB(x){
	let data = x.reservations;
	for(let i = 0; i < data.length; i++){
		let reservation = document.getElementById(data[i].time);
		let customerName = document.createElement("span");

		let customerNameText = document.createTextNode(data[i].customer);
	
		customerName.appendChild(customerNameText);


		if(reservation !== null && data[i].worker === worker){
			reservation.classList.add("reserved");
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
				test1.reservations.push({"time":id, "customer": $('#confirm-name').val(), "worker": worker})
				// reser
				$("#exampleModal").modal('hide');
				$('.accept-btn').unbind('click');
				reservationDay.appendChild(confirmName);
				reservationDay.classList.add("reserved");
				reservationDay.onclick = function(){editReservation(reservationDay.id)};	   
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
		reservationToDelete.classList.remove("reserved");
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
	const newArr = data.reservations.filter(reservation => reservation.time !== id)
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
startTime();
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
displayTodayDate()



function fillClientsList(data){	
	$("#clientsList").html("");
	const visitsArr = data.reservations.sort(compareTime);
	var count=1;
	for(let i = 0; i<visitsArr.length; i++){
		const visit = visitsArr[i].time.split("-")
		console.log(months.indexOf(visit[0])+Number(visit[1]),(currentMonth+currentDate))
		// Rodome tik tuos dar neapsilankiusius klientus
		if(visitsArr[i].worker === worker && (months.indexOf(visit[0])+visit[1]+visit[2]+visit[3])>=(currentMonth.toString()+currentDate+currentHour+currentMinute)){ 
			$("#clientsList").append("<li>"+"<span>"+(count)+"</span>"+"<p>"+visit[0]+" "+visit[1]+"</p>"+"<p>"+visit[2]+":"+visit[3]+"</p>"+"<p>"+visitsArr[i].customer+"</p>"+"</li>");
			count++;
		}
	}
}
fillClientsList(test1);
function compareTime(a, b){
	const dateArrA = a.time.split("-");
	const dateArrB = b.time.split("-");
	const dateA = Number(months.indexOf(dateArrA[0])+dateArrA[1]+dateArrA[2]+dateArrA[3]);
	const dateB = Number(months.indexOf(dateArrB[0])+dateArrB[1]+dateArrB[2]+dateArrB[3]);

	let comparison = 0;
		if(dateA > dateB){
			comparison = 1;
		} else if(dateA < dateB){
			comparison = -1;
		}
		return comparison;
}