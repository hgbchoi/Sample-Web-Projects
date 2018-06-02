var TRACKER_USERS = "trackerUsers";

function checkNoUserSelected(){
var dropDownList = document.getElementById('userDropDown');
if (dropDownList.value == ''){
  return true;
}
}

function loadUsers(){
var dropDownList = document.getElementById('userDropDown');
while (dropDownList.hasChildNodes()) {
  dropDownList.removeChild(dropDownList.firstChild);
}
var usersList = JSON.parse(localStorage.getItem(TRACKER_USERS));
  for (var i = 0; i < usersList.length; i++){
    var newOption = document.createElement("option");
        newOption.text = usersList[i].name;
        newOption.value = usersList[i].name;
        dropDownList.appendChild(newOption)
  }
  loadEntries();
}


function drawChart(){

  var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
  };

var name = document.getElementById('userDropDown').value;
var chart = document.getElementById('chart');
var dataEntries = JSON.parse(localStorage.getItem(TRACKER_USERS));
var index= dataEntries.findIndex(obj => obj.name == name);
var dateEntries = [];
var weightEntries = [];

for (var i = 0; i < dataEntries[index]['data'].length; i++){
  dateEntries.push(dataEntries[index]['data'][i].date);
  weightEntries.push(dataEntries[index]['data'][i].weight);
}

let lineChart = new Chart(chart, {
  type: 'line',
  data:{
    labels: dateEntries,
    datasets:[
      {
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        label: name,
        fill: false,
        data: weightEntries
    }
  ]
  }
}
)

}

function deleteUser(){
  var dropDownList = document.getElementById('userDropDown');
  var userToDelete = dropDownList.value;
  var entries = JSON.parse(localStorage.getItem(TRACKER_USERS));
  var index= entries.findIndex(obj => obj.name == userToDelete);
  entries.splice(index,1);
  localStorage.setItem(TRACKER_USERS, JSON.stringify(entries));
  loadUsers();
  if (checkNoUserSelected()){
    var table = document.getElementById('entryTable');
    var chart = document.getElementById('chart');
    chart.style.display = 'none';
    table.innerHTML ='';
  }

}

function saveEntry(){
  var name = document.getElementById('name').value;
  var tempSelectedUser = document.getElementById('userDropDown').value;
  var weight = document.getElementById('weight').value;
  var date = document.getElementById('date').value;
  var breakfast = document.getElementById('breakfastInput').value.replace(/\r?\n/g, '<br />');
  var lunch = document.getElementById('lunchInput').value.replace(/\r?\n/g, '<br />');
  var dinner = document.getElementById('dinnerInput').value.replace(/\r?\n/g, '<br />');
  var exercise = document.getElementById('exerciseInput').value.replace(/\r?\n/g, '<br />');
  var issueId = chance.guid();
  var existsFlag = false;

  if(name == '' || name == null || weight == '' || weight == null || date == '' || date == null || breakfast == '' || breakfast == null || lunch == '' || lunch == null || dinner == '' || dinner == null || exercise == '' || exercise == null){
    alert('Please fill  in all fields');
  }else{
  var newEntry = {
    name:name,
    "data":[{
      id: issueId,
      weight: weight,
      date: date,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      exercise: exercise

    }]
  };

 var rawData = {
   weight: weight,
   date: date,
   id: issueId,
   breakfast: breakfast,
   lunch: lunch,
   dinner: dinner,
   exercise: exercise
 }

  if (localStorage.getItem(TRACKER_USERS) == null){
    var entries = [];
    entries.push(newEntry);
    var existsFlag = false;
    localStorage.setItem(TRACKER_USERS, JSON.stringify(entries));
  } else {
    var existingEntries = JSON.parse(localStorage.getItem(TRACKER_USERS));
    for (var i = 0;i < existingEntries.length; i++){
        if (name == existingEntries[i].name){
          existingEntries[i]["data"].push(rawData);
          existsFlag = true;
        }
    }
  if (existsFlag == false){
    existingEntries.push(newEntry);
  }
    localStorage.setItem(TRACKER_USERS, JSON.stringify(existingEntries));
  }
loadUsers();
if (tempSelectedUser != null, tempSelectedUser != ''){
document.getElementById('userDropDown').value = tempSelectedUser
loadEntries();
}
}
}


