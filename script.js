let user = document.getElementById('username');
let email = document.getElementById('useremail');
let age = document.getElementById('userage');
let phone = document.getElementById('usernumber');

let submitButton = document.querySelector('.submit-button');
let userTableBody = document.getElementById('userTableBody');

let users = JSON.parse(localStorage.getItem("users")) || [];

user.addEventListener('input', function() {
    user.value = user.value.replace(/[^a-zA-Z\s]/g, '');
});

phone.addEventListener('input', function() {
    phone.value = phone.value.replace(/[^0-9\s]/g, '');
})

document.addEventListener('DOMContentLoaded', function() {
    updateUserTable();
})

submitButton.addEventListener("click", submitForm)


function submitForm(e) {
    e.preventDefault();
    let isValid = true;

    if (user.value.length < 5) {
        alert("Minimum 5 letters ");
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email.value)){
        alert("email invalid");
        isValid = false;
    }

  
    const phoneNumberInput = phone.value.trim();
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phoneNumberInput)) {
        alert("Phone number must be 10 digits");
        phone.value = ""; 
        phone.focus();
        e.preventDefault(); 
        isValid = false;
    }

    if(age.value>120){
        alert('invalid age');
        isValid = false;
    }

    if(isValid){
        userDetails = {
            name : user.value,
            email : email.value,
            age : age.value,
            phone : phone.value
        };

        users.push(userDetails);
        localStorage.setItem("users", JSON.stringify(users));

        updateUserTable();

        user.value= '';
        email.value= '';
        age.value='';
        phone.value='';
    }
    
}

function updateUserTable(){
    userTableBody.innerHTML= ' ';
    
    users.forEach(element => {
        let row = document.createElement('tr');
         row.innerHTML = `
           <td>${element.name}</td>
           <td>${element.age}</td>
           <td>${element.email}</td>
           <td>${element.phone}</td>
         `;

          userTableBody.appendChild(row);
    });
}

