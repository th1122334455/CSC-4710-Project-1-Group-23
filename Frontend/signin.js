
// Call the backend
/*
document.addEventListener('DOMContentLoaded', function() {
    // one can point your browser to http://localhost:5050/getAll to check what it returns first.
    fetch('http://localhost:5050/getAll')     
    .then(response => response.json())
});
*/

// when the sign in button is clicked
const signinFeedback = document.getElementById('sign-in-feedback');

const signInBtn =  document.getElementById('sign-in-button');
signInBtn.onclick = function (){
    const usernameInput = document.querySelector('#user-input');
    const passwordInput = document.querySelector('#pass-input');

    if (!usernameInput.value || !passwordInput.value) {
        signinFeedback.textContent = "Error: One or more fields are empty";
        return;
    }

 
    signinFeedback.textContent = "Error: One or more fields are not empty";
    fetch('http://localhost:5050/userpasssearch/' + usernameInput.value + '/' + passwordInput.value)
    .then(response => response.json())
    .then(data => signIn(data['data']));

}

function signIn(data) {
    // Check if it found a matching pair of username and password
    const usernameInput = document.querySelector('#user-input');
    const passwordInput = document.querySelector('#pass-input');
    if (data.length === 0) {
        signinFeedback.textContent = "Error: Either username or password is incorrect.";
        return;
    }

    else {
        signinFeedback.textContent = "You're signed in!";
         fetch('http://localhost:5050/updatedate/' + usernameInput.value + '/' + passwordInput.value)
        .then(response => response.json())
        .then(data => updateSignDate(data['data']));
        return;
    }
}

function updateSignDate(data) {
    return;
}

// when the register button is clicked
const registerFeedback = document.getElementById('register-feedback');

const registerBtn =  document.getElementById('register-button');
registerBtn.onclick = function (){

    const usernameInput = document.querySelector('#user-input');
    const passwordInput = document.querySelector('#pass-input');
    const confirmPasswordInput = document.querySelector('#passconfirm-input');
    const firstNameInput = document.querySelector('#first-input');
    const lastNameInput = document.querySelector('#last-input');
    const ageInput = document.querySelector('#age-input');
    const salaryInput = document.querySelector('#salary-input');

    // Make sure no fields are empty
    if (!usernameInput.value && !passwordInput.value && !confirmPasswordInput.value && !firstNameInput.value
&& !lastNameInput.value && !ageInput.value && !salaryInput.value 
    ) {
        return;
    }


    if (!usernameInput.value || !passwordInput.value || !confirmPasswordInput.value || !firstNameInput.value
|| !lastNameInput.value || !ageInput.value || !salaryInput.value 
    ) {
        registerFeedback.textContent = "Error: One or more fields are empty";
        return;
    }
    // Make sure the password matches confirm password
    if (!(passwordInput.value === confirmPasswordInput.value)) {
        registerFeedback.textContent = "Error: Passwords do not match";
        return;
    }

    // Make sure there are no users with the same username

    fetch('http://localhost:5050/search/' + usernameInput.value)
    .then(response => response.json())
    .then(data => nameExists(data['data']));

}

function nameExists(data) {

    const usernameInput = document.querySelector('#user-input');
        const passwordInput = document.querySelector('#pass-input');
        const firstNameInput = document.querySelector('#first-input');
        const lastNameInput = document.querySelector('#last-input');
        const ageInput = document.querySelector('#age-input');
        const salaryInput = document.querySelector('#salary-input');
    if (data.length === 0) {

        


        fetch('http://localhost:5050/search/' + usernameInput.value)
        .then(response => response.json())
        .then(data => nameExists(data['data']));

        fetch('http://localhost:5050/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username: usernameInput.value, firstname: firstNameInput.value,
            lastname: lastNameInput.value, password: passwordInput.value, salary: salaryInput.value, age: ageInput.value,})
        })
        .then(response => response.json())
        .then(data => registerConfirm(data['data']));
        return;
    }
    else if (data.length === 1) {
        if (!(!usernameInput.value && !passwordInput.value && !confirmPasswordInput.value && !firstNameInput.value
&& !lastNameInput.value && !ageInput.value && !salaryInput.value 
    )) {
        registerFeedback.textContent = "Error: This username has already been taken";
    }
        return;
    }
}

function registerConfirm(data) {
    document.getElementById('user-input').value = "";
    document.getElementById('pass-input').value = "";
    document.getElementById('first-input').value = "";
    document.getElementById('last-input').value = "";
    document.getElementById('age-input').value = "";
    document.getElementById('salary-input').value = "";
    document.getElementById('passconfirm-input').value = "";
    registerFeedback.textContent = "Successfully registered!";
    return;
}