/* grab hold all the ids or class from html in defined variables for later use in js */
let myLeads = [];
const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

/*-------------------- Tab btn workings -------------------*/

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url); // asking for url...
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

/*-------------------- Render function workings -------------------*/

function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
    /*   ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"; */

    listItems += `<li>
                      <a target='_blank' href='${leads[i]}'>
                          ${leads[i]}
                      </a>
                  </li>`;
  }

  ulEl.innerHTML = listItems; // convert all at once... instead doing above commented line in every iteration...
}

/* <--------------------  Delete Part -------------------*/

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads); // calling this function becoz it will iterate through emty array which was set in above line returns me null
});

/*-------------------- Input btn workings -------------------*/

inputBtn.addEventListener("click", function () {
  if (inputEl.value != "") {
    // why 'if' becoz if there is no value in text field and user click the submit button then that empyt string will also adds to the array which looks wierd in a list
    myLeads.push(inputEl.value);
    inputEl.value = ""; // it will reset the text field value to null.

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
});
