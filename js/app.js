var user = {
    profile: null,
    loggedIn: false
}
if (localStorage.getItem('fakebookSetupData')) {
    user.loggedIn = true
    user.profile = JSON.parse(localStorage.getItem('fakebookSetupData'))
    localStorage.removeItem('fakebookSetupData')
}
requestLogIn()

function requestLogIn() {
    let modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.innerHTML = `<h1>Log In</h1>
    <input placeholder="Username">
    <input placeholder="Password">
    <button onclick="evaluateLogIn(this.previousElementSibling)">Log in</button>`
    document.body.appendChild(modal)
    document.body.classList.add('overlayed')
}

function evaluateLogIn(password) {
    let realPassword = user.profile.password
    let comparingPassword = md5(password.value)
    console.log(realPassword + '\n' + comparingPassword)
    if (realPassword === comparingPassword) console.log('LOGIN SUCCESSFUL')
}