function loadEntries(){
  var table = document.getElementById('entryTable');
  var chart = document.getElementById('chart');
  var entries = [];
  var name = document.getElementById('userDropDown').value;
  entries = JSON.parse(localStorage.getItem(TRACKER_USERS));
  var index = entries.findIndex(obj => obj.name == name);
  if (entries.length > 0){
    if (entries[index]['data'].length > 0){
  table.innerHTML = '<thead>'+
    '<th>Name</th>'+
    '<th>Weight</th>'+
    '<th>Date</th>'+
    '<th>Functions</th>' +
     '</thead>';


  for (var i = 0; i < entries[index]["data"].length; i ++){
      var newRow = table.insertRow(table.length),
      cell1 = newRow.insertCell(0),
      cell2 = newRow.insertCell(1),
      cell3 = newRow.insertCell(2);
      cell4 = newRow.insertCell(3);
      cell1.innerHTML = name;
      cell2.innerHTML = entries[index]['data'][i].weight;
      cell3.innerHTML = entries[index]['data'][i].date;
      cell4.innerHTML = '<input type = "button" onclick="deleteEntry(\''+ entries[index]['data'][i].id +'\')" class="btn btn-danger" value = "Delete">'+
                        '<input type = "button" onclick="displayDetails(\''+ entries[index]['data'][i].id +'\')" class="btn btn-primary buttonMargin" value = "Details" data-toggle="modal" data-target="#detailsModal">';


}

chart.style.display = 'block';
drawChart();
}
else {
  chart.style.display = 'none';
  table.innerHTML ='';
}
}
}


function deleteEntry(id){

  var entries = JSON.parse(localStorage.getItem(TRACKER_USERS));
  for (var i = 0; i < entries.length; i++){
    for (var j = 0; j < entries[i]["data"].length; j++){
  if (id == entries[i]["data"][j].id)  {
  entries[i]["data"].splice(j,1);
  }
}
}
  localStorage.setItem(TRACKER_USERS, JSON.stringify(entries));
  loadEntries();
}

function getCurrentDate(){
  var dateField = document.getElementById('date');
  dateField.value = moment().format("YYYY-MM-DD");
}

function displayDetails(id){

  var entries = JSON.parse(localStorage.getItem(TRACKER_USERS));
  var modalBody = document.getElementById('detailsModalBody');
  var selectedEntry = ''
  for (var i = 0; i < entries.length; i++){
    for (var j = 0; j < entries[i]["data"].length; j++){
  if (id == entries[i]["data"][j].id)  {
    selectedEntry = entries[i]["data"][j];
  }

modalBody.innerHTML = "<h5>Breakfast</h5><p>" + selectedEntry['breakfast'] + "</p>"
                      + "<h5>Lunch</h5><p>" + selectedEntry['lunch'] + "</p>"
                      + "<h5>Dinner</h5><p>" + selectedEntry['dinner'] + "</p>"
                      + "<h5>Exercise Routine</h5><p>" + selectedEntry['exercise'] + "</p>";
  }
}
}

var todayButton = document.getElementById('todayButton');
todayButton.addEventListener("click", getCurrentDate);
var deleteUserButton = document.getElementById('deleteUserButton');
deleteUserButton.addEventListener("click", deleteUser);
var addEntriesButton = document.getElementById('addEntryButton');
addEntriesButton.addEventListener("click", saveEntry);
var loadEntriesButton = document.getElementById('loadEntriesButton');
loadEntriesButton.addEventListener("click", loadEntries);
var selectList = document.getElementById('userDropDown');
selectList.addEventListener("change", loadEntries);
