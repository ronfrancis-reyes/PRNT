const Fullname = document.getElementById("name");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const password = document.getElementById("password");
const retype = document.getElementById("retype");
const terms = document.getElementById("terms");
const signupbtn = document.getElementById("signupbtn");


function checkFields(){
    if(Fullname.value.trim() === "" || email.value.trim() === "" || contact.value.trim() === "" || password.value.trim() === "" || retype.value.trim() === "" || !terms.checked){
        signupbtn.disabled = true;
    }
    else{
        signupbtn.disabled = false;
    }
}

function checkInputs(){

}

signupbtn.addEventListener("click", checkInputs)
Fullname.addEventListener("input", checkFields);
email.addEventListener("input", checkFields);
contact.addEventListener("input", checkFields);
password.addEventListener("input", checkFields);
retype.addEventListener("input", checkFields);
terms.addEventListener("change", checkFields);