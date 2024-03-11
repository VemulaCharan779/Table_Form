document.addEventListener("DOMContentLoaded", function () {
  updateUserTable();
  displayRows(currentPage);
  document.getElementById("mySearch").addEventListener("input", searchFunction);
  showTable();
});

document.getElementById("name").addEventListener("input", function (event) {
  this.value = this.value.replace(/[^a-zA-Z -]/g, "");
});

document.getElementById("phone").addEventListener("input", function (event) {
  this.value = this.value.replace(/\D/g, "");
});

function submitForm(e) {
  
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;

  var isValid = true;

  if (name.length < 5) {
    alert("Minimum 5 letters ");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("email invalid");
    isValid = false;
  }

  if (age > 120 || age < 0 ) {
    alert("invalid age");
    isValid = false;
  }

  const phoneNumberInput = phone.trim();
  const phoneRegex = /^\d{10}$/;

  if (!phoneRegex.test(phoneNumberInput)) {
    alert("Phone number must be 10 digits");
    phone.value = "";
    phone.focus();
    e.preventDefault();
    isValid = false;
  }

  

  if (isValid) {
    const users = JSON.parse(localStorage.getItem("userDetails")) || [];
    const user = {
      name: name,
      email: email,
      phone: phone,
      age: age,
    };
    users.push(user);
    localStorage.setItem("userDetails", JSON.stringify(users));
    displayRows(currentPage);
  }

  return isValid;
}



const show = document.getElementById('show-table');
let tableContainer = document.getElementById('table-container');

function showTable(){
  
  if(tableContainer.style.display === 'none'){
    tableContainer.style.display = "block";
    show.innerText = 'Hide';
  }
  else{
    tableContainer.style.display = "none";
    show.innerText = 'Show';

  }
}

const tableBody = document.getElementById("tableBody");
const users = JSON.parse(localStorage.getItem("userDetails")) || [];
let rowsPerPage = 5;
let currentPage = 1;
const paginationSelector = document.getElementById('pagination-selector');


function paginationChange(){
    rowsPerPage = paginationSelector.value;
    displayRows(currentPage);  
}

function updateUserTable() {
    tableBody.innerHTML = "";

    users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
        `;
        tableBody.appendChild(row);
    });
}

function displayRows(page) {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row, index) => {
        if (index >= startIndex && index < endIndex) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    });

    updatePagination();
}

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayRows(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    const lastPage = Math.ceil(tableBody.querySelectorAll("tr").length / rowsPerPage);
    if (currentPage < lastPage) {
        currentPage++;
        displayRows(currentPage);
    }
});

function updatePagination() {
    const lastPage = Math.ceil(tableBody.querySelectorAll("tr").length / rowsPerPage);
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === lastPage;
}

function searchFunction() {
  var mySearch = document.getElementById("mySearch");
  var filter = mySearch.value.trim().toUpperCase();
  const rows = tableBody.querySelectorAll("tr");

  let count = 0;
  

  for (let i = 0; i < rows.length; i++) {
      const user = users[i];
      const userValues = Object.values(user);
      
      var found = false;

      for (let j = 0; j < userValues.length; j++) {
          const value = userValues[j].toString().toUpperCase();
          if (value.includes(filter)) {
              found = true;
              break;
          }
      }

     
      if ((found || filter === "") && count < rowsPerPage) {
          rows[i].style.display = ""; 
          count++;
      } else {
          rows[i].style.display = "none"; 
      }
  }

 
  updatePagination();
}



const headers = document.querySelectorAll("#myTable th");
let sortingOrder = Array.from(headers).map(() => -1); 
let SortColumn = null;

headers.forEach((header, index) => {
  header.addEventListener("click", function() {
    const column = header.dataset.column;

    if (column === SortColumn) {
      sortingOrder[index] *= -1; 
    } else {
      SortColumn = column;
      sortingOrder = Array.from({ length: headers.length }).fill(-1); 
      sortingOrder[index] = 1; 
    }

    sortTable(index);
  });
});

function sortTable(columnIndex) {
  const tableBody = document.getElementById("tableBody");
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  rows.sort((rowA, rowB) => {
    const cellA = rowA.cells[columnIndex].textContent.trim().toLowerCase();
    const cellB = rowB.cells[columnIndex].textContent.trim().toLowerCase();
    
   
    const cellComparison = cellA.localeCompare(cellB);
    if (cellComparison !== 0) {
      return sortingOrder[columnIndex] * cellComparison;
    } else {
      
      return sortingOrder[columnIndex] * (rows.indexOf(rowA) - rows.indexOf(rowB));
    }
  });

  rows.forEach(row => {
    tableBody.appendChild(row);
  });
}





