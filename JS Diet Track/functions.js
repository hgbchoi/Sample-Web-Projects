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
  var name = document.getElementById('loadEntriesName').value;
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
}
function deleteEntry(id){
  var name = document.getElementById('loadEntriesName').value;
  var entries = JSON.parse(localStorage.getItem(name));
  for (var i = 0; i < entries.length; i++){
  if (id == entries[i].id)  {
  entries.splice(i,1);
  }
  localStorage.setItem(name, JSON.stringify(entries));
  loadEntries();
}
}


var addEntriesButton = document.getElementById('addEntryButton');
addEntriesButton.addEventListener("click", saveEntry);
var loadEntriesButton = document.getElementById('loadEntriesButton');
loadEntriesButton.addEventListener("click", loadEntries);
