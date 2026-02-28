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
    const checkEmail = email.value.trim();
    const checkContact = contact.value.trim();
    const checkpassword = password.value.trim();
    const checkRetype = retype.value.trim();
    const passStrength = passwordStrengthCheck(checkpassword);


    if(/^[0-9]+@ms\.bulsu\.edu\.ph$/.test(checkEmail)){
        if(/^09[0-9]{9}$/.test(checkContact)){
            if(passStrength < 3){
                alert("Password weak, create another password!");
            }
            else if(passStrength == 3 || passStrength == 4){
                let proceed = confirm("Password strength is medium. Do you want proceed?");
                if(proceed){
                    if(checkpassword === checkRetype){
                        alert("Account Created!");
                    }
                    else{
                        alert("Password doesn't match!");
                        retype.focus();
                    }
                }
                else{
                    password.focus();
                }
            }
            else{
                if(checkpassword === checkRetype){
                    alert("Account Created!");
                }
                else{
                    alert("Password doesn't match!");
                    retype.focus();
                }
            }
        }
        else{
            alert("Please use valid contact number!");
            contact.focus();
        }
    }
    else{
        alert("Please use distributed BulSU MS Account!");
        email.focus();
    }
}

function passwordStrengthCheck(password){
    let strength = 0;

    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[a-z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(password.includes("@") || password.includes(".") || password.includes("_") ) strength++;
    
    return strength;
}

signupbtn.addEventListener("click", checkInputs);
Fullname.addEventListener("input", checkFields);
email.addEventListener("input", checkFields);
contact.addEventListener("input", checkFields);
password.addEventListener("input", checkFields);
retype.addEventListener("input", checkFields);
terms.addEventListener("change", checkFields);