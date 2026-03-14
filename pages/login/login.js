const email = document.getElementById("floatingInput");
const password = document.getElementById("floatingPassword");
const submitButt = document.getElementById("submitButton");

const testEmail = "2024100823@ms.bulsu.edu.ph";
const testPassword = "bulsuStudent123";

function checkFields(){
    if(email.value.trim() === "" || password.value.trim() === ""){
        submitButt.disabled = true;
    }
    else{
        submitButt.disabled = false;
    }
}

function checkAccount(){
    if(email.value.trim() === testEmail && password.value.trim() === testPassword){
        alert("Login Successful!");
    }
    else{
        alert("Account does not exist!");
    }
}

submitButt.addEventListener("click", checkAccount);
email.addEventListener("input", checkFields);
password.addEventListener("input", checkFields);