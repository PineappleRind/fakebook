var setupPages = [
    `<h1>Pick a username</h1>
    <p>Something personal and original.</p>
    <input placeholder="Type your fantastic username here.">
    <button onclick="recordData('username',this.previousElementSibling);switchSlides(this.parentElement,setupPages[1])">Next</button>`,

    `<h1>Pick a password</h1>
    <p>Also something personal and original. Easy to remember, but not easy to guess.</p>
    <input type="password" placeholder="Type your fantastic password here.">
    <button onclick="recordData('password',this.previousElementSibling);switchSlides(this.parentElement,setupPages[2])">Next</button>`,

    `<h1>That's it!</h1>
    <p>We hope you enjoy using FakeBook.</p>
    <a href="social.html"><button>Begin</button></a>`
]

var data = {}

function recordData(type, toRecord) {
    if (type == 'password') data[type] = md5(toRecord.value)
    else data[type] = toRecord.value
    localStorage.setItem('fakebookSetupData', JSON.stringify(data))
}

function switchSlides(innercontainer, content) {
    innercontainer.classList.add('modal-transitioning')
    setTimeout(() => {
        innercontainer.innerHTML = content
        innercontainer.classList.remove('modal-transitioning')
    }, 200);
}