document.addEventListener("DOMContentLoaded", function () {
    updateUserTable();
    displayRows(currentPage);
});

document.getElementById("name").addEventListener("input", function (event) {
  this.value = this.value.replace(/[^a-zA-Z -]/g, "");
});

document.getElementById("phone").addEventListener("input", function (event) {
  this.value = this.value.replace(/\D/g, "");
});

function submitForm() {
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

  const phoneNumberInput = phone.trim();
  const phoneRegex = /^\d{10}$/;

  if (!phoneRegex.test(phoneNumberInput)) {
    alert("Phone number must be 10 digits");
    phone.value = "";
    phone.focus();
    e.preventDefault();
    isValid = false;
  }

  if (age> 120) {
    alert("invalid age");
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

function updateUserTable() {
  const users = JSON.parse(localStorage.getItem("userDetails")) || [];
  const tableBody = document.getElementById("tableBody");

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

const tbody = document.getElementById("tableBody");
const rowsPerPage = 5;
let currentPage = 1;

function displayRows(page) {
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const rows = tbody.querySelectorAll("tr");
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
  const lastPage = Math.ceil(tbody.querySelectorAll("tr").length / rowsPerPage);
  if (currentPage < lastPage) {
    currentPage++;
    displayRows(currentPage);
  }
});

function updatePagination() {
  const lastPage = Math.ceil(tbody.querySelectorAll("tr").length / rowsPerPage);
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === lastPage;
}

