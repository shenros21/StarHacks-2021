let calendar = document.getElementById("calendar");

for (i = 0; i < 4; i++) {
  let day = document.createElement("div");
  day.className = "day";
  calendar.appendChild(day);
}

for (i = 1; i < 31; i++) {
  let day = document.createElement("div");
  day.className = "day";
  day.innerHTML = i;
  calendar.appendChild(day);
}

// open 
$(document).on("click", "#tracker-l", function() {
  let tracker = document.getElementById("tracker");
  tracker.style.display = "block";
})

// close
// open 
$(document).on("click", "#exit", function() {
  let tracker = document.getElementById("tracker");
  tracker.style.display = "none";
})