
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
    if (data.length === 0) {
        signinFeedback.textContent = "Error: No user with this name exists.";
        return;
    }

    else {
        signinFeedback.textContent = "You're signed in!";
        return;
    }
}
