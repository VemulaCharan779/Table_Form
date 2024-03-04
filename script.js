let user = document.getElementById('username');

user.addEventListener('input',() =>{
    console.log("working");
    user.value = user.value.replace(/\[^a-zA-Z\s/g,'');
}) ;
    


function submitForm(e){
    e.preventDefault();
    if(user.value.length<5 ){
        alert("user error");
    }
}