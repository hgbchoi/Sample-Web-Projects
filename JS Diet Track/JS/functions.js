function loadUsers(){
var dropDownList = document.getElementById('userDropDown');
while (dropDownList.hasChildNodes()) {
  dropDownList.removeChild(dropDownList.firstChild);
}
  for (var i = 0; i < localStorage.length; i++){
    var newOption = document.createElement("option");
        newOption.text = localStorage.key(i);
        newOption.value = localStorage.key(i);
        dropDownList.appendChild(newOption)
  }


}

function drawChart(){

var name = document.getElementById('userDropDown').value;
var chart = document.getElementById('chart');
var dataEntries = JSON.parse(localStorage.getItem(name));
var dateEntries = [];
var weightEntries = [];

for (var i = 0; i < dataEntries.length; i++){
  dateEntries.push(dataEntries[i].date);
  weightEntries.push(dataEntries[i].weight);
}

let lineChart = new Chart(chart, {
  type: 'line',
  data:{
    labels: dateEntries,
    datasets:[
      {

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
  localStorage.removeItem(userToDelete);

  loadUsers();
}

function saveEntry(){
  var name = document.getElementById('name').value;
  var weight = document.getElementById('weight').value;
  var date = document.getElementById('date').value;
  var issueId = chance.guid();

  var newEntry = {
    name: name,
    weight: weight,
    date: date,
    id: issueId
  };

  if (localStorage.getItem(name) == null){
    var entries = [];
    entries.push (newEntry);
    localStorage.setItem(name, JSON.stringify(entries));
  } else {
    var existingEntries = JSON.parse(localStorage.getItem(name));
    existingEntries.push(newEntry);
    localStorage.setItem(name, JSON.stringify(existingEntries));
  }
loadUsers();
}

function loadEntries(){
  var table = document.getElementById('entryTable');
  table.innerHTML = '<thead>'+
    '<th>Name</th>'+
    '<th>Weight</th>'+
    '<th>Date</th>'+
    '<th>Functions</th>' +
     '</thead>';
  var entries = [];
  var name = document.getElementById('userDropDown').value;
  entries = JSON.parse(localStorage.getItem(name));
  for (var i = 0; i < entries.length; i ++){
      var newRow = table.insertRow(table.length),
      cell1 = newRow.insertCell(0),
      cell2 = newRow.insertCell(1),
      cell3 = newRow.insertCell(2);
      cell4 = newRow.insertCell(3);
      cell1.innerHTML = entries[i].name;
      cell2.innerHTML = entries[i].weight;
      cell3.innerHTML = entries[i].date;
      cell4.innerHTML = '<input type = "button" onclick="deleteEntry(\''+ entries[i].id +'\')" class="btn btn-danger" value = "Delete">';

}
drawChart();
}



function deleteEntry(id){
  var name = document.getElementById('userDropDown').value;
  var entries = JSON.parse(localStorage.getItem(name));
  for (var i = 0; i < entries.length; i++){
  if (id == entries[i].id)  {
  entries.splice(i,1);
  }
  localStorage.setItem(name, JSON.stringify(entries));
  loadEntries();
}
}

var deleteUserButton = document.getElementById('deleteUserButton');
deleteUserButton.addEventListener("click", deleteUser);
var addEntriesButton = document.getElementById('addEntryButton');
addEntriesButton.addEventListener("click", saveEntry);
var loadEntriesButton = document.getElementById('loadEntriesButton');
loadEntriesButton.addEventListener("click", loadEntries);